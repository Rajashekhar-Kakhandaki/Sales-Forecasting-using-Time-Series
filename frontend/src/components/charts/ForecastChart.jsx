import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const formatCurrency = (value) => {
  if (value >= 10000000)
    return `₹${(value / 10000000).toFixed(2)} Cr`;

  if (value >= 100000)
    return `₹${(value / 100000).toFixed(2)} L`;

  return `₹${Number(value).toLocaleString("en-IN")}`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

function ForecastChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Sales Forecast
          </h2>

          <p className="text-gray-500 mt-1">
            Prophet Forecast with Confidence Interval
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="ds"
            tickFormatter={formatDate}
            tick={{
              fill: "#475569",
              fontSize: 12,
            }}
          />

          <YAxis
            tickFormatter={formatCurrency}
            tick={{
              fill: "#475569",
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.15)",
            }}
            formatter={(value) => formatCurrency(value)}
            labelFormatter={(value) =>
              formatDate(value)
            }
          />

          <Legend />

          {/* Main Prediction */}

          <Line
            type="monotone"
            dataKey="yhat"
            name="Prediction"
            stroke="#2563EB"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

          {/* Upper Confidence */}

          <Line
            type="monotone"
            dataKey="yhat_upper"
            name="Upper Bound"
            stroke="#10B981"
            strokeDasharray="8 4"
            strokeWidth={2}
            dot={false}
          />

          {/* Lower Confidence */}

          <Line
            type="monotone"
            dataKey="yhat_lower"
            name="Lower Bound"
            stroke="#EF4444"
            strokeDasharray="8 4"
            strokeWidth={2}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;