import { Outlet, Link } from "react-router-dom";
import { Home, Calendar, LogIn, MapPin } from "lucide-react";
import Hero from "./Hero"; // Importer le composant Hero

const Layout = () => {
  return (
    <div>
      {/* Top bar */}
      <div className="bg-primary text-white flex justify-between items-center p-4">
        <div className="text-lg font-bold">Logo</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Accueil
          </Link>
          <Link to="/reservations" className="hover:text-gray-200">
            Réservations
          </Link>

          <Link to="/terrains" className="hover:text-gray-200">
            Terrains
          </Link>
          <Link to="/login" className="hover:text-gray-200">
            Connexion
          </Link>
        </div>
      </div>
      {/* Hero section */}
      <Hero /> {/* Le Hero est maintenant juste après la top bar */}
      {/* Contenu dynamique */}
      <div className="min-h-screen">
        <Outlet />
      </div>
      {/* Menu mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-gray-700">
          <Home className="w-6 h-6" />
          <span className="text-xs">Accueil</span>
        </Link>
        <Link
          to="/reservations"
          className="flex flex-col items-center text-gray-700"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Réservation</span>
        </Link>
        <Link to="/login" className="flex flex-col items-center text-gray-700">
          <LogIn className="w-6 h-6" />
          <span className="text-xs">Connexion</span>
        </Link>
        <Link
          to="/terrains"
          className="flex flex-col items-center text-gray-700"
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs">Terrains</span>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
