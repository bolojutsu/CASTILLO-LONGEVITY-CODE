import os 
from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS
from extensions import limiter
from contact import contact_bp
from chat import chat_bp
from pricing import pricing_bp
from webhook import webhook_bp

def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
    limiter.init_app(app)

    cors_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
    frontend_url = os.environ.get("FRONTEND_URL", "").strip("/")
    if frontend_url and frontend_url not in cors_origins:
        cors_origins.append(frontend_url)
    CORS(app, origins=cors_origins)

    app.register_blueprint(contact_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(pricing_bp)
    app.register_blueprint(webhook_bp)
    return app

app = create_app()

if __name__ == "__main__":
    debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() == "true"
    app.run(host='127.0.0.1', port=5000, debug=debug_mode)