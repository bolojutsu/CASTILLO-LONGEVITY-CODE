import os
from urllib.parse import urlsplit

from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS
from contact import contact_bp
from chat import chat_bp
from pricing import pricing_bp


def _is_valid_origin(origin):
    parsed = urlsplit(origin)
    return (
        parsed.scheme in {"http", "https"}
        and bool(parsed.netloc)
        and parsed.username is None
        and parsed.password is None
        and parsed.path in {"", "/"}
        and not parsed.query
        and not parsed.fragment
        and not any(character in origin for character in "*?[](){}|\\")
    )


def _cors_origins():
    origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    }
    configured_origins = [
        os.environ.get("FRONTEND_URL", ""),
        *os.environ.get("CORS_ORIGINS", "").split(","),
    ]
    origins.update(
        origin.strip().rstrip("/")
        for origin in configured_origins
        if _is_valid_origin(origin.strip())
    )
    return sorted(origins)


def create_app():
    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = 64 * 1024
    CORS(
        app,
        origins=_cors_origins(),
        methods=["POST", "OPTIONS"],
        allow_headers=["Content-Type"],
        supports_credentials=False,
    )

    app.register_blueprint(contact_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(pricing_bp)

    @app.after_request
    def add_security_headers(response):
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        return response

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)