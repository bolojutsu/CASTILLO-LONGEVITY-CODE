import re
from flask import Blueprint, request, jsonify

contact_bp = Blueprint('contact', __name__)
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

@contact_bp.route('/api/contact', methods=['POST'])
def handle_contact_submission():
    data = request.get_json()

    # 1. check if payload exist
    if not data:
        return jsonify({
            "error": "Malformed request. Missing payload"
        }), 400
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    # 2 feild validation
    if not name or not email or not message:
        return jsonify({
            "error": "All fields (Name, Email, Message) are strictly required."
        }), 400
    
    if not re.match(EMAIL_REGEX, email):
        return jsonify({"error": "Invalid email address protocol format."}), 400
    
    # 3. Process the data (Log it to console for now)
    # In a production environment, you would hook up an email service (like SendGrid) or write to a database here.
    print("\n--- NEW SECURE BOOKING REQUEST ---")
    print(print(f"Patient Name: {name}"))
    print(f"Secure Email: {email}")
    print(f"Clinical Notes: {message}")
    print("-----------------------------------\n")

    # 4. success response 
    return jsonify({
        "success": True,
        "message": "Submission successful. Our clinical team will reach out shortly."
    }), 200