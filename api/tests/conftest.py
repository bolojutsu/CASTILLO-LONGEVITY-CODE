import os
import sys

import pytest

# Ensure the api/ package directory is importable as top-level modules
# (contact, chat, pricing, index) exactly as the application imports them.
API_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if API_DIR not in sys.path:
    sys.path.insert(0, API_DIR)


@pytest.fixture
def app():
    import index

    application = index.create_app()
    application.config.update(TESTING=True)
    return application


@pytest.fixture
def client(app):
    return app.test_client()
