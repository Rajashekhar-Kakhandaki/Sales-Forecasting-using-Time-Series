# 📈 Sales Forecasting using Time Series Analysis

## 📌 Project Overview

This project predicts future Walmart weekly sales using Time Series Forecasting techniques. It compares ARIMA, SARIMA, and Facebook Prophet models and deploys the best-performing model through a FastAPI backend with a React-based analytics dashboard.

---

## 🎯 Objectives

- Forecast future weekly sales.
- Compare forecasting models.
- Visualize sales trends and business insights.
- Build a responsive analytics dashboard.

---

## 🛠 Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Material UI
- Recharts
- Axios

### Backend
- FastAPI
- Uvicorn
- Joblib

### Machine Learning
- Pandas
- NumPy
- Matplotlib
- Statsmodels
- Prophet
- Scikit-learn

---

## 📂 Project Structure

```
SalesForecasting
│
├── backend
│   ├── app.py
│   ├── prophet_model.pkl
│   ├── Walmart.csv
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── assets
│   │
│   ├── public
│   └── package.json
│
├── notebook
│   └── Sales Forecasting using Time Series Analysis.ipynb
│
└── README.md
```

---

## 📊 Dataset

Dataset: Walmart Sales Forecasting

Columns:

- Store
- Date
- Weekly_Sales
- Holiday_Flag
- Temperature
- Fuel_Price
- CPI
- Unemployment

Target Variable:

```
Weekly_Sales
```

---

## 📈 Methodology

1. Data Cleaning
2. Feature Engineering
3. Exploratory Data Analysis
4. ARIMA Model
5. SARIMA Model
6. Prophet Model
7. Model Evaluation
8. Dashboard Development

---

## 📉 Model Performance

| Model | MAE | RMSE |
|------|------|------|
| ARIMA | 1.517M | 1.988M |
| SARIMA | 1.498M | 1.973M |
| Prophet | **1.227M** | **1.575M** |

### Best Model

**Facebook Prophet**

Reason:

- Lowest MAE
- Lowest RMSE
- Better forecasting accuracy

---

## 🚀 Features

### Dashboard

- KPI Cards
- Monthly Sales
- Holiday Sales
- Store-wise Sales

### Forecast

- Interactive Forecast Chart
- Confidence Interval
- Forecast Table
- CSV Export

### Analytics

- Monthly Analysis
- Holiday Analysis
- Store Performance

### Insights

- Best Store
- Worst Store
- Business Recommendation
- Sales Insights

---

## 💻 Running the Project

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger API:

```
http://127.0.0.1:8000/docs
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## 📦 Required Python Packages

- fastapi
- uvicorn
- pandas
- numpy
- prophet
- statsmodels
- matplotlib
- scikit-learn
- joblib

---

## 📦 Required Node Packages

- react
- axios
- tailwindcss
- @mui/material
- @mui/icons-material
- recharts
- react-router-dom

---

## 📊 Dashboard Modules

- Dashboard
- Forecast
- Analytics
- Insights

---

## 💡 Business Benefits

- Sales Forecasting
- Inventory Planning
- Demand Prediction
- Holiday Analysis
- Store Performance Analysis
- Better Business Decisions

---

## 🔮 Future Enhancements

- User Authentication
- Cloud Deployment
- Product-wise Forecasting
- Live Database Integration
- PDF Report Export
- Excel Export

---

## 👨‍💻 Developer

**Rajashekhar Kakhandaki**

B.E. Computer Science & Engineering

Dayananda Sagar Academy of Technology and Management (DSATM)

---

## 📄 License

This project was developed for academic and educational purposes.