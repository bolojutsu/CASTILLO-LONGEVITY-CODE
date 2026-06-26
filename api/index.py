import sys
from pathlib import Path

# Make backend modules (contact, chat, pricing) importable from main.py
backend_dir = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(backend_dir))

from main import app  # noqa: F401 — Vercel loads this WSGI instance
