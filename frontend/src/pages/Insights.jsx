import { useEffect, useState } from "react";
import axios from "axios";

import {
  Store,
  TrendingUp,
  Warning,
  Lightbulb,
  Insights,
  Inventory,
  AutoGraph,
  CheckCircle,
} from "@mui/icons-material";

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default function InsightsPage() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/insights")
      .then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold">
        Business Insights
      </h1>

      {/* Top Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Best Store"
          value={data.best_store}
          color="bg-green-500"
          icon={<Store />}
        />

        <Card
          title="Worst Store"
          value={data.worst_store}
          color="bg-red-500"
          icon={<Warning />}
        />

        <Card
          title="Best Model"
          value="Prophet"
          color="bg-blue-500"
          icon={<TrendingUp />}
        />

        <Card
          title="Forecast Accuracy"
          value="High"
          color="bg-purple-500"
          icon={<AutoGraph />}
        />

      </div>

      {/* Recommendation */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex items-center gap-3 mb-5">

          <Lightbulb
            className="text-yellow-500"
          />

          <h2 className="text-2xl font-bold">
            AI Recommendation
          </h2>

        </div>

        <div className="space-y-5">

          <div className="flex gap-4">

            <Inventory className="text-blue-600 mt-1" />

            <div>

              <h3 className="font-semibold">
                Inventory Planning
              </h3>

              <p className="text-gray-600">
                {data.recommendation}
              </p>

            </div>

          </div>

          <div className="flex gap-4">

            <Insights className="text-green-600 mt-1" />

            <div>

              <h3 className="font-semibold">
                Demand Trend
              </h3>

              <p className="text-gray-600">
                Forecast indicates stable sales with
                slight seasonal variation.
              </p>

            </div>

          </div>

          <div className="flex gap-4">

            <TrendingUp className="text-orange-600 mt-1" />

            <div>

              <h3 className="font-semibold">
                Holiday Impact
              </h3>

              <p className="text-gray-600">
                Sales increase during holiday weeks.
                Increase inventory beforehand.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Observations */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Key Observations
        </h2>

        <div className="space-y-4">

          <div className="flex gap-3">

            <CheckCircle className="text-green-500" />

            <p>
              Store {data.best_store} consistently
              achieved the highest weekly sales.
            </p>

          </div>

          <div className="flex gap-3">

            <CheckCircle className="text-green-500" />

            <p>
              Prophet produced the most accurate
              forecasting model.
            </p>

          </div>

          <div className="flex gap-3">

            <CheckCircle className="text-green-500" />

            <p>
              Holiday periods show significantly
              higher customer demand.
            </p>

          </div>

          <div className="flex gap-3">

            <CheckCircle className="text-green-500" />

            <p>
              Inventory should be increased before
              holiday weeks to prevent shortages.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}