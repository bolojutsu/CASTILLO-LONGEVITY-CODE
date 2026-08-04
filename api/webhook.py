import os
import stripe
import resend
from flask import Blueprint, request, jsonify

webhook_bp = Blueprint("webhook", __name__)

STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET")
YOUR_EMAIL = os.environ.get("YOUR_EMAIL")
SENDER_EMAIL = os.environ.get("RESEND_SENDER_EMAIL")
resend.api_key = os.environ.get("RESEND_API_KEY")


@webhook_bp.route("/webhook/stripe", methods=["POST"])
def stripe_webhook():
    # Intentionally NOT rate-limited: Stripe's own signature check below is the
    # real authentication for this route, and Stripe needs to be able to deliver
    # (and retry) events reliably regardless of per-IP limits.
    if not STRIPE_WEBHOOK_SECRET:
        print("[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured.")
        return jsonify({"error": "Webhook not configured"}), 500

    payload = request.get_data()  # raw bytes — required for signature verification
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except ValueError:
        print("[Stripe Webhook] Invalid payload.")
        return jsonify({"error": "Invalid payload"}), 400
    except stripe.error.SignatureVerificationError:
        print("[Stripe Webhook] Signature verification failed — request did not come from Stripe.")
        return jsonify({"error": "Invalid signature"}), 400
    except Exception as e:
        # Belt-and-suspenders: construct_event can raise other errors on
        # malformed/unexpected payload shapes. Fail closed with a clean
        # response rather than letting an unhandled exception surface.
        print(f"[Stripe Webhook] Unexpected error verifying event: {e}")
        return jsonify({"error": "Unable to process webhook"}), 400

    event_type = getattr(event, "type", None)

    try:
        if event_type == "checkout.session.completed":
            handle_checkout_completed(event["data"]["object"])
        elif event_type == "checkout.session.async_payment_failed":
            session = event["data"]["object"]
            print(f"[Stripe Webhook] Async payment failed for session {getattr(session, 'id', 'unknown')}")
        else:
            # Unhandled event types are expected — Stripe sends many event types
            # by default. Acknowledging with 200 tells Stripe not to retry.
            print(f"[Stripe Webhook] Ignoring unhandled event type: {event_type}")
    except Exception as e:
        # A bug in our own handling logic shouldn't surface as an unhandled 500
        # with a stack trace — log it and let Stripe's dashboard retry the event.
        print(f"[Stripe Webhook] Error handling event {event_type}: {e}")
        return jsonify({"error": "Error processing event"}), 500

    return jsonify({"received": True}), 200


def handle_checkout_completed(session):
    """
    This is the source of truth that a payment actually succeeded — unlike the
    browser redirect to /success, which can fail to fire (closed tab, crashed
    browser, flaky network) even after a real, successful charge.
    """
    session_id = getattr(session, "id", None)
    customer_details = getattr(session, "customer_details", None)
    customer_email = getattr(customer_details, "email", None) if customer_details else None
    amount_total = getattr(session, "amount_total", None)
    amount_display = f"${amount_total / 100:.2f}" if amount_total is not None else "Unknown"

    print(f"[Stripe Webhook] Payment confirmed. session={session_id} email={customer_email} amount={amount_display}")

    if not (YOUR_EMAIL and SENDER_EMAIL):
        print("[Stripe Webhook] YOUR_EMAIL or RESEND_SENDER_EMAIL not configured — skipping notification email.")
        return

    try:
        resend.Emails.send({
            "from": SENDER_EMAIL,
            "to": [YOUR_EMAIL],
            "subject": f"New Paid Booking — Session {session_id}",
            "html": f"""
                <h3>Payment Confirmed via Stripe Webhook</h3>
                <p><strong>Session ID:</strong> {session_id}</p>
                <p><strong>Customer Email:</strong> {customer_email or 'Not provided'}</p>
                <p><strong>Amount:</strong> {amount_display}</p>
            """
        })
    except Exception as e:
        # A failed notification email should never break webhook processing —
        # Stripe already retries the event itself if we don't return 200 fast enough,
        # and the payment record lives in Stripe's dashboard regardless.
        print(f"[Stripe Webhook] Failed to send notification email: {e}")