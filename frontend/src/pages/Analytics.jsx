import { useEffect, useState } from "react";
import API from "../services/api";

import MonthlyChart from "../components/charts/MonthlyChart";
import HolidayChart from "../components/charts/HolidayChart";
import StoreChart from "../components/charts/StoreChart";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";

import {
  TrendingUp,
  TrendingDown,
  Store,
  Celebration,
} from "@mui/icons-material";

function Analytics() {
  const [data, setData] = useState({
    monthly_sales: [],
    holiday_sales: [],
    store_sales: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await API.get("/analytics");

      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-xl font-semibold text-blue-600">
          Loading Analytics...
        </div>
      </div>
    );
  }

  const peakMonth =
    data.monthly_sales.length > 0
      ? data.monthly_sales.reduce((a, b) =>
          a.sales > b.sales ? a : b
        )
      : null;

  const lowestMonth =
    data.monthly_sales.length > 0
      ? data.monthly_sales.reduce((a, b) =>
          a.sales < b.sales ? a : b
        )
      : null;

  const holidayContribution =
    data.holiday_sales.length > 0
      ? (
          (data.holiday_sales[0].sales /
            (data.holiday_sales[0].sales +
              data.holiday_sales[1].sales)) *
          100
        ).toFixed(1)
      : 0;

  const bestStore =
    data.store_sales.length > 0
      ? data.store_sales.reduce((a, b) =>
          a.sales > b.sales ? a : b
        )
      : null;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Sales Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Detailed analysis of monthly, holiday and
          store-wise sales performance.
        </p>
      </div>

      {/* Summary Cards */}

      <AnalyticsSummary
        monthly={data.monthly_sales}
        holiday={data.holiday_sales}
        stores={data.store_sales}
      />

      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-6">

        <MonthlyChart
          data={data.monthly_sales}
        />

        <HolidayChart
          data={data.holiday_sales}
        />

      </div>

      <StoreChart
        data={data.store_sales}
      />

      {/* Key Analytics */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Key Analytics
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-blue-50 rounded-xl p-5">

            <TrendingUp className="text-blue-600 text-4xl mb-3" />

            <h3 className="text-gray-500">
              Peak Month
            </h3>

            <p className="text-2xl font-bold mt-2">
              {peakMonth?.month}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingDown className="text-red-600 text-4xl mb-3" />

            <h3 className="text-gray-500">
              Lowest Month
            </h3>

            <p className="text-2xl font-bold mt-2">
              {lowestMonth?.month}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Celebration className="text-green-600 text-4xl mb-3" />

            <h3 className="text-gray-500">
              Holiday Sales
            </h3>

            <p className="text-2xl font-bold mt-2">
              {holidayContribution}%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Store className="text-purple-600 text-4xl mb-3" />

            <h3 className="text-gray-500">
              Best Store
            </h3>

            <p className="text-2xl font-bold mt-2">
              Store {bestStore?.store}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;