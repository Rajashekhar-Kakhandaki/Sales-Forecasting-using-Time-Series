import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
];

function HolidayChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      <h2 className="text-xl font-bold mb-5">
        Holiday Sales
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        

<PieChart>
  <Pie
    data={data}
    dataKey="sales"
    nameKey="name"
    outerRadius={120}
    label={({ percent }) =>
      `${(percent * 100).toFixed(1)}%`
    }
  >
    {data.map((entry, index) => (
      <Cell
        key={index}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie>

  <Tooltip
    formatter={(value) => formatCurrency(value)}
  />

  <Legend />
</PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default HolidayChart;