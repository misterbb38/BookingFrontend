// import { useState, useEffect } from "react";

// const ReservationForm = () => {
//   const [terrains, setTerrains] = useState([]);
//   const [selectedTerrain, setSelectedTerrain] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [selectedTimes, setSelectedTimes] = useState([]);
//   const [telephone, setTelephone] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [confirmationMessage, setConfirmationMessage] = useState("");
//   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchTerrains = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/terrains`);
//         const data = await response.json();
//         if (data.success) {
//           setTerrains(data.data);
//         } else {
//           console.error(
//             "Erreur lors de la récupération des terrains:",
//             data.message
//           );
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des terrains:", error);
//       }
//     };

//     fetchTerrains();
//   }, [API_BASE_URL]);

//   const fetchAvailableTimes = async (terrainId, date) => {
//     if (terrainId && date) {
//       setLoading(true);
//       try {
//         const formattedDate = new Date(date).toISOString().split("T")[0];
//         const response = await fetch(
//           `${API_BASE_URL}/api/reservations/${terrainId}/availability?date=${formattedDate}`
//         );
//         const data = await response.json();
//         if (data.success) {
//           setAvailableTimes(data.availableTimeSlots);
//         } else {
//           console.error(
//             "Erreur lors de la récupération des heures:",
//             data.message
//           );
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des heures:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleTerrainChange = (terrainId) => {
//     setSelectedTerrain(terrainId);
//     if (selectedDate && terrainId) {
//       fetchAvailableTimes(terrainId, selectedDate);
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (selectedTerrain && date) {
//       fetchAvailableTimes(selectedTerrain, date);
//     }
//   };

//   const handleTimeSelection = (startTime, endTime) => {
//     const timeSlot = { startTime, endTime };
//     if (
//       selectedTimes.some(
//         (time) => time.startTime === startTime && time.endTime === endTime
//       )
//     ) {
//       setSelectedTimes(
//         selectedTimes.filter(
//           (time) => time.startTime !== startTime && time.endTime !== endTime
//         )
//       );
//     } else {
//       setSelectedTimes([...selectedTimes, timeSlot]);
//     }
//   };

//   const isReservationDisabled = selectedTimes.length === 0 || !paymentMethod;

//   const handleSubmit = async () => {
//     if (!paymentMethod || !telephone) {
//       alert("Veuillez remplir toutes les informations.");
//       return;
//     }

//     const reservationData = {
//       fieldId: selectedTerrain,
//       date: selectedDate,
//       startTime: selectedTimes[0]?.startTime,
//       endTime: selectedTimes[selectedTimes.length - 1]?.endTime,
//       telephone,
//       paymentMethod,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/reservations`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(reservationData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (paymentMethod === "pay_online") {
//           // Rediriger vers PayTech
//           window.location.href = data.payments[0].redirect_url;
//         } else {
//           // Afficher un message de confirmation
//           setConfirmationMessage(
//             "Votre réservation a été créée avec succès. Veuillez payer 30% sous 48 heures."
//           );
//           setShowForm(false); // Fermer le formulaire après la réservation
//         }
//       } else {
//         console.error(
//           "Erreur lors de la création de la réservation :",
//           data.message
//         );
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la soumission de la réservation :", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md relative">
//       <h2 className="text-2xl font-semibold mb-4">Réserver un terrain</h2>

//       <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
//         <div className="flex-1 mb-4 md:mb-0">
//           <label
//             htmlFor="terrain"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Choisir un terrain :
//           </label>
//           <select
//             id="terrain"
//             className="select select-bordered w-full mt-2"
//             value={selectedTerrain}
//             onChange={(e) => handleTerrainChange(e.target.value)}
//           >
//             <option value="">Sélectionner un terrain</option>
//             {terrains.map((terrain) => (
//               <option key={terrain._id} value={terrain._id}>
//                 {terrain.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex-1">
//           <label
//             htmlFor="date"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Choisir une date :
//           </label>
//           <input
//             type="date"
//             id="date"
//             className="input input-bordered w-full mt-2"
//             value={selectedDate}
//             onChange={(e) => handleDateChange(e.target.value)}
//           />
//         </div>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold mb-2">Heures disponibles</h3>
//         {loading ? (
//           <p>Chargement des heures...</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {availableTimes.map((time) => (
//               <div
//                 key={time.startTime}
//                 className={`p-3 border rounded-lg ${
//                   time.isReserved ? "bg-red-100" : "bg-green-100"
//                 } flex justify-between`}
//               >
//                 <span>
//                   {time.startTime} - {time.endTime}
//                 </span>
//                 <input
//                   type="checkbox"
//                   disabled={time.isReserved}
//                   onChange={() =>
//                     handleTimeSelection(time.startTime, time.endTime)
//                   }
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Numéro de téléphone :
//         </label>
//         <input
//           type="text"
//           className="input input-bordered w-full mt-2"
//           value={telephone}
//           onChange={(e) => setTelephone(e.target.value)}
//         />
//       </div>

//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Mode de paiement :
//         </label>
//         <div className="flex space-x-4">
//           <label>
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="pay_online"
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />{" "}
//             Payer maintenant
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="pay_later"
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />{" "}
//             Payer après
//           </label>
//         </div>
//       </div>

//       <button
//         className={`mt-6 bg-blue-500 text-white px-4 py-2 rounded ${
//           isReservationDisabled ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={handleSubmit}
//         disabled={isReservationDisabled}
//       >
//         Réserver
//       </button>

//       {confirmationMessage && (
//         <div className="mt-4 p-4 bg-green-100 text-green-700">
//           {confirmationMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReservationForm;

import { useState, useEffect } from "react";

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
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

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

    const reservationData = {
      fieldId: selectedTerrain,
      date: selectedDate,
      startTime: selectedTimes[0]?.startTime,
      endTime: selectedTimes[selectedTimes.length - 1]?.endTime,
      telephone,
      paymentMethod,
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
    }
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
          <p>Chargement des heures...</p>
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
            <p>Terrain sélectionné : {selectedTerrain}</p>
            <p>Date sélectionnée : {selectedDate}</p>
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
                Numéro de téléphone :
              </label>
              <input
                type="text"
                className="input input-bordered w-full mt-2"
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
                  />{" "}
                  Payer maintenant
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_later"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />{" "}
                  Payer après
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Annuler
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationMessage && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>{confirmationMessage}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setConfirmationMessage("")}
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
