import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react"; // Importation des icônes de Lucide React

const TerrainTable = () => {
  const [terrains, setTerrains] = useState([]);
  const [selectedTerrain, setSelectedTerrain] = useState(null); // Terrain sélectionné pour modification
  const [updatedTerrain, setUpdatedTerrain] = useState({
    name: "",
    location: "",
    description: "",
    pricePerHour: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Gérer l'état du modal

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  // Récupérer tous les terrains
  const fetchTerrains = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/terrains`);
      const data = await response.json();
      if (response.ok) {
        setTerrains(data.data); // Assurez-vous que le format de la réponse correspond
      } else {
        setError("Erreur lors de la récupération des terrains");
      }
    } catch (error) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un terrain
  const deleteTerrain = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce terrain?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/terrains/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          fetchTerrains(); // Actualiser la liste des terrains
        } else {
          setError("Erreur lors de la suppression du terrain");
        }
      } catch (error) {
        setError("Erreur de connexion au serveur");
      }
    }
  };

  // Ouvrir le modal et préremplir le formulaire avec les données du terrain sélectionné
  const handleEdit = (terrain) => {
    setSelectedTerrain(terrain);
    setUpdatedTerrain({
      name: terrain.name,
      location: terrain.location,
      description: terrain.description,
      pricePerHour: terrain.pricePerHour,
    });
    setIsModalOpen(true);
  };

  // Mettre à jour un terrain
  const updateTerrain = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/terrains/${selectedTerrain._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTerrain),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Terrain mis à jour avec succès");
        setIsModalOpen(false);
        fetchTerrains(); // Actualiser la liste des terrains
      } else {
        setError("Erreur lors de la mise à jour du terrain");
      }
    } catch (error) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  // Charger les terrains au chargement de la page
  useEffect(() => {
    fetchTerrains();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des terrains</h1>

      {loading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {!loading && terrains.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* En-tête du tableau */}
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Localisation</th>
                <th>Description</th>
                <th>Prix par heure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {terrains.map((terrain, index) => (
                <tr key={terrain._id}>
                  <td>{index + 1}</td>
                  <td>{terrain.name}</td>
                  <td>{terrain.location}</td>
                  <td>{terrain.description}</td>
                  <td>{terrain.pricePerHour} XOF</td>
                  <td className="flex space-x-2">
                    {/* Bouton pour modifier */}
                    <button
                      className="btn btn-warning btn-sm flex items-center space-x-2"
                      onClick={() => handleEdit(terrain)}
                    >
                      <Pencil size={16} />
                      <span>Modifier</span>
                    </button>

                    {/* Bouton pour supprimer */}
                    <button
                      className="btn btn-error btn-sm flex items-center space-x-2"
                      onClick={() => deleteTerrain(terrain._id)}
                    >
                      <Trash size={16} />
                      <span>Supprimer</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && terrains.length === 0 && (
        <div className="text-center">
          <p>Aucun terrain trouvé</p>
        </div>
      )}

      {/* Modal pour modifier le terrain */}
      {isModalOpen && (
        <dialog open className="modal">
          <form className="modal-box" onSubmit={updateTerrain}>
            <h3 className="font-bold text-lg">Modifier le terrain</h3>
            <div className="py-4">
              <div className="form-control mb-4">
                <label className="label">Nom du terrain</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={updatedTerrain.name}
                  onChange={(e) =>
                    setUpdatedTerrain({
                      ...updatedTerrain,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">Localisation</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={updatedTerrain.location}
                  onChange={(e) =>
                    setUpdatedTerrain({
                      ...updatedTerrain,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">Description</label>
                <textarea
                  className="textarea textarea-bordered"
                  value={updatedTerrain.description}
                  onChange={(e) =>
                    setUpdatedTerrain({
                      ...updatedTerrain,
                      description: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>
              <div className="form-control mb-4">
                <label className="label">Prix par heure (XOF)</label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={updatedTerrain.pricePerHour}
                  onChange={(e) =>
                    setUpdatedTerrain({
                      ...updatedTerrain,
                      pricePerHour: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Enregistrer"
                )}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default TerrainTable;
