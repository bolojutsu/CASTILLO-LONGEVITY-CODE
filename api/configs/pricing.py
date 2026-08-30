import os
from flask import Blueprint, request, jsonify
import stripe
from configs.limiter import limiter

pricing_bp = Blueprint("pricing", __name__)
stripe.api_key = os.environ.get('STRIPE_API_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:5000').rstrip('/')

plan_price_id = {
    "Foundation": "price_1TlSt9CAWtp7tsPsOmI3O0Kk",
}

@pricing_bp.route('/create-checkout-session', methods=['POST'])
@limiter.limit("5 per minute; 20 per hour")
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


@pricing_bp.route('/verify-session/<session_id>', methods=['GET'])
@limiter.limit("30 per minute")
def verify_session(session_id):
    try:
        session = stripe.checkout.Session.retrieve(session_id)

        if session.payment_status == 'paid':
            return jsonify({
                'verified': True,
                'customer_email': session.customer_details.email if session.customer_details else None,
            })
        else:
            return jsonify({
                'verified': False,
                'error': 'Payment has not been completed for this session.'
            }), 402

    except stripe.error.InvalidRequestError:
        return jsonify({
            'verified': False,
            'error': 'Session not found.'
        }), 404
    except Exception as e:
        print(f"[Stripe Verify Error]: {e}")
        return jsonify({
            'verified': False,
            'error': 'Unable to verify payment session.'
        }), 500