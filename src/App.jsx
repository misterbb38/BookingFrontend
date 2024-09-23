import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Chemin vers le Layout
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import LoginPage from "./pages/LoginPage";
import TerrainsPage from "./pages/TerrainsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout appliqué à toutes les routes enfants */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reservations" element={<ReservationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="terrains" element={<TerrainsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
