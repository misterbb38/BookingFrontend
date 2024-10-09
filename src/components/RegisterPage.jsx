import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RegisterAdminPage = () => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setBackendError("");

    if (password !== confirmPassword) {
      setBackendError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, telephone, password, role: "admin" }), // Assigner le rôle d'administrateur
      });

      const data = await response.json();

      if (response.ok) {
        // Rediriger vers la page du tableau de bord après inscription réussie
        navigate("/dashboard");
      } else {
        setBackendError(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setBackendError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">INSCRIRE UN ADMINISTRATEUR</h2>
      <form onSubmit={handleRegister} className="w-full max-w-sm">
        {/* Champ Nom */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Entrez le nom"
            required
          />
        </div>
        {/* Champ Téléphone */}
        <div className="mb-4">
          <label htmlFor="telephone" className="block text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="text"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Entrez le numéro de téléphone"
            required
          />
        </div>
        {/* Champ Mot de passe */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              placeholder="Entrez le mot de passe"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        {/* Champ Confirmer Mot de passe */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            Confirmer Mot de passe
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Confirmez le mot de passe"
            required
          />
        </div>
        {/* Affichage des erreurs */}
        {backendError && <p className="text-red-500 mb-4">{backendError}</p>}
        {/* Bouton d'inscription */}
        <button type="submit" className="btn btn-primary w-full">
          Inscrire l'administrateur
        </button>
      </form>
    </div>
  );
};

export default RegisterAdminPage;
