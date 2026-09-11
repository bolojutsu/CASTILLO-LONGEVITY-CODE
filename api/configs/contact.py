import re
import os
import resend
from flask import Blueprint, request, jsonify
from configs.limiter import limiter

contact_bp = Blueprint('contact', __name__)
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
PHONE_REGEX = r'^\+?[1-9]\d{1,14}$'

def _env(name: str) -> str:
    return (os.environ.get(name) or "").strip().strip('"').strip("'")

resend.api_key = _env("RESEND_API_KEY")
YOUR_EMAIL = _env("YOUR_EMAIL")
SENDER_EMAIL = _env("RESEND_SENDER_EMAIL")


@contact_bp.route('/contact', methods=['POST'])
@limiter.limit("3 per minute; 10 per hour")
def handle_contact_submission():
    data = request.get_json()

    # 1. check if payload exist
    if not data:
        return jsonify({
            "error": "Malformed request. Missing payload"
        }), 400
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    number = data.get('number', '').strip()
    message = data.get('message', '').strip()

    # 2 feild validation
    if not name or not email or not number or not message:
        return jsonify({
            "error": "All fields (Name, Email, Number, Message) are strictly required."
        }), 400
    
    if not re.match(EMAIL_REGEX, email):
        return jsonify({"error": "Invalid email address protocol format."}), 400

    
    clean_number = re.sub(r'[\s\-\(\)\.]', '', number)
    
    if not re.match(PHONE_REGEX, clean_number):
        return jsonify({"error": "Invalid phone number format."}), 400

    # 3. Process the data (Log it to console for now)
    # In a production environment, you would hook up an email service (like SendGrid) or write to a database here.
    
    if not resend.api_key or not YOUR_EMAIL or not SENDER_EMAIL:
        print("[Contact] Missing RESEND_API_KEY, YOUR_EMAIL, or RESEND_SENDER_EMAIL")
        return jsonify({
            "error": "Email is not configured on the server."
        }), 500

    try:
        resend.Emails.send({
            "from": SENDER_EMAIL,
            "to": [YOUR_EMAIL],
            "reply_to": email,
            "subject": f"New consultation request - {name}",
            "html": f"""
                <h3>New Consultation Request</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {number}</p>
                <p><strong>Notes:</strong></p>
                <p style="white-space: pre-wrap;">{message}</p>
            """,
            "text": (
                f"New Consultation Request\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Phone: {number}\n\n"
                f"Notes:\n{message}\n"
            )
        })
    except Exception as e:
        print(f"[Contact] Operator email failed: {e}")
        return jsonify({
            "error": "Email provider rejected the send. Verify the Resend domain and API key."
        }), 500

    # Confirmation to the visitor is optional. Resend testing mode can only
    # deliver to the account owner's inbox, so a failure here must not
    # fail the intake after the operator email already went out.
    try:
        resend.Emails.send({
            "from": SENDER_EMAIL,
            "to": [email],
            "subject": "We received your consultation request - Enrique Castillo",
            "html": f"""
                 <div style="font-family: Arial, sans-serif; padding: 20px; color: #12201C; max-width: 600px;">
                     <h2 style="color: #16372E;">Hello {name},</h2>
                     <p>Thank you for reaching out to Enrique Castillo and the longevity team.</p>
                     <p>We've received your message and someone from our team will get back to you shortly.</p>
                     <br />
                     <hr style="border: none; border-top: 1px solid rgba(18,32,28,0.08);" />
                     <p style="font-size: 12px; color: #63756F;">This is an automated confirmation of your submission.</p>
                 </div>
            """,
            "text": (
                f"Hello {name},\n\n"
                f"Thank you for reaching out to Enrique Castillo and the longevity team.\n"
                f"We've received your message and someone from our team will get back to you shortly.\n\n"
                f"-- This is an automated confirmation of your submission.\n"
            )
        })
    except Exception as e:
        print(f"[Contact] Visitor confirmation skipped: {e}")

    print("\n--- NEW SECURE BOOKING REQUEST ---")
    print(f"Patient Name: {name}")
    print(f"Secure Email: {email}")
    print(f"Phone Number: {number}")
    print(f"Clinical Notes: {message}")
    print("-----------------------------------\n")

    # 4. success response 
    return jsonify({
        "success": True,
        "message": "Submission successful. Our clinical team will reach out shortly."
    }), 200