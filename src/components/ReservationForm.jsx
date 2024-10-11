import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const ReservationForm = () => {
  const [terrains, setTerrains] = useState([]);
  const [selectedTerrain, setSelectedTerrain] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [telephone, setTelephone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Nouvel état pour le chargement
  // const [reservationCodeForRedirect, setReservationCodeForRedirect] =
  //   useState(null); // Stocker le code de réservation
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const navigate = useNavigate(); // Initialiser useNavigate

  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/terrains`);
        const data = await response.json();
        if (data.success) {
          setTerrains(data.data);
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

    fetchTerrains();
  }, [API_BASE_URL]);

  const fetchAvailableTimes = async (terrainId, date) => {
    if (terrainId && date) {
      setLoading(true);
      try {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        const response = await fetch(
          `${API_BASE_URL}/api/reservations/${terrainId}/availability?date=${formattedDate}`
        );
        const data = await response.json();
        if (data.success) {
          setAvailableTimes(data.availableTimeSlots);
        } else {
          console.error(
            "Erreur lors de la récupération des heures:",
            data.message
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des heures:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTerrainChange = (terrainId) => {
    setSelectedTerrain(terrainId);
    if (selectedDate && terrainId) {
      fetchAvailableTimes(terrainId, selectedDate);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedTerrain && date) {
      fetchAvailableTimes(selectedTerrain, date);
    }
  };

  const handleTimeSelection = (startTime, endTime) => {
    const timeSlot = { startTime, endTime };
    if (
      selectedTimes.some(
        (time) => time.startTime === startTime && time.endTime === endTime
      )
    ) {
      setSelectedTimes(
        selectedTimes.filter(
          (time) => time.startTime !== startTime && time.endTime !== endTime
        )
      );
    } else {
      setSelectedTimes([...selectedTimes, timeSlot]);
    }
  };

  const handleSubmit = async () => {
    if (!paymentMethod || !telephone) {
      alert("Veuillez remplir toutes les informations.");
      return;
    }

    setIsSubmitting(true); // Commencer le chargement
    // Concaténer les créneaux horaires sélectionnés en une chaîne de caractères
    const timeSlotsString = selectedTimes
      .map((slot) => `${slot.startTime}-${slot.endTime}`)
      .join(",");
    const reservationData = {
      fieldId: selectedTerrain,
      date: selectedDate,
      timeSlots: timeSlotsString,
      telephone,
      paymentMethod,
      time: selectedTimes.length,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (data.success) {
        if (paymentMethod === "pay_online") {
          // Rediriger vers PayTech
          window.location.href = data.payments[0].redirect_url;
        } else {
          // Afficher un message de confirmation
          setConfirmationMessage(
            "Votre réservation a été créée avec succès. Veuillez payer 30% sous 48 heures."
          );
          setShowPopup(false); // Fermer le popup après la réservation
          // Enregistrer le code de réservation pour la redirection
          // const reservationCode = data.reservation.reservationCode;
          // setReservationCodeForRedirect(reservationCode);
        }
      } else {
        console.error(
          "Erreur lors de la création de la réservation :",
          data.message
        );
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation :", error);
    } finally {
      setIsSubmitting(false); // Arrêter le chargement
    }
  };
  const selectedTerrainObj = terrains.find(
    (terrain) => terrain._id === selectedTerrain
  );
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0 en JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">Réserver un terrain</h2>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <label
            htmlFor="terrain"
            className="block text-sm font-medium text-gray-700"
          >
            Choisir un terrain :
          </label>
          <select
            id="terrain"
            className="select select-bordered w-full mt-2"
            value={selectedTerrain}
            onChange={(e) => handleTerrainChange(e.target.value)}
          >
            <option value="">Sélectionner un terrain</option>
            {terrains.map((terrain) => (
              <option key={terrain._id} value={terrain._id}>
                {terrain.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Choisir une date :
          </label>
          <input
            type="date"
            id="date"
            className="input input-bordered w-full mt-2"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Heures disponibles</h3>
        {loading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableTimes.map((time) => (
              <div
                key={time.startTime}
                className={`p-3 border rounded-lg ${
                  time.isReserved ? "bg-red-100" : "bg-green-100"
                } flex justify-between`}
              >
                <span>
                  {time.startTime} - {time.endTime}
                </span>
                <input
                  type="checkbox"
                  disabled={time.isReserved}
                  onChange={() =>
                    handleTimeSelection(time.startTime, time.endTime)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bouton flottant */}
      <button
        className="fixed bottom-5 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg"
        onClick={() => setShowPopup(true)}
        disabled={
          selectedTimes.length === 0 || !selectedTerrain || !selectedDate
        }
      >
        Réserver
      </button>

      {/* Popup avec les détails de la réservation */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              Détails de la réservation
            </h3>
            <p>Terrain sélectionné : {selectedTerrainObj?.name}</p>
            <p>Date sélectionnée : {formatDate(selectedDate)}</p>

            <p>Plages horaires sélectionnées :</p>
            <ul>
              {selectedTimes.map((time, index) => (
                <li key={index}>
                  {time.startTime} - {time.endTime}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Numéro de téléphone(avec +221) :
              </label>
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Mode de paiement :
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_online"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="radio radio-primary"
                  />{" "}
                  Payer maintenant
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_later"
                    className="radio radio-primary"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />{" "}
                  Payer après
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="btn btn-warning text-white px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
                disabled={isSubmitting} // Désactiver le bouton si en chargement
              >
                Annuler
              </button>
              <button
                className="btn btn-primary text-white px-4 py-2 rounded flex items-center"
                onClick={handleSubmit}
                disabled={isSubmitting} // Désactiver le bouton si en chargement
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner text-white mr-2"></span>
                    Confirmer
                  </>
                ) : (
                  "Confirmer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de confirmation pour "Payer après" */}
      {confirmationMessage && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>{confirmationMessage}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setConfirmationMessage("");
                // Rediriger vers la page de réservation
                navigate(`/reservations`);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
