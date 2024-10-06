// // import { useState } from "react";
// // import { Outlet, Link, useNavigate } from "react-router-dom";
// // import { Home, ClipboardList, DollarSign, LogOut, Menu, X } from "lucide-react";

// // const DashboardLayout = () => {
// //   const navigate = useNavigate();
// //   const [isMenuOpen, setIsMenuOpen] = useState(true);

// //   const handleLogout = () => {
// //     // Supprimer les données de l'utilisateur du localStorage
// //     localStorage.removeItem("user");
// //     // Rediriger vers la page de connexion
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="flex min-h-screen">
// //       {/* Menu latéral à gauche */}
// //       <div
// //         className={`${
// //           isMenuOpen ? "w-64" : "w-0"
// //         } bg-base-200 text-base-content flex flex-col transition-all duration-300 overflow-hidden`}
// //       >
// //         <nav className="p-4 flex flex-col h-full">
// //           {/* Bouton pour fermer le menu */}
// //           <button
// //             onClick={() => setIsMenuOpen(false)}
// //             className="self-end mb-4"
// //           >
// //             <X size={24} />
// //           </button>
// //           <ul className="menu menu-vertical flex-1">
// //             <li>
// //               <Link to="/dashboard">
// //                 <Home size={20} className="inline-block mr-2" />
// //                 Accueil
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/dashboard/reservation-details">
// //                 <ClipboardList size={20} className="inline-block mr-2" />
// //                 Réservations
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/dashboard/finance">
// //                 <DollarSign size={20} className="inline-block mr-2" />
// //                 Finance
// //               </Link>
// //             </li>
// //             {/* Espace flexible pour pousser le bouton de déconnexion en bas */}
// //             <div className="flex-grow"></div>
// //             <li>
// //               <button
// //                 onClick={handleLogout}
// //                 className="w-full text-left px-4 py-2 hover:bg-base-300 flex items-center"
// //               >
// //                 <LogOut size={20} className="inline-block mr-2" />
// //                 Déconnexion
// //               </button>
// //             </li>
// //           </ul>
// //         </nav>
// //       </div>
// //       {/* Contenu principal */}
// //       <div className="flex-1 flex flex-col">
// //         {/* Bouton pour ouvrir le menu */}
// //         <header className="p-4 flex items-center bg-base-100">
// //           <button onClick={() => setIsMenuOpen(true)} className="mr-4">
// //             <Menu size={24} />
// //           </button>
// //           <h1 className="text-2xl font-bold">Dashboard</h1>
// //         </header>
// //         <main className="p-4">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;

// import { useState } from "react";
// import { Outlet, Link, useNavigate } from "react-router-dom";
// import { Home, ClipboardList, DollarSign, LogOut, Menu, X } from "lucide-react";

// const DashboardLayout = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(true);

//   const handleLogout = () => {
//     // Supprimer les données de l'utilisateur du localStorage
//     localStorage.removeItem("user");
//     // Rediriger vers la page de connexion
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Menu latéral à gauche */}
//       <div
//         className={`${
//           isMenuOpen ? "w-64" : "w-0"
//         } bg-base-200 text-base-content flex flex-col transition-all duration-300 overflow-hidden fixed top-0 left-0 h-full z-50`}
//       >
//         <nav className="p-4 flex flex-col h-full">
//           {/* Bouton pour fermer le menu */}
//           <button
//             onClick={() => setIsMenuOpen(false)}
//             className="self-end mb-4"
//           >
//             <X size={24} />
//           </button>
//           <ul className="menu menu-vertical flex-1">
//             <li>
//               <Link to="/dashboard">
//                 <Home size={20} className="inline-block mr-2" />
//                 Accueil
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/reservation-details">
//                 <ClipboardList size={20} className="inline-block mr-2" />
//                 Réservations
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard/finance">
//                 <DollarSign size={20} className="inline-block mr-2" />
//                 Finance
//               </Link>
//             </li>
//             {/* Espace flexible pour pousser le bouton de déconnexion en bas */}
//             <div className="flex-grow"></div>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-base-300 flex items-center"
//               >
//                 <LogOut size={20} className="inline-block mr-2" />
//                 Déconnexion
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Contenu principal */}
//       <div className="flex-1 flex flex-col">
//         {/* Bouton pour ouvrir le menu */}
//         <header className="p-4 flex items-center bg-base-100 fixed top-0 left-0 right-0 z-40">
//           <button onClick={() => setIsMenuOpen(true)} className="mr-4">
//             <Menu size={24} />
//           </button>
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//         </header>
//         <main className="p-4 pt-16">
//           {" "}
//           {/* Ajout de padding-top pour compenser le header fixe */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// src/components/DashboardLayout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Home, ClipboardList, DollarSign, LogOut } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem("user");
    // Rediriger vers la page de connexion
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation en haut */}
      <header className="bg-base-200 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo ou Titre */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            {/* Liens de navigation */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-base-300"
              >
                <Home size={20} className="mr-1" />
                Accueil
              </Link>
              <Link
                to="/dashboard/reservation-details"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-base-300"
              >
                <ClipboardList size={20} className="mr-1" />
                Réservations
              </Link>
              <Link
                to="/dashboard/finance"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-base-300"
              >
                <DollarSign size={20} className="mr-1" />
                Finance
              </Link>
            </div>
            {/* Bouton de déconnexion */}
            <div>
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-base-300"
              >
                <LogOut size={20} className="mr-1" />
                Déconnexion
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 bg-base-100">
        <Outlet />
      </main>

      {/* Footer optionnel */}
      <footer className="bg-base-200 text-center p-4">
        <p className="text-sm">
          © 2024 Votre Entreprise. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
