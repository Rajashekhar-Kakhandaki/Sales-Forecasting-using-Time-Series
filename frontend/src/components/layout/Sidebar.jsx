import { NavLink } from "react-router-dom";

import {
  Dashboard,
  Timeline,
  BarChart,
  Lightbulb,
  Settings,
  Logout,
  ChevronLeft,
  Menu,
  TrendingUp,
} from "@mui/icons-material";

function Sidebar({ open }) {
  const menu = [
    {
      title: "Dashboard",
      path: "/",
      icon: <Dashboard />,
    },
    {
      title: "Forecast",
      path: "/forecast",
      icon: <Timeline />,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: <BarChart />,
    },
    {
      title: "Insights",
      path: "/insights",
      icon: <Lightbulb />,
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white shadow-2xl transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">

        <TrendingUp sx={{ fontSize: 40, color: "#3b82f6" }} />

        {open && (
          <div className="ml-3">

            <h2 className="text-xl font-bold">

              Sales Forecast

            </h2>

            <p className="text-xs text-gray-400">

              Dashboard

            </p>

          </div>
        )}

      </div>

      {/* Menu */}

      <div className="mt-6 px-3">

        {menu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl mb-3 transition-all duration-300
              ${
                isActive
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800"
              }`
            }
          >

            {item.icon}

            {open && (
              <span className="font-medium">

                {item.title}

              </span>
            )}

          </NavLink>

        ))}

      </div>

      {/* Bottom */}

      <div className="absolute bottom-5 w-full px-3">

        <div
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 cursor-pointer"
        >
          <Settings />

          {open && <span>Settings</span>}
        </div>

        <div
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-600 cursor-pointer mt-2"
        >
          <Logout />

          {open && <span>Logout</span>}
        </div>

      </div>

    </div>
  );
}

export default Sidebar;