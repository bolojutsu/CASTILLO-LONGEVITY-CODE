# import os
# from dotenv import load_dotenv
# load_dotenv()

# from flask import Flask
# from flask_cors import CORS
# from contact import contact_bp
# from chat import chat_bp
# from pricing import pricing_bp

# def create_app():
#     app = Flask(__name__)
#     cors_origins = [
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:3000",
#     ]
#     frontend_url = os.environ.get("FRONTEND_URL", "").rstrip("/")
#     if frontend_url and frontend_url not in cors_origins:
#         cors_origins.append(frontend_url)
#     CORS(app, origins=cors_origins)

#     app.register_blueprint(contact_bp)
#     app.register_blueprint(chat_bp)
#     app.register_blueprint(pricing_bp)
#     return app

# app = create_app()

# if __name__ == "__main__":
#     app.run(host='127.0.0.1', port=5000, debug=True)