import { useEffect, useState } from "react";
import API from "../services/api";

import KPICard from "../components/cards/KPICard";
import MonthlyChart from "../components/charts/MonthlyChart";
import HolidayChart from "../components/charts/HolidayChart";
import StoreChart from "../components/charts/StoreChart";
import PaymentsIcon from "@mui/icons-material/Payments";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
        total_sales: 0,
        average_sales: 0,
        highest_sales: 0,
        lowest_sales: 0,
        best_model: "",
    });

    const [analytics, setAnalytics] = useState({
        monthly_sales: [],
        holiday_sales: [],
        store_sales: [],
    });

    useEffect(() => {
        loadDashboard();
        loadAnalytics();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await API.get("/dashboard");
            setDashboard(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadAnalytics = async () => {
        try {
            const res = await API.get("/analytics");
            setAnalytics(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>

            <h1 className="text-3xl font-bold mb-8">
                Sales Forecast Dashboard
            </h1>

            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6">

                <KPICard
                    title="Total Sales"
                    value={dashboard.total_sales}
                    color="#2563EB"
                    icon={<PaymentsIcon />}
                    trend="+8.2%"
                />

                <KPICard
                    title="Average Sales"
                    value={dashboard.average_sales}
                    color="#16A34A"
                    icon={<TrendingUpIcon />}
                    trend="+2.7%"
                />

                <KPICard
                    title="Highest Sales"
                    value={dashboard.highest_sales}
                    color="#F59E0B"
                    icon={<ArrowUpwardIcon />}
                    trend="+5.4%"
                />

                <KPICard
                    title="Lowest Sales"
                    value={dashboard.lowest_sales}
                    color="#DC2626"
                    icon={<ArrowDownwardIcon />}
                    trend="-1.8%"
                />

                <KPICard
                    title="Best Model"
                    value={dashboard.best_model}
                    color="#9333EA"
                    icon={<AutoGraphIcon />}
                    trend="98%"
                />

            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-10">

                <MonthlyChart data={analytics.monthly_sales} />

                <HolidayChart data={analytics.holiday_sales} />

            </div>

            <div className="mt-10">

                <StoreChart data={analytics.store_sales} />

            </div>

        </div>
    );
}

export default Dashboard;