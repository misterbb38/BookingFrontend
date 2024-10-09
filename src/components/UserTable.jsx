import { useEffect, useState } from "react";
import { Eye, Trash } from "lucide-react"; // Importation des icônes de Lucide React

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Utilisateur sélectionné pour le modal
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/users`);
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error("Erreur lors de la récupération des utilisateurs");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/users/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          fetchUsers(); // Actualiser la liste des utilisateurs
        } else {
          console.error("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  // Charger les utilisateurs au chargement de la page
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des administrateurs</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* En-tête du tableau */}
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.telephone}</td>
                  <td>{user.role}</td>
                  <td className="flex space-x-2">
                    {/* Bouton pour voir les informations */}
                    <button
                      className="btn btn-info btn-sm flex items-center space-x-2"
                      onClick={() => {
                        setSelectedUser(user);
                        document.getElementById("user_info_modal").showModal();
                      }}
                    >
                      <Eye size={16} />
                      <span></span>
                    </button>

                    {/* Bouton pour supprimer */}
                    <button
                      className="btn btn-error btn-sm flex items-center space-x-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      <Trash size={16} />
                      <span></span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal pour voir les informations de l'utilisateur */}
      <dialog id="user_info_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Informations de l'utilisateur</h3>
          {selectedUser && (
            <div className="py-4">
              <p>
                <strong>Nom :</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Téléphone :</strong> {selectedUser.telephone}
              </p>
              <p>
                <strong>Rôle :</strong> {selectedUser.role}
              </p>
            </div>
          )}
          <div className="modal-action">
            {/* Bouton pour fermer le modal */}
            <button
              className="btn"
              onClick={() => document.getElementById("user_info_modal").close()}
            >
              Fermer
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserTable;
