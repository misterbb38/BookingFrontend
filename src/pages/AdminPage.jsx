import { useEffect, useState } from "react";
import RegisterPage from "../components/RegisterPage";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!user) {
      navigate("/login");
    } else {
      setUserRole(user.role);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      {/* Vérification si l'utilisateur est un superadmin */}
      {userRole === "superadmin" ? (
        <>
          {/* Formulaire d'inscription */}
          <div className="w-full max-w-lg">
            <RegisterPage />
          </div>

          {/* Tableau centré */}
          <div className="w-full max-w-4xl">
            <UserTable />
          </div>
        </>
      ) : (
        <div role="alert" className="alert alert-error max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Accès refusé ! Vous devez être superadmin pour accéder à cette page.
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
