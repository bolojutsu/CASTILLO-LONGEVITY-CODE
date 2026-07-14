import importlib
import types

import chat


def _make_chunk(content):
    delta = types.SimpleNamespace(content=content)
    choice = types.SimpleNamespace(delta=delta)
    return types.SimpleNamespace(choices=[choice])


def _make_empty_choices_chunk():
    return types.SimpleNamespace(choices=[])


def test_missing_prompt_file_falls_back_to_default(monkeypatch):
    real_open = open

    def fake_open(path, *args, **kwargs):
        if str(path) == chat.PROMPT_FILE_PATH:
            raise FileNotFoundError(path)
        return real_open(path, *args, **kwargs)

    monkeypatch.setattr("builtins.open", fake_open)
    try:
        reloaded = importlib.reload(chat)
        assert reloaded.SYSTEM_PROMPT == "You are a helpful AI assistant."
    finally:
        monkeypatch.undo()
        importlib.reload(chat)


def test_chat_no_messages_returns_400(client):
    response = client.post("/api/chat", json={"messages": []})
    assert response.status_code == 400
    assert "no messages" in response.get_json()["error"].lower()


def test_chat_streams_concatenated_deltas(client, monkeypatch):
    def fake_create(**kwargs):
        return iter([
            _make_chunk("Hello"),
            _make_chunk(", "),
            _make_chunk("world"),
            _make_chunk(None),          # None deltas are skipped
            _make_empty_choices_chunk(),  # empty choices are skipped
        ])

    monkeypatch.setattr(chat.client.chat.completions, "create", fake_create)

    response = client.post(
        "/api/chat", json={"messages": [{"role": "user", "content": "hi"}]}
    )

    assert response.status_code == 200
    assert response.data.decode() == "Hello, world"


def test_chat_trims_history_to_last_10_messages(client, monkeypatch):
    captured = {}

    def fake_create(**kwargs):
        captured.update(kwargs)
        return iter([_make_chunk("ok")])

    monkeypatch.setattr(chat.client.chat.completions, "create", fake_create)

    history = [{"role": "user", "content": str(i)} for i in range(25)]
    response = client.post("/api/chat", json={"messages": history})
    assert response.status_code == 200

    sent = captured["messages"]
    assert sent[0]["role"] == "system"
    # system prompt + last 10 user messages
    assert len(sent) == 11
    assert sent[1]["content"] == "15"
    assert sent[-1]["content"] == "24"


def test_chat_streaming_error_yields_fallback(client, monkeypatch):
    def boom(**kwargs):
        raise RuntimeError("model offline")

    monkeypatch.setattr(chat.client.chat.completions, "create", boom)

    response = client.post(
        "/api/chat", json={"messages": [{"role": "user", "content": "hi"}]}
    )
    assert response.status_code == 200
    assert "Assistant unavailable" in response.data.decode()
