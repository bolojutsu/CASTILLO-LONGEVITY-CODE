from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Shared limiter instance. Import this in app.py to attach it to the Flask app,
# and import it in any blueprint file to apply @limiter.limit(...) to a route.
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[],  # no global default; set limits per-route instead
    storage_uri="memory://",  # fine for a single Railway instance; see note below
)