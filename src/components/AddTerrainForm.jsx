import { useState } from "react";

const AddTerrainForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/terrains`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajouter token si nécessaire
        },
        body: JSON.stringify({
          name,
          location,
          description,
          pricePerHour,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Terrain ajouté avec succès !");
        setName("");
        setLocation("");
        setDescription("");
        setPricePerHour("");
      } else {
        setErrorMessage(data.message || "Erreur lors de l'ajout du terrain.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Ajouter un terrain</h2>
      {successMessage && (
        <div className="alert alert-success shadow-lg mb-4">
          <div>
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Nom du terrain
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Nom du terrain"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">
            Localisation
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Localisation"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="pricePerHour" className="block text-gray-700">
            Prix par heure (XOF)
          </label>
          <input
            type="number"
            id="pricePerHour"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Prix par heure"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            "Ajouter le terrain"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTerrainForm;
