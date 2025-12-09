from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FEATURE_ORDER = [
    "CREDIT_SCORE",
    "VEHICLE_OWNERSHIP",
    "MARRIED",
    "CHILDREN",
    "POSTAL_CODE",
    "ANNUAL_MILEAGE",
    "SPEEDING_VIOLATIONS",
    "DUIS",
    "PAST_ACCIDENTS",
    "AGE",
    "DRIVING_EXPERIENCE",
    "GENDER_female",
    "GENDER_male",
    "RACE_majority",
    "RACE_minority",
    "EDUCATION_high school",
    "EDUCATION_none",
    "EDUCATION_university",
    "INCOME_middle class",
    "INCOME_poverty",
    "INCOME_upper class",
    "INCOME_working class",
    "VEHICLE_YEAR_after 2015",
    "VEHICLE_YEAR_before 2015",
    "VEHICLE_TYPE_sedan",
    "VEHICLE_TYPE_sports car",
]

class ClaimInput(BaseModel):
    credit_score: float
    vehicle_ownership: int
    married: int
    children: int
    postal_code: int
    annual_mileage: float
    speeding_violations: int
    duis: int
    past_accidents: int
    age: int
    driving_experience: int
    gender: str          # "male" / "female"
    race: str            # "majority" / "minority"
    education: str       # "none" / "high school" / "university"
    income: str          # "poverty" / "working class" / "middle class" / "upper class"
    vehicle_year: str    # "before 2015" / "after 2015"
    vehicle_type: str    # "sedan" / "sports car"


@app.post("/predict")
def predict_claim(data: ClaimInput):
    feats = {name: 0 for name in FEATURE_ORDER}

    # numeric
    feats["CREDIT_SCORE"] = data.credit_score
    feats["VEHICLE_OWNERSHIP"] = data.vehicle_ownership
    feats["MARRIED"] = data.married
    feats["CHILDREN"] = data.children
    feats["POSTAL_CODE"] = data.postal_code
    feats["ANNUAL_MILEAGE"] = data.annual_mileage
    feats["SPEEDING_VIOLATIONS"] = data.speeding_violations
    feats["DUIS"] = data.duis
    feats["PAST_ACCIDENTS"] = data.past_accidents
    feats["AGE"] = data.age
    feats["DRIVING_EXPERIENCE"] = data.driving_experience

    # gender
    g = data.gender.lower()
    if g == "female":
        feats["GENDER_female"] = 1
    elif g == "male":
        feats["GENDER_male"] = 1

    # race
    r = data.race.lower()
    if r == "majority":
        feats["RACE_majority"] = 1
    elif r == "minority":
        feats["RACE_minority"] = 1

    # education
    e = data.education.lower()
    if e == "high school":
        feats["EDUCATION_high school"] = 1
    elif e == "none":
        feats["EDUCATION_none"] = 1
    elif e == "university":
        feats["EDUCATION_university"] = 1

    # income
    inc = data.income.lower()
    if inc == "middle class":
        feats["INCOME_middle class"] = 1
    elif inc == "poverty":
        feats["INCOME_poverty"] = 1
    elif inc == "upper class":
        feats["INCOME_upper class"] = 1
    elif inc == "working class":
        feats["INCOME_working class"] = 1

    # vehicle year
    vy = data.vehicle_year.lower()
    if vy == "after 2015":
        feats["VEHICLE_YEAR_after 2015"] = 1
    elif vy == "before 2015":
        feats["VEHICLE_YEAR_before 2015"] = 1

    # vehicle type
    vt = data.vehicle_type.lower()
    if vt == "sedan":
        feats["VEHICLE_TYPE_sedan"] = 1
    elif vt == "sports car":
        feats["VEHICLE_TYPE_sports car"] = 1

    X = np.array([[feats[name] for name in FEATURE_ORDER]])

    pred = int(model.predict(X)[0])
    if hasattr(model, "predict_proba"):
        proba = float(model.predict_proba(X)[0][1])
    else:
        proba = float(pred)

    return {"prediction": pred, "probability": proba}
