import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backgroundImage from "../assets/foot1.jpg"; // Importer l'image

const LoginPage = () => {
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setBackendError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telephone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Enregistrer les informations de l'utilisateur dans le localStorage
        const userData = {
          id: data.id,
          name: data.name,
          telephone: data.telephone,
          userrole: data.userrole,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        // Rediriger vers la page d'accueil ou tableau de bord
        navigate("/dashboard");
      } else {
        setBackendError(data.message || "Erreur lors de la connexion.");
      }
    } catch (error) {
      setBackendError("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Partie gauche - Image */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center">
        <img
          src={backgroundImage} // Remplacez par le chemin réel de votre image
          alt="Illustration"
          className="object-cover h-full w-full"
        />
      </div>
      {/* Partie droite - Formulaire */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-6">Connexion</h2>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
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
              placeholder="Entrez votre numéro de téléphone"
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
                placeholder="Entrez votre mot de passe"
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
          {/* Affichage des erreurs */}
          {backendError && <p className="text-red-500 mb-4">{backendError}</p>}
          {/* Bouton de connexion */}
          <button type="submit" className="btn btn-primary w-full">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
