import {
  AttachMoney,
  Celebration,
  Store,
  TrendingUp,
} from "@mui/icons-material";

const formatCurrency = (value) => {
  if (value >= 10000000)
    return `₹${(value / 10000000).toFixed(2)} Cr`;

  if (value >= 100000)
    return `₹${(value / 100000).toFixed(2)} L`;

  return `₹${value}`;
};

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
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

export default function AnalyticsSummary({
  monthly,
  holiday,
  stores,
}) {
  if (!monthly) return null;

  const totalRevenue = monthly.reduce(
    (a, b) => a + b.sales,
    0
  );

  const holidaySales = holiday.find(
    (x) => x.name === "Holiday"
  )?.sales;

  const nonHoliday = holiday.find(
    (x) => x.name === "Non-Holiday"
  )?.sales;

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

      <Card
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        color="bg-blue-600"
        icon={<AttachMoney />}
      />

      <Card
        title="Holiday Sales"
        value={formatCurrency(holidaySales)}
        color="bg-green-600"
        icon={<Celebration />}
      />

      <Card
        title="Non-Holiday"
        value={formatCurrency(nonHoliday)}
        color="bg-orange-600"
        icon={<TrendingUp />}
      />

      <Card
        title="Stores"
        value={stores.length}
        color="bg-purple-600"
        icon={<Store />}
      />

    </div>
  );
}