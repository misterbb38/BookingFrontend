import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import LoginPage from "./pages/LoginPage";
import TerrainsPage from "./pages/TerrainsPage";
import DashboardHome from "./pages/DashboardHome";
import ReservationDetails from "./pages/ReservationDetails";
import Finance from "./pages/Finance";

import PrivateRoute from "./components/PrivateRoute";

import "./chartjs-setup"; // Importez le fichier de configuration ici

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout public pour les pages générales */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reservations" element={<ReservationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="terrains" element={<TerrainsPage />} />
        </Route>
        {/* Layout du tableau de bord */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route
              path="reservation-details"
              element={<ReservationDetails />}
            />
            <Route path="finance" element={<Finance />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
