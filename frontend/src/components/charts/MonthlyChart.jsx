import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
function MonthlyChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      <h2 className="text-xl font-bold mb-5">
        Monthly Sales
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data} isAnimationActive={false}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
          />

          <Tooltip
            formatter={(value) => formatCurrency(value)}
          />

          <Bar
            dataKey="sales"
            fill="#2563eb"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyChart;