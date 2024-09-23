// // import { useState, useEffect } from "react";

// // const ReservationForm = () => {
// //   const [terrains, setTerrains] = useState([]);
// //   const [selectedTerrain, setSelectedTerrain] = useState("");
// //   const [selectedDate, setSelectedDate] = useState("");
// //   const [availableTimes, setAvailableTimes] = useState([]);
// //   const [loading, setLoading] = useState(false); // État de chargement
// //   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Variable pour le lien du serveur

// //   // Fonction pour récupérer les terrains disponibles
// //   useEffect(() => {
// //     const fetchTerrains = async () => {
// //       try {
// //         const response = await fetch(`${API_BASE_URL}/api/terrains`);
// //         const data = await response.json();
// //         if (data.success) {
// //           setTerrains(data.data);
// //         } else {
// //           console.error(
// //             "Erreur lors de la récupération des terrains:",
// //             data.message
// //           );
// //         }
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération des terrains:", error);
// //       }
// //     };

// //     fetchTerrains();
// //   }, [API_BASE_URL]);

// //   // Fonction pour gérer la récupération des créneaux disponibles
// //   const fetchAvailableTimes = async (terrainId, date) => {
// //     if (terrainId && date) {
// //       setLoading(true); // Déclencher le chargement
// //       try {
// //         const formattedDate = new Date(date).toISOString().split("T")[0]; // Formatage de la date
// //         const response = await fetch(
// //           `${API_BASE_URL}/api/reservations/${terrainId}/availability?date=${formattedDate}`
// //         );
// //         const data = await response.json();
// //         if (data.success) {
// //           setAvailableTimes(data.availableTimeSlots);
// //         } else {
// //           console.error(
// //             "Erreur lors de la récupération des heures:",
// //             data.message
// //           );
// //         }
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération des heures:", error);
// //       } finally {
// //         setLoading(false); // Arrêter le chargement
// //       }
// //     }
// //   };

// //   // Gestion du changement de terrain
// //   const handleTerrainChange = (terrainId) => {
// //     setSelectedTerrain(terrainId);
// //     // Recharger les heures si une date est déjà sélectionnée
// //     if (selectedDate && terrainId) {
// //       fetchAvailableTimes(terrainId, selectedDate);
// //     }
// //   };

// //   // Gestion du changement de date
// //   const handleDateChange = (date) => {
// //     setSelectedDate(date);
// //     // Recharger les heures si un terrain est déjà sélectionné
// //     if (selectedTerrain && date) {
// //       fetchAvailableTimes(selectedTerrain, date);
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-white rounded-lg shadow-md">
// //       <h2 className="text-2xl font-semibold mb-4">Réserver un terrain</h2>

// //       {/* Sélection des terrains et des dates */}
// //       <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
// //         <div className="flex-1 mb-4 md:mb-0">
// //           <label
// //             htmlFor="terrain"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Choisir un terrain :
// //           </label>
// //           <select
// //             id="terrain"
// //             className="select select-bordered w-full mt-2"
// //             value={selectedTerrain}
// //             onChange={(e) => handleTerrainChange(e.target.value)} // Appeler lors du changement de terrain
// //           >
// //             <option value="">Sélectionner un terrain</option>
// //             {terrains.map((terrain) => (
// //               <option key={terrain._id} value={terrain._id}>
// //                 {terrain.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="flex-1">
// //           <label
// //             htmlFor="date"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Choisir une date :
// //           </label>
// //           <input
// //             type="date"
// //             id="date"
// //             className="input input-bordered w-full mt-2"
// //             value={selectedDate}
// //             onChange={(e) => handleDateChange(e.target.value)} // Appeler lors du changement de date
// //           />
// //         </div>
// //       </div>

// //       {/* Affichage des heures disponibles avec un indicateur de chargement */}
// //       <div>
// //         <h3 className="text-xl font-semibold mb-2">Heures disponibles</h3>
// //         {loading ? (
// //           <div className="flex justify-center items-center">
// //             <svg
// //               className="animate-spin h-5 w-5 text-blue-500"
// //               xmlns="http://www.w3.org/2000/svg"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //             >
// //               <circle
// //                 className="opacity-25"
// //                 cx="12"
// //                 cy="12"
// //                 r="10"
// //                 stroke="currentColor"
// //                 strokeWidth="4"
// //               ></circle>
// //               <path
// //                 className="opacity-75"
// //                 fill="currentColor"
// //                 d="M4 12a8 8 0 018-8v8z"
// //               ></path>
// //             </svg>
// //             <span className="ml-2">Chargement des heures...</span>
// //           </div>
// //         ) : availableTimes.length > 0 ? (
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {availableTimes.map((time) => (
// //               <div
// //                 key={time.startTime}
// //                 className={`flex items-center justify-between p-3 border rounded-lg ${
// //                   time.isReserved ? "bg-red-100" : "bg-green-100"
// //                 }`}
// //               >
// //                 <span>
// //                   {time.startTime} - {time.endTime}
// //                 </span>
// //                 <label className="swap swap-rotate">
// //                   <input type="checkbox" disabled={time.isReserved} />
// //                   <div className="swap-on">✔</div>
// //                   <div className="swap-off">✖</div>
// //                 </label>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500">
// //             Aucune heure disponible pour cette date.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReservationForm;

// import { useState, useEffect } from "react";

// const ReservationForm = () => {
//   const [terrains, setTerrains] = useState([]);
//   const [selectedTerrain, setSelectedTerrain] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [selectedTimes, setSelectedTimes] = useState([]); // Heures sélectionnées
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false); // Affichage du formulaire
//   const [paymentMethod, setPaymentMethod] = useState(""); // Méthode de paiement choisie
//   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Variable pour le lien du serveur

//   // Fonction pour récupérer les terrains disponibles
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

//   // Fonction pour gérer la récupération des créneaux disponibles
//   const fetchAvailableTimes = async (terrainId, date) => {
//     if (terrainId && date) {
//       setLoading(true); // Déclencher le chargement
//       try {
//         const formattedDate = new Date(date).toISOString().split("T")[0]; // Formatage de la date
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
//         setLoading(false); // Arrêter le chargement
//       }
//     }
//   };

//   // Gestion du changement de terrain
//   const handleTerrainChange = (terrainId) => {
//     setSelectedTerrain(terrainId);
//     if (selectedDate && terrainId) {
//       fetchAvailableTimes(terrainId, selectedDate);
//     }
//   };

//   // Gestion du changement de date
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (selectedTerrain && date) {
//       fetchAvailableTimes(selectedTerrain, date);
//     }
//   };

//   // Gestion de la sélection d'heures
//   const handleTimeSelection = (startTime, endTime) => {
//     const timeSlot = { startTime, endTime };
//     // Ajouter ou retirer la plage horaire sélectionnée
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

//   // Validation pour activer ou désactiver le bouton
//   const isReservationDisabled = selectedTimes.length === 0;

//   // Gérer la soumission du formulaire
//   const handleSubmit = async () => {
//     if (!paymentMethod) {
//       alert("Veuillez choisir un mode de paiement.");
//       return;
//     }

//     const reservationData = {
//       fieldId: selectedTerrain,
//       date: selectedDate,
//       times: selectedTimes,
//       paymentMethod,
//     };

//     if (paymentMethod === "pay_online") {
//       // Redirection vers la page de paiement (backend à configurer pour retourner l'URL de redirection)
//       const response = await fetch(
//         `${API_BASE_URL}/api/payments/initiate-payment`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(reservationData),
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         window.location.href = data.redirect_url; // Redirection vers PayTech
//       } else {
//         console.error("Erreur lors du paiement:", data.message);
//       }
//     } else {
//       // Paiement sur place : avertir l'utilisateur de payer au moins 50% dans les 48 heures
//       alert("Veuillez payer au moins 50% sur place dans les 48 heures.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md relative">
//       <h2 className="text-2xl font-semibold mb-4">Réserver un terrain</h2>

//       {/* Sélection des terrains et des dates */}
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

//       {/* Affichage des heures disponibles */}
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

//       {/* Bouton flottant de réservation */}
//       <button
//         className={`fixed bottom-5 right-5 p-4 rounded-full text-white ${
//           isReservationDisabled ? "bg-gray-500" : "bg-blue-500"
//         }`}
//         onClick={() => !isReservationDisabled && setShowForm(true)}
//         disabled={isReservationDisabled}
//       >
//         Réserver
//       </button>

//       {/* Formulaire de réservation */}
//       {showForm && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">
//               Formulaire de réservation
//             </h3>
//             <p>Terrain sélectionné : {selectedTerrain}</p>
//             <p>Plages horaires sélectionnées :</p>
//             <ul>
//               {selectedTimes.map((time, index) => (
//                 <li key={index}>
//                   {time.startTime} - {time.endTime}
//                 </li>
//               ))}
//             </ul>

//             {/* Sélection du mode de paiement */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Mode de paiement :
//               </label>
//               <div className="flex space-x-4">
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="pay_online"
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />{" "}
//                   Payer en ligne
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="pay_on_site"
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />{" "}
//                   Payer sur place
//                 </label>
//               </div>
//             </div>

//             {/* Boutons de validation */}
//             <div className="mt-6 flex justify-end space-x-4">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                 onClick={() => setShowForm(false)}
//               >
//                 Annuler
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleSubmit}
//               >
//                 Confirmer
//               </button>
//             </div>
//           </div>
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
  const [telephone, setTelephone] = useState(""); // Champ pour le numéro de téléphone
  const [paymentMethod, setPaymentMethod] = useState(""); // Méthode de paiement
  const [minimumPayment, setMinimumPayment] = useState(0); // Montant minimum requis pour la réservation
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Variable pour le lien du serveur

  // Fonction pour récupérer les terrains disponibles
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

  // Fonction pour gérer la récupération des créneaux disponibles
  const fetchAvailableTimes = async (terrainId, date) => {
    if (terrainId && date) {
      setLoading(true); // Déclencher le chargement
      try {
        const formattedDate = new Date(date).toISOString().split("T")[0]; // Formatage de la date
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
        setLoading(false); // Arrêter le chargement
      }
    }
  };

  // Gestion du changement de terrain
  const handleTerrainChange = (terrainId) => {
    setSelectedTerrain(terrainId);
    if (selectedDate && terrainId) {
      fetchAvailableTimes(terrainId, selectedDate);
    }
  };

  // Gestion du changement de date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedTerrain && date) {
      fetchAvailableTimes(selectedTerrain, date);
    }
  };

  // Gestion de la sélection d'heures
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

  // Validation pour activer ou désactiver le bouton
  const isReservationDisabled = selectedTimes.length === 0;

  // Gérer la soumission du formulaire
  const handleSubmit = async () => {
    if (!paymentMethod || !telephone) {
      alert("Veuillez remplir toutes les informations.");
      return;
    }

    // Création des données de la réservation
    const reservationData = {
      fieldId: selectedTerrain,
      date: selectedDate,
      startTime: selectedTimes[0]?.startTime,
      endTime: selectedTimes[selectedTimes.length - 1]?.endTime,
      telephone,
      paymentMethod,
      paidAmount: paymentMethod === "pay_on_site" ? 0 : minimumPayment, // Utiliser le montant minimum
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
          window.location.href = data.redirect_url; // Redirection vers PayTech pour paiement en ligne
        } else {
          alert(
            "Votre réservation a été créée. Veuillez payer au moins 50% sur place dans les 48 heures."
          );
        }
      } else {
        console.error(
          "Erreur lors de la création de la réservation :",
          data.message
        );
        alert(data.message); // Afficher un message d'erreur si nécessaire
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation :", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">Réserver un terrain</h2>

      {/* Sélection des terrains et des dates */}
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

      {/* Affichage des heures disponibles */}
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

      {/* Bouton flottant de réservation */}
      <button
        className={`fixed bottom-5 right-5 p-4 rounded-full text-white ${
          isReservationDisabled ? "bg-gray-500" : "bg-blue-500"
        }`}
        onClick={() => !isReservationDisabled && setShowForm(true)}
        disabled={isReservationDisabled}
      >
        Réserver
      </button>

      {/* Formulaire de réservation */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Formulaire de réservation
            </h3>
            <p>Terrain sélectionné : {selectedTerrain}</p>
            <p>Plages horaires sélectionnées :</p>
            <ul>
              {selectedTimes.map((time, index) => (
                <li key={index}>
                  {time.startTime} - {time.endTime}
                </li>
              ))}
            </ul>

            {/* Numéro de téléphone */}
            <div className="mt-4">
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro de téléphone :
              </label>
              <input
                type="text"
                id="telephone"
                className="input input-bordered w-full mt-2"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>

            {/* Sélection du mode de paiement */}
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
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setMinimumPayment(15000); // Mettre à jour le montant minimum requis
                    }}
                  />{" "}
                  Payer en ligne
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_on_site"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setMinimumPayment(0); // Pas de montant minimum pour payer sur place
                    }}
                  />{" "}
                  Payer sur place
                </label>
              </div>
            </div>

            {/* Validation du paiement */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Confirmer et payer{" "}
                {minimumPayment > 0 && `(${minimumPayment} XOF)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
