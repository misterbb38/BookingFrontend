import { useState, useEffect } from "react";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [fields, setFields] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    // Par défaut, définir la date du jour si aucun filtre n'est appliqué
    const today = new Date().toISOString().split("T")[0];
    setDateFilter(today);
  }, []);

  useEffect(() => {
    fetchFields();
  }, []);

  useEffect(() => {
    if (dateFilter !== "") {
      fetchReservations();
    }
  }, [dateFilter, statusFilter, fieldFilter]);

  const fetchFields = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/terrains`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setFields(data.data);
      } else {
        console.error(
          "Erreur lors de la récupération des terrains:",
          data.message
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des terrains:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      let url = `${API_BASE_URL}/api/reservations/reservations?`;

      if (dateFilter) {
        url += `date=${dateFilter}&`;
      }

      if (statusFilter) {
        url += `status=${statusFilter}&`;
      }

      if (fieldFilter) {
        url += `fieldId=${fieldFilter}&`;
      }

      // Supprimer le dernier caractère '&' ou '?' si nécessaire
      url =
        url.slice(-1) === "&" || url.slice(-1) === "?" ? url.slice(0, -1) : url;

      console.log("Fetching reservations with URL:", url);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          // Ajouter l'en-tête Authorization si nécessaire
          // 'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setReservations(data.data);
      } else {
        console.error(
          "Erreur lors de la récupération des réservations:",
          data.message
        );
        setReservations([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      setReservations([]);
    }
  };

  // Fonction pour obtenir la classe de badge en fonction du statut
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "badge badge-success";
      case "cancelled":
        return "badge badge-error";
      case "pending":
        return "badge badge-warning";
      default:
        return "badge";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des réservations</h1>

      {/* Filtres */}
      <div className="flex flex-wrap space-x-4 mb-4">
        <div>
          <label htmlFor="dateFilter" className="block mb-1">
            Date :
          </label>
          <input
            type="date"
            id="dateFilter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="statusFilter" className="block mb-1">
            Statut :
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Tous</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
            <option value="pending">En attente</option>
          </select>
        </div>
        <div>
          <label htmlFor="fieldFilter" className="block mb-1">
            Terrain :
          </label>
          <select
            id="fieldFilter"
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Tous</option>
            {fields.map((field) => (
              <option key={field._id} value={field._id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des réservations ou message d'absence de réservations */}
      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">
                  Réservation #{reservation.reservationCode}
                </h2>
                <p>
                  <strong>Terrain :</strong>{" "}
                  {reservation.fieldId?.name || "N/A"}
                </p>
                <p>
                  <strong>Téléphone :</strong> {reservation.telephone}
                </p>
                <p>
                  <strong>Date :</strong>{" "}
                  {new Date(reservation.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Heure :</strong> {reservation.startTime} -{" "}
                  {reservation.endTime}
                </p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span className={getStatusBadgeClass(reservation.status)}>
                    {reservation.status === "confirmed"
                      ? "Confirmé"
                      : reservation.status === "cancelled"
                      ? "Annulé"
                      : reservation.status === "pending"
                      ? "En attente"
                      : reservation.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune réservation pour les filtres sélectionnés.</p>
      )}
    </div>
  );
};

export default ReservationList;
