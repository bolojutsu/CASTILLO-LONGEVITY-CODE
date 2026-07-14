from flask import jsonify


def json_error(message, status):
    """Build a standard JSON error response.

    Centralizes the ``jsonify({"error": ...}), status`` pattern that was
    duplicated across the chat, contact and pricing blueprints.
    """
    return jsonify({"error": message}), status
