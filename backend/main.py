from flask import Flask
from flask_cors import CORS
from contact import contact_bp
from chat import chat_bp
def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"])

    app.register_blueprint(contact_bp)
    app.register_blueprint(chat_bp)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='127.0.0.1', port=5000, debug=True)