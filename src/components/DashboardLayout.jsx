import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Home, ClipboardList, DollarSign, LogOut, Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem("user");
    // Rediriger vers la page de connexion
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Menu latéral à gauche */}
      <div
        className={`${
          isMenuOpen ? "w-64" : "w-0"
        } bg-base-200 text-base-content flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <nav className="p-4 flex flex-col h-full">
          {/* Bouton pour fermer le menu */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end mb-4"
          >
            <X size={24} />
          </button>
          <ul className="menu menu-vertical flex-1">
            <li>
              <Link to="/dashboard">
                <Home size={20} className="inline-block mr-2" />
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/dashboard/reservation-details">
                <ClipboardList size={20} className="inline-block mr-2" />
                Réservations
              </Link>
            </li>
            <li>
              <Link to="/dashboard/finance">
                <DollarSign size={20} className="inline-block mr-2" />
                Finance
              </Link>
            </li>
            {/* Espace flexible pour pousser le bouton de déconnexion en bas */}
            <div className="flex-grow"></div>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-base-300 flex items-center"
              >
                <LogOut size={20} className="inline-block mr-2" />
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Bouton pour ouvrir le menu */}
        <header className="p-4 flex items-center bg-base-100">
          <button onClick={() => setIsMenuOpen(true)} className="mr-4">
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
