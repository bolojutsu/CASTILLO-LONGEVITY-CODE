import os
import re

import stripe
from flask import Blueprint, request, jsonify

pricing_bp = Blueprint("pricing", __name__)
stripe.api_key = os.environ.get('STRIPE_API_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:5173').rstrip('/')
SESSION_ID_REGEX = re.compile(r"^cs_(?:test|live)_[A-Za-z0-9]+$")

PLAN_PRICE_IDS = {
    "Foundation": "price_1TlSt9CAWtp7tsPsOmI3O0Kk",
}


@pricing_bp.route('/create-checkout-session',methods=['POST'])
def create_checkout_session():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "A JSON object is required"}), 400

    plan_name = data.get("planName")
    if not isinstance(plan_name, str):
        return jsonify({"error": "Invalid plan selected"}), 400

    price_id = PLAN_PRICE_IDS.get(plan_name)
    if not price_id:
        return jsonify({"error": "Invalid plan selected"}), 400
    if not stripe.api_key:
        return jsonify({"error": "Payment service is unavailable"}), 503

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price': price_id,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f'{FRONTEND_URL}/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{FRONTEND_URL}/gateway',
        )
        return jsonify({'url': checkout_session.url})
    except Exception:
        return jsonify(error="Unable to initialize payment session"), 502


@pricing_bp.route('/checkout-session-status', methods=['POST'])
def checkout_session_status():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "A JSON object is required"}), 400

    session_id = data.get("sessionId")
    if (
        not isinstance(session_id, str)
        or len(session_id) > 255
        or not SESSION_ID_REGEX.fullmatch(session_id)
    ):
        return jsonify({"error": "Invalid checkout session"}), 400
    if not stripe.api_key:
        return jsonify({"error": "Payment service is unavailable"}), 503

    try:
        session = stripe.checkout.Session.retrieve(
            session_id,
            expand=["line_items.data.price"],
        )
        line_items = session.get("line_items", {}).get("data", [])
        expected_price_ids = set(PLAN_PRICE_IDS.values())
        has_expected_item = (
            len(line_items) == 1
            and line_items[0].get("quantity") == 1
            and line_items[0].get("price", {}).get("id") in expected_price_ids
        )
        verified = (
            session.get("status") == "complete"
            and session.get("payment_status") == "paid"
            and has_expected_item
        )
        return jsonify({"verified": verified})
    except Exception:
        return jsonify(error="Unable to verify payment session"), 502