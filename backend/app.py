from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import joblib

app = FastAPI(title="Sales Forecast API")

# Allow React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Dataset
df = pd.read_csv("Walmart.csv")

df["Date"] = pd.to_datetime(df["Date"], format="%d-%m-%Y")
# Load Prophet Model
model = joblib.load("prophet_model.pkl")


# ------------------------
# Home
# ------------------------
@app.get("/")
def home():
    return {"message": "Sales Forecast API Running"}


# ------------------------
# Dashboard
# ------------------------
@app.get("/dashboard")
def dashboard():

    return {
        "total_sales": round(df["Weekly_Sales"].sum(), 2),
        "average_sales": round(df["Weekly_Sales"].mean(), 2),
        "highest_sales": round(df["Weekly_Sales"].max(), 2),
        "lowest_sales": round(df["Weekly_Sales"].min(), 2),
        "best_model": "Prophet"
    }


# ------------------------
# Forecast
# ------------------------
@app.get("/forecast/{weeks}")
def forecast(weeks: int):

    future = model.make_future_dataframe(periods=weeks, freq="W")

    pred = model.predict(future)

    result = pred.tail(weeks)[
        ["ds", "yhat", "yhat_lower", "yhat_upper"]
    ]

    return result.to_dict(orient="records")


# ------------------------
# Analytics
# ------------------------
@app.get("/analytics")
def analytics():

    temp = df.copy()

    temp["Month"] = temp["Date"].dt.strftime("%b")

    monthly = (
        temp.groupby("Month")["Weekly_Sales"]
        .sum()
        .reset_index()
    )

    monthly = monthly.rename(
        columns={
            "Month": "month",
            "Weekly_Sales": "sales"
        }
    )

    holiday = (
        temp.groupby("Holiday_Flag")["Weekly_Sales"]
        .sum()
        .reset_index()
    )

    holiday["name"] = holiday["Holiday_Flag"].replace({
        0: "Non-Holiday",
        1: "Holiday"
    })

    holiday = holiday.rename(
        columns={
            "Weekly_Sales": "sales"
        }
    )

    holiday = holiday[
        ["name", "sales"]
    ]

    stores = (
        temp.groupby("Store")["Weekly_Sales"]
        .sum()
        .reset_index()
    )

    stores = stores.rename(
        columns={
            "Store": "store",
            "Weekly_Sales": "sales"
        }
    )

    return {
        "monthly_sales": monthly.to_dict(orient="records"),
        "holiday_sales": holiday.to_dict(orient="records"),
        "store_sales": stores.to_dict(orient="records")
    }


# ------------------------
# Insights
# ------------------------
@app.get("/insights")
def insights():

    store = (
        df.groupby("Store")["Weekly_Sales"]
        .sum()
    )

    best = int(store.idxmax())

    worst = int(store.idxmin())

    return {
        "best_store": f"Store {best}",
        "worst_store": f"Store {worst}",
        "recommendation":
            "Increase inventory before holidays because forecast indicates higher demand."
    }