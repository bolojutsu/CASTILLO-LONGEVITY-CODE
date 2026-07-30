from flask import Blueprint, request, jsonify, Response, stream_with_context
from openai import OpenAI
import openai
import os
from extensions import limiter

chat_bp = Blueprint("chat", __name__)

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPT_FILE_PATH = os.path.join(BASE_DIR, "systemPrompt.txt")

MAX_MESSAGES = 10
MAX_MESSAGE_LENGTH = 2000
ALLOWED_ROLES = {"user", "assistant"}

try:
    with open(PROMPT_FILE_PATH, "r", encoding="utf-8") as f:
        SYSTEM_PROMPT = f.read().strip()
except FileNotFoundError:
    print(f"[Warning] {PROMPT_FILE_PATH} not found. Using a fallback prompt.")
    SYSTEM_PROMPT = "You are a helpful AI assistant."

def validate_messages(messages):
    """Returns an error string if the payload is invalid, otherwise None."""
    if not isinstance(messages, list) or not messages:
        return "messages must be a non-empty array."
 
    if len(messages) > 50:
        return "Too many messages in this conversation."
 
    for msg in messages:
        if not isinstance(msg, dict):
            return "Each message must be an object."
 
        role = msg.get("role")
        content = msg.get("content")
 
        if role not in ALLOWED_ROLES:
            return f"Invalid role: {role!r}. Only 'user' and 'assistant' are permitted."
 
        if not isinstance(content, str) or not content.strip():
            return "Each message must have non-empty string content."
 
        if len(content) > MAX_MESSAGE_LENGTH:
            return f"Message content exceeds the {MAX_MESSAGE_LENGTH} character limit."
 
    return None

@chat_bp.route("/api/chat", methods=["POST"])
@limiter.limit("10 per minute; 100 per day")
def chat():
    data = request.get_json(silent=True)
 
    if not data:
        return jsonify({"error": "Malformed request. Missing JSON payload."}), 400
 
    messages = data.get("messages", [])
 
    validation_error = validate_messages(messages)
    if validation_error:
        return jsonify({"error": validation_error}), 400
 
    # cap history to last N messages to control token usage
    trimmed = messages[-MAX_MESSAGES:]
 
    # Streaming response
    def generate():
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