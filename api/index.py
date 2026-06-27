import os
from flask import Flask
from flask_cors import CORS

# Import your blueprints directly from the backend folder
from backend.contact import contact_bp
from backend.chat import chat_bp
from backend.pricing import pricing_bp

def create_app():
    app = Flask(__name__)
    
    # Configure CORS origins
    cors_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
    
    frontend_url = os.environ.get("FRONTEND_URL", "").rstrip("/")
    if frontend_url and frontend_url not in cors_origins:
        cors_origins.append(frontend_url)
        
    CORS(app, origins=cors_origins)

    # Register blueprints
    app.register_blueprint(contact_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(pricing_bp)
    
    return app

# Vercel looks for a global variable named 'app' to run the WSGI server
app = create_app()