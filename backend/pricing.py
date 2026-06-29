import os
from flask import Blueprint, request, jsonify
import stripe

pricing_bp = Blueprint("pricing", __name__)
stripe.api_key = os.environ.get('STRIPE_API_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:5173').rstrip('/')

plan_price_id = {
    "Foundation": "price_1TlSt9CAWtp7tsPsOmI3O0Kk",
}

@pricing_bp.route('/create-checkout-session',methods=['POST'])
def create_checkout_session():
    try: 
        data = request.get_json() or {}
        plan_name = data.get("planName")

        price_id = plan_price_id.get(plan_name)
        if not price_id:
            return jsonify({
                "error": f"Invalid plan selected: {plan_name}"
            }), 400
        
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price': price_id,
                    'quantity': 1,
                },
            ],
            # If these are recurring monthly billing packages, switch mode to 'subscription'
            mode='payment', 
            success_url=f'http://localhost:5173/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'http://localhost:5173/gateway',
        )
        return jsonify({
            'url': checkout_session.url
        })
    except Exception as e:
        print(f"[Stripe Error]: {e}")
        return jsonify(error=str(e)), 500