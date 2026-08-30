import os
from flask_limiter import Limiter
from flask import request
from flask_limiter.util import get_remote_address


def get_client_ip():
    """
    Vercel sits in front of this app, so request.remote_addr is often
    Vercel's edge IP, not the real client. X-Forwarded-For's first entry
    is the original client set by the edge network.
    """
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address()


REDIS_URL = os.environ.get("REDIS_URL")

limiter = Limiter(
    get_client_ip,
    storage_uri=REDIS_URL if REDIS_URL else "memory://",
    default_limits=["200 per day", "50 per hour"],
    strategy="fixed-window",
    # If Redis has a blip, fail open rather than blocking real patients.
    # Logged so you notice, but the intake form keeps working.
    swallow_errors=True,
    on_breach=lambda limit: print(f"[RateLimit] Breach: {limit}"),
)

if not REDIS_URL:
    print("[RateLimit] WARNING: REDIS_URL not set — using in-memory storage. "
          "Limits are per-instance only and will not hold under serverless scale.")