import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
function StoreChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      <h2 className="text-xl font-bold mb-5">
        Store-wise Sales
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data} isAnimationActive={false}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="store" />

          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
          />

          <Tooltip
  formatter={(value) => [formatCurrency(value), "Sales"]}
/>

          <Bar
            dataKey="sales"
            fill="#16a34a"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StoreChart;