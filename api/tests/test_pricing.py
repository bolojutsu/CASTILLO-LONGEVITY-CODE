import pricing


def test_valid_plan_creates_checkout_session(client, monkeypatch):
    captured = {}

    class FakeSession:
        url = "https://checkout.stripe.test/session/abc"

    def fake_create(**kwargs):
        captured.update(kwargs)
        return FakeSession()

    monkeypatch.setattr(pricing.stripe.checkout.Session, "create", staticmethod(fake_create))

    response = client.post("/create-checkout-session", json={"planName": "Foundation"})

    assert response.status_code == 200
    assert response.get_json()["url"] == "https://checkout.stripe.test/session/abc"
    assert captured["line_items"][0]["price"] == pricing.plan_price_id["Foundation"]
    assert captured["mode"] == "payment"


def test_invalid_plan_returns_400(client):
    response = client.post("/create-checkout-session", json={"planName": "Nonexistent"})
    assert response.status_code == 400
    assert "invalid plan" in response.get_json()["error"].lower()


def test_missing_plan_name_returns_400(client):
    response = client.post("/create-checkout-session", json={})
    assert response.status_code == 400
    assert "invalid plan" in response.get_json()["error"].lower()


def test_stripe_failure_returns_500(client, monkeypatch):
    def boom(**kwargs):
        raise RuntimeError("stripe unavailable")

    monkeypatch.setattr(pricing.stripe.checkout.Session, "create", staticmethod(boom))

    response = client.post("/create-checkout-session", json={"planName": "Foundation"})
    assert response.status_code == 500
    assert "stripe unavailable" in response.get_json()["error"].lower()
