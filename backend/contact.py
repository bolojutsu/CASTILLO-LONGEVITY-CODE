import re
import os
import resend
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify

contact_bp = Blueprint('contact', __name__)
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

resend.api_key = os.environ.get("RESEND_API_KEY")
YOUR_EMAIL = os.environ.get("YOUR_EMAIL")
SENDER_EMAIL = os.environ.get("RESEND_SENDER_EMAIL")


@contact_bp.route('/contact', methods=['POST'])
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
    
    try:
        parameters = {
            "from": SENDER_EMAIL,
            "to":[YOUR_EMAIL],
            "subject": f"New Secure Booking Request - {name}",
            "html": f"""
                <h3>New Booking Request</h3>
                <p><strong>Patient Name:</strong> {name}</p>
                <p><strong>Secure Email:</strong> {email}</p>
                <p><strong>Clinical Notes:</strong></p>
                <p style="white-space: pre-wrap;">{message}</p>
            """
        }
        resend.Emails.send(parameters)


        # EMAIL 2: Sends an automatic confirmation receipt to the USER who filled out the form
        # NOTE: If you are using a free Resend sandbox (onboarding@resend.dev), you can ONLY 
        # send to yourself. Once you verify your custom domain, you can safely uncomment this block!

        # user_parameters = {
        #     "from": SENDER_EMAIL,
        #     "to": [email],
        #     "subject": "Consulttaion Request Initiated - Enrique Castillo",
        #     "html": f"""
        #          <div style="font-family: Arial, sans-serif; padding: 20px; color: #12201C; max-width: 600px;">
        #              <h2 style="color: #16372E;">Hello {name},</h2>
        #              <p>Thank you for initiating a consultation with Enrique Castillo and our longevity research ecosystem.</p>
        #              <p>We have successfully received your clinical notes and request parameters. Our team will review your file and reach out shortly to map your personalized biological vitality track.</p>
        #              <br />
        #              <hr style="border: none; border-top: 1px solid rgba(18,32,28,0.08);" />
        #              <p style="font-size: 12px; color: #63756F;">This is an automated receipt confirming your secure gateway transmission.</p>
        #          </div>
        #     """ 
        # }
        # resend.Emails.send(user_parameters)


    except Exception as e:
        print(f"Resend Email Error: {e}")
        return jsonify({"error": "Internal mail server error. Please try again later."}), 500

    print("\n--- NEW SECURE BOOKING REQUEST ---")
    print(f"Patient Name: {name}")
    print(f"Secure Email: {email}")
    print(f"Clinical Notes: {message}")
    print("-----------------------------------\n")

    # 4. success response 
    return jsonify({
        "success": True,
        "message": "Submission successful. Our clinical team will reach out shortly."
    }), 200