from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from . import models
import xgboost as xgb
import numpy as np
import httpx
import random
import os

app = FastAPI(title="ADA Sentinel - Risk Service")

# ── Global model handle ────────────────────────────────────────────────────────
risk_model = None

# ── 1. Startup: load XGBoost model ────────────────────────────────────────────
@app.on_event("startup")
def load_model():
    global risk_model
    model_path = os.path.join(os.path.dirname(__file__), "..", "risk_model.json")
    risk_model = xgb.XGBClassifier()
    risk_model.load_model(model_path)
    print("XGBoost model loaded successfully")

# ── 2. External fetchers (async, mocked) ──────────────────────────────────────
async def fetch_weather_score() -> float:
    """
    Mock fetching weather impact from OpenWeather.
    Replace the URL + parsing logic with the real API when ready.
    Returns a float 0.0 (clear) → 1.0 (severe).
    """
    async with httpx.AsyncClient() as client:
        try:
            # Swap this URL for the real OpenWeather endpoint later
            response = await client.get("https://mock-weather-api.example.com/score", timeout=3.0)
            data = response.json()
            return float(data.get("impact_score", random.uniform(0.0, 1.0)))
        except Exception:
            # Fallback to random mock if the call fails
            return round(random.uniform(0.0, 1.0), 2)


async def fetch_traffic_score() -> float:
    """
    Mock fetching traffic delay from Google Maps.
    Replace the URL + parsing logic with the real API when ready.
    Returns a float 0.0 (clear) → 1.0 (severe gridlock).
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get("https://mock-traffic-api.example.com/score", timeout=3.0)
            data = response.json()
            return float(data.get("delay_score", random.uniform(0.0, 1.0)))
        except Exception:
            return round(random.uniform(0.0, 1.0), 2)

# ── 3. Risk helpers ────────────────────────────────────────────────────────────
def get_risk_category(score: float) -> str:
    if score >= 0.75:
        return "HIGH"
    elif score >= 0.40:
        return "MEDIUM"
    return "LOW"


def get_recommended_message(category: str) -> str:
    messages = {
        "HIGH": (
            "High failure risk detected. WhatsApp triage triggered — "
            "customer will be contacted to confirm availability or reschedule."
        ),
        "MEDIUM": (
            "Moderate risk. Driver has been flagged to double-check "
            "address details and attempt to call customer on arrival."
        ),
        "LOW": (
            "Low risk. Delivery is on track — no action required."
        ),
    }
    return messages[category]

# ── 4. Predict endpoint ────────────────────────────────────────────────────────
@app.post("/predict")
async def predict_risk(
    delivery_id: int,
    customer_id: int,
    db: Session = Depends(get_db)
):
    if risk_model is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet. Try again shortly.")

    # ── 4a. Pull customer history_score from DB ────────────────────────────────
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail=f"Customer {customer_id} not found.")

    history_score: float = float(customer.history_score)

    # ── 4b. Fetch live signals ─────────────────────────────────────────────────
    weather_score  = await fetch_weather_score()
    traffic_score  = await fetch_traffic_score()

    # ── 4c. Run XGBoost prediction ─────────────────────────────────────────────
    features = np.array([[weather_score, traffic_score, history_score]])  # shape (1, 3)
    raw_prob  = risk_model.predict_proba(features)[0][1]                  # prob of class 1 (failure)
    risk_score = round(float(raw_prob), 4)

    # ── 4d. Persist updated score + signals on the delivery row ───────────────
    delivery = db.query(models.Delivery).filter(models.Delivery.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail=f"Delivery {delivery_id} not found.")

    delivery.risk_score = risk_score
    delivery.signals = {
        "weather_impact":    weather_score,
        "traffic_delay":     traffic_score,
        "customer_history":  history_score,
    }
    db.commit()

    # ── 4e. Build response ─────────────────────────────────────────────────────
    category = get_risk_category(risk_score)
    return {
        "delivery_id":         delivery_id,
        "customer_id":         customer_id,
        "risk_score":          risk_score,
        "risk_category":       category,
        "signals": {
            "weather_impact":   weather_score,
            "traffic_delay":    traffic_score,
            "customer_history": history_score,
        },
        "recommended_message": get_recommended_message(category),
    }

# ── Health / root ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ADA Sentinel Risk Service is live"}

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": risk_model is not None}