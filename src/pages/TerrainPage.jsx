import { useEffect, useState } from "react";
import AddTerrainForm from "../components/AddTerrainForm";
import TerrainTable from "../components/TerrainTable";
import { useNavigate } from "react-router-dom";

const TerrainPage = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les informations utilisateur à partir du localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role === "superadmin") {
      setIsSuperAdmin(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  return (
    <div>
      {isSuperAdmin ? (
        <>
          <AddTerrainForm />
          <TerrainTable />
        </>
      ) : (
        <div role="alert" className="alert alert-error">
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
          <span>Accès refusé. Vous n'êtes pas autorisé à voir cette page.</span>
        </div>
      )}
    </div>
  );
};

export default TerrainPage;
