from flask import Blueprint, request, jsonify, Response, stream_with_context
from openai import OpenAI
import os

chat_bp = Blueprint("chat", __name__)

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

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
    data = request.get_json(silent=True) or {}
    messages = data.get("messages", [])

    if not messages:
        return jsonify({
            "error": "No messages provided"
        }), 400

    # cap history to last 10 messages to control token usage
    trimmed = messages[-10:]

    # Establish the upstream connection before streaming so that a failure to
    # reach the model surfaces as a proper HTTP error status instead of being
    # silently delivered as plain text inside a 200 response.
    try:
        stream = client.chat.completions.create(
            model="llama3.2:latest",
            max_tokens=500,
            stream=True,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                *trimmed,
            ]
        )
    except Exception as e:
        print(f"[chat] failed to start stream: {e}")
        return jsonify({
            "error": "Assistant unavailable — please try again later."
        }), 503

    # Streaming response
    def generate():
        try:
            for chunk in stream:
                if chunk.choices and len(chunk.choices) > 0:
                    delta = chunk.choices[0].delta.content
                    if delta is not None:
                        yield delta

        except Exception as e:
            print(f"[chat] streaming error: {e}")
            yield "\n\n[Assistant unavailable — please try again later.]"
    return Response(
        stream_with_context(generate()),
        mimetype="text/plain",
        headers={"X-Accel-Buffering": "no"}, 
    )