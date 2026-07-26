import { useEffect, useState } from "react";
import axios from "axios";

import ForecastChart from "../components/charts/ForecastChart";
import ForecastSummary from "../components/forecast/ForecastSummary";

import {
  Button,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

const formatCurrency = (value) => {
  if (value >= 10000000)
    return `₹${(value / 10000000).toFixed(2)} Cr`;

  if (value >= 100000)
    return `₹${(value / 100000).toFixed(2)} L`;

  return `₹${value.toLocaleString("en-IN")}`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function Forecast() {
  const [weeks, setWeeks] = useState(4);

  const [forecast, setForecast] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchForecast = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/forecast/${weeks}`
      );

      setForecast(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const exportCSV = () => {
    const rows = [
      ["Date", "Prediction", "Lower", "Upper"],
      ...forecast.map((item) => [
        item.ds,
        item.yhat,
        item.yhat_lower,
        item.yhat_upper,
      ]),
    ];

    const csv = rows
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv]);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "forecast.csv";

    a.click();
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap gap-4 items-center">

        <Select
          value={weeks}
          onChange={(e) =>
            setWeeks(e.target.value)
          }
        >
          <MenuItem value={4}>
            4 Weeks
          </MenuItem>

          <MenuItem value={12}>
            12 Weeks
          </MenuItem>

          <MenuItem value={24}>
            24 Weeks
          </MenuItem>

        </Select>

        <Button
          variant="contained"
          onClick={fetchForecast}
        >
          Predict
        </Button>

        <Button
          variant="outlined"
          color="success"
          onClick={exportCSV}
        >
          Export CSV
        </Button>

      </div>

      <ForecastSummary data={forecast} />

      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : (
        <>
          <ForecastChart data={forecast} />

          <div className="bg-white rounded-xl shadow-lg p-5">

            <h2 className="text-2xl font-bold mb-5">
              Forecast Results
            </h2>

            <div className="overflow-auto">

              <table className="min-w-full">

                <thead className="bg-blue-600 text-white">

                  <tr>

                    <th className="p-4">
                      Date
                    </th>

                    <th className="p-4">
                      Prediction
                    </th>

                    <th className="p-4">
                      Lower
                    </th>

                    <th className="p-4">
                      Upper
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {forecast.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0
                            ? "bg-gray-50"
                            : "bg-white"
                        } hover:bg-blue-50 transition`}
                      >

                        <td className="p-4 text-center">
                          {formatDate(
                            item.ds
                          )}
                        </td>

                        <td className="p-4 text-center font-semibold text-blue-700">
                          {formatCurrency(
                            item.yhat
                          )}
                        </td>

                        <td className="p-4 text-center text-red-600">
                          {formatCurrency(
                            item.yhat_lower
                          )}
                        </td>

                        <td className="p-4 text-center text-green-600">
                          {formatCurrency(
                            item.yhat_upper
                          )}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>
        </>
      )}
    </div>
  );
}