import re

import contact


def test_email_regex_accepts_valid_addresses():
    valid = [
        "user@example.com",
        "first.last@sub.domain.org",
        "name+tag@example.co",
        "u_s-er%1@ex-ample.io",
    ]
    for address in valid:
        assert re.match(contact.EMAIL_REGEX, address), address


def test_email_regex_rejects_invalid_addresses():
    invalid = [
        "plainaddress",
        "@no-local.com",
        "no-at-sign.com",
        "trailing@dot.",
        "space in@address.com",
        "short@tld.c",
    ]
    for address in invalid:
        assert not re.match(contact.EMAIL_REGEX, address), address


def test_contact_missing_payload_returns_400(client):
    response = client.post("/contact", json={})
    assert response.status_code == 400
    assert "payload" in response.get_json()["error"].lower()


def test_contact_missing_required_fields_returns_400(client):
    response = client.post("/contact", json={"name": "Jane", "email": "", "message": ""})
    assert response.status_code == 400
    assert "required" in response.get_json()["error"].lower()


def test_contact_invalid_email_returns_400(client):
    response = client.post(
        "/contact",
        json={"name": "Jane", "email": "not-an-email", "message": "Hello there"},
    )
    assert response.status_code == 400
    assert "email" in response.get_json()["error"].lower()


def test_contact_valid_submission_sends_email_and_returns_200(client, monkeypatch):
    sent = {}

    def fake_send(parameters):
        sent["parameters"] = parameters
        return {"id": "email_123"}

    monkeypatch.setattr(contact.resend.Emails, "send", staticmethod(fake_send))

    response = client.post(
        "/contact",
        json={
            "name": "  Jane Doe  ",
            "email": " jane@example.com ",
            "message": "  I would like a consultation.  ",
        },
    )

    assert response.status_code == 200
    body = response.get_json()
    assert body["success"] is True
    # inputs are stripped before use
    assert "Jane Doe" in sent["parameters"]["subject"]
    assert "Jane Doe" in sent["parameters"]["html"]
    assert "jane@example.com" in sent["parameters"]["html"]


def test_contact_email_service_failure_returns_500(client, monkeypatch):
    def boom(parameters):
        raise RuntimeError("resend down")

    monkeypatch.setattr(contact.resend.Emails, "send", staticmethod(boom))

    response = client.post(
        "/contact",
        json={"name": "Jane", "email": "jane@example.com", "message": "Hello"},
    )
    assert response.status_code == 500
    assert "mail server" in response.get_json()["error"].lower()
