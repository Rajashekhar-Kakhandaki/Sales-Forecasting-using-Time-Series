import {
  CalendarMonth,
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

const formatCurrency = (value) => {
  if (!value) return "₹0";

  if (value >= 10000000)
    return `₹${(value / 10000000).toFixed(2)} Cr`;

  if (value >= 100000)
    return `₹${(value / 100000).toFixed(2)} L`;

  return `₹${Number(value).toLocaleString("en-IN")}`;
};

export default function ForecastSummary({ data }) {
  if (!data || data.length === 0) return null;

  const predictions = data.map((d) => d.yhat);

  const avg =
    predictions.reduce((a, b) => a + b, 0) /
    predictions.length;

  const highest = Math.max(...predictions);
  const lowest = Math.min(...predictions);

  const cards = [
    {
      title: "Forecast Weeks",
      value: `${data.length} Weeks`,
      color: "bg-blue-500",
      icon: <CalendarMonth />,
    },
    {
      title: "Average",
      value: formatCurrency(avg),
      color: "bg-green-500",
      icon: <TrendingUp />,
    },
    {
      title: "Highest",
      value: formatCurrency(highest),
      color: "bg-orange-500",
      icon: <ArrowUpward />,
    },
    {
      title: "Lowest",
      value: formatCurrency(lowest),
      color: "bg-red-500",
      icon: <ArrowDownward />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} text-white p-3 rounded-xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}