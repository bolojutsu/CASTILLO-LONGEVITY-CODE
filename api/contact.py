from html import escape
import os
import re

import resend
from flask import Blueprint, request, jsonify

contact_bp = Blueprint('contact', __name__)
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 5_000

resend.api_key = os.environ.get("RESEND_API_KEY")
YOUR_EMAIL = os.environ.get("YOUR_EMAIL")
SENDER_EMAIL = os.environ.get("RESEND_SENDER_EMAIL")


@contact_bp.route('/contact', methods=['POST'])
def handle_contact_submission():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Malformed request. A JSON object is required."}), 400

    raw_name = data.get('name')
    raw_email = data.get('email')
    raw_message = data.get('message')
    if not all(isinstance(value, str) for value in (raw_name, raw_email, raw_message)):
        return jsonify({"error": "Name, email, and message must be text."}), 400

    name = raw_name.strip()
    email = raw_email.strip()
    message = raw_message.strip()

    if not name or not email or not message:
        return jsonify({"error": "All fields (Name, Email, Message) are required."}), 400
    if len(name) > MAX_NAME_LENGTH or "\r" in name or "\n" in name:
        return jsonify({"error": "Name is invalid."}), 400
    if len(email) > MAX_EMAIL_LENGTH or "\r" in email or "\n" in email:
        return jsonify({"error": "Email address is invalid."}), 400
    if len(message) > MAX_MESSAGE_LENGTH:
        return jsonify({"error": "Message is too long."}), 400
    if any(ord(character) < 32 and character not in "\n\t" for character in message):
        return jsonify({"error": "Message contains invalid characters."}), 400
    if not re.fullmatch(EMAIL_REGEX, email):
        return jsonify({"error": "Invalid email address protocol format."}), 400

    if not all((resend.api_key, YOUR_EMAIL, SENDER_EMAIL)):
        return jsonify({"error": "Mail service is unavailable."}), 503

    safe_name = escape(name)
    safe_email = escape(email)
    safe_message = escape(message).replace("\n", "<br>")

    try:
        parameters = {
            "from": SENDER_EMAIL,
            "to":[YOUR_EMAIL],
            "subject": f"New Secure Booking Request - {name}",
            "html": f"""
                <h3>New Booking Request</h3>
                <p><strong>Patient Name:</strong> {safe_name}</p>
                <p><strong>Secure Email:</strong> {safe_email}</p>
                <p><strong>Clinical Notes:</strong></p>
                <p style="white-space: pre-wrap;">{safe_message}</p>
            """
        }
        resend.Emails.send(parameters)
    except Exception:
        return jsonify({"error": "Internal mail server error. Please try again later."}), 500

    return jsonify({
        "success": True,
        "message": "Submission successful. Our clinical team will reach out shortly."
    }), 200