import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import Analytics from "./pages/Analytics";
import Insights from "./pages/Insights";

function App() {

  return (

    <Layout>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/forecast" element={<Forecast />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/insights" element={<Insights />} />

      </Routes>

    </Layout>

  );

}

export default App;