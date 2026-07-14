from flask import Blueprint, request, jsonify, Response, stream_with_context
from openai import OpenAI
import os

chat_bp = Blueprint("chat", __name__)

client = OpenAI(
    base_url=os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434/v1"),
    api_key=os.environ.get("OLLAMA_API_KEY", "ollama"),
)
CHAT_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.2:latest")
MAX_MESSAGE_LENGTH = 4_000
MAX_TOTAL_MESSAGE_LENGTH = 12_000
MAX_HISTORY_LENGTH = 10

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPT_FILE_PATH = os.path.join(BASE_DIR, "systemPrompt.txt")

try:
    with open(PROMPT_FILE_PATH, "r", encoding="utf-8") as f:
        SYSTEM_PROMPT = f.read().strip()
except FileNotFoundError:
    print(f"[Warning] {PROMPT_FILE_PATH} not found. Using a fallback prompt.")
    SYSTEM_PROMPT = "You are a helpful AI assistant."

@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "A JSON object is required"}), 400

    messages = data.get("messages")
    if not isinstance(messages, list) or not messages:
        return jsonify({"error": "No messages provided"}), 400

    normalized_messages = []
    total_length = 0
    for message in messages[-MAX_HISTORY_LENGTH:]:
        if not isinstance(message, dict):
            return jsonify({"error": "Each message must be an object"}), 400

        role = message.get("role")
        content = message.get("content")
        if role not in {"user", "assistant"} or not isinstance(content, str):
            return jsonify({"error": "Invalid message role or content"}), 400

        content = content.strip()
        if not content or len(content) > MAX_MESSAGE_LENGTH:
            return jsonify({"error": "Message content is invalid"}), 400
        if any(ord(character) < 32 and character not in "\n\t" for character in content):
            return jsonify({"error": "Message content contains invalid characters"}), 400

        total_length += len(content)
        normalized_messages.append({"role": role, "content": content})

    if total_length > MAX_TOTAL_MESSAGE_LENGTH:
        return jsonify({"error": "Message history is too large"}), 400

    if normalized_messages[-1]["role"] != "user":
        return jsonify({"error": "The final message must be from the user"}), 400

    def generate():
        try:
            stream = client.chat.completions.create(
                model=CHAT_MODEL,
                max_tokens=500,
                stream=True,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    *normalized_messages,
                ]
            )

            for chunk in stream:
                if chunk.choices and len(chunk.choices) > 0:
                    delta = chunk.choices[0].delta.content
                    if delta is not None:
                        yield delta

        except Exception:
            yield "\n\n[Assistant unavailable — please try again later.]"

    return Response(
        stream_with_context(generate()),
        mimetype="text/plain",
        headers={"X-Accel-Buffering": "no"},
    )