import os
from flask import Blueprint, request, jsonify
from svix.webhooks import Webhook, WebhookVerificationError
import redis

resend_webhook_bp = Blueprint("resend_webhook", __name__)

RESEND_WEBHOOK_SECRET = os.environ.get("RESEND_WEBHOOK_SECRET")

# --- Idempotency store ---------------------------------------------------
# Resend/Svix delivers at-least-once, so the same event can arrive more than
# once (retries, redelivery, etc). We dedupe on svix-id.
#
# Backed by the same Redis instance as flask_limiter (REDIS_URL) so dedup
# state is shared across serverless instances/cold starts. Falls back to a
# per-instance in-memory set if REDIS_URL isn't configured (e.g. local dev),
# with the same limitation flask_limiter has: it resets on restart and
# won't hold under multiple concurrent instances.
REDIS_URL = os.environ.get("REDIS_URL")
_redis_client = redis.Redis.from_url(REDIS_URL) if REDIS_URL else None
_processed_event_ids = set()  # local fallback only, used when REDIS_URL is unset

PROCESSED_EVENT_TTL_SECONDS = 60 * 60 * 24  # 1 day — comfortably longer than Svix's retry window


def _already_processed(svix_id: str) -> bool:
    """Returns True if this event was already handled. Marks it as processed
    as a side effect (atomically, when Redis is available)."""
    if _redis_client:
        key = f"processed_events:{svix_id}"
        # SET NX+EX is atomic: returns None if the key already existed.
        was_set = _redis_client.set(key, "1", nx=True, ex=PROCESSED_EVENT_TTL_SECONDS)
        return not was_set
    else:
        if svix_id in _processed_event_ids:
            return True
        _processed_event_ids.add(svix_id)
        return False


@resend_webhook_bp.route("/webhook/resend", methods=["POST"])
def resend_webhook():
    if not RESEND_WEBHOOK_SECRET:
        print("[Resend Webhook] RESEND_WEBHOOK_SECRET is not configured.")
        return jsonify({"error": "Webhook not configured"}), 500

    payload = request.get_data()  # raw bytes — required for signature verification
    headers = {
        "svix-id": request.headers.get("svix-id", ""),
        "svix-timestamp": request.headers.get("svix-timestamp", ""),
        "svix-signature": request.headers.get("svix-signature", ""),
    }

    try:
        wh = Webhook(RESEND_WEBHOOK_SECRET)
        event = wh.verify(payload, headers)
    except WebhookVerificationError:
        print("[Resend Webhook] Signature verification failed — request did not come from Resend.")
        return jsonify({"error": "Invalid signature"}), 400
    except Exception as e:
        print(f"[Resend Webhook] Unexpected error verifying event: {e}")
        return jsonify({"error": "Unable to process webhook"}), 400

    svix_id = headers["svix-id"]
    if _already_processed(svix_id):
        # Already handled this exact delivery — ack and stop, don't re-send emails etc.
        return jsonify({"received": True, "duplicate": True}), 200

    event_type = event.get("type")
    data = event.get("data", {})

    try:
        if event_type == "email.bounced":
            handle_bounce(data)
        elif event_type == "email.complained":
            handle_complaint(data)
        elif event_type == "email.delivery_delayed":
            handle_delayed(data)
        elif event_type == "email.delivered":
            print(f"[Resend Webhook] Delivered: {data.get('email_id')} to {data.get('to')}")
        elif event_type in ("email.opened", "email.clicked"):
            # Only fires if you've enabled open/click tracking on the sending domain.
            print(f"[Resend Webhook] {event_type}: {data.get('email_id')}")
        else:
            print(f"[Resend Webhook] Ignoring unhandled event type: {event_type}")
    except Exception as e:
        print(f"[Resend Webhook] Error handling event {event_type}: {e}")
        return jsonify({"error": "Error processing event"}), 500

    return jsonify({"received": True}), 200


def handle_bounce(data):
    """
    A hard bounce means the confirmation email never reached the patient —
    the booking exists in your system but they have no idea. Worth surfacing
    somewhere you'll actually see it (admin notification email, a dashboard
    flag, etc) rather than letting it die in server logs.
    """
    email_id = data.get("email_id")
    to = data.get("to")
    bounce_type = data.get("bounce", {}).get("type")  # e.g. "Permanent" / "Transient"
    print(f"[Resend Webhook] BOUNCE ({bounce_type}) email_id={email_id} to={to}")
    # TODO: send yourself an alert, or flag the booking record if/when you add a DB


def handle_complaint(data):
    """
    Recipient marked the email as spam. Rare for transactional confirmations,
    but if it happens you should stop emailing that address — repeated
    complaints hurt your sending domain's reputation with every provider.
    """
    email_id = data.get("email_id")
    to = data.get("to")
    print(f"[Resend Webhook] COMPLAINT email_id={email_id} to={to}")
    # TODO: add `to` to a suppression list once you have persistent storage


def handle_delayed(data):
    """
    Not a failure yet — the receiving server is temporarily deferring
    delivery. Just worth logging so a pattern of delays is visible before
    it turns into bounces.
    """
    email_id = data.get("email_id")
    to = data.get("to")
    print(f"[Resend Webhook] DELIVERY DELAYED email_id={email_id} to={to}")