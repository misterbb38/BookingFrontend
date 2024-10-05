import { useState } from "react";

const ReservationPage = () => {
  const [reservationCode, setReservationCode] = useState("");
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState("");

  // Utilisation de la variable d'environnement pour l'URL de l'API
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReservation(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/reservations/code/${reservationCode}`
      );
      const data = await response.json();
      if (response.ok) {
        setReservation(data.data);
      } else {
        setError(
          data.message || "Erreur lors de la récupération de la réservation"
        );
      }
    } catch (err) {
      setError("Erreur lors de la récupération de la réservation");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Formulaire centré */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Consulter votre réservation
        </h1>
        <p>
          Veillez entre le code de reservation que vous avez recu par SMS lors
          de la reservation
        </p>
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex flex-col items-center"
        >
          <label className="block mb-2 w-full max-w-xs">
            <input
              type="text"
              placeholder="Entrez votre code de réservation"
              value={reservationCode}
              onChange={(e) => setReservationCode(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-2 w-full max-w-xs"
          >
            Rechercher
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {/* Affichage des détails de la réservation */}
      {reservation && (
        <div className="border p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-center">
            Détails de la réservation
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Terrain :</strong> {reservation.fieldId.name}
            </p>
            <p>
              <strong>Date :</strong>{" "}
              {new Date(reservation.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Heure de début :</strong> {reservation.startTime}
            </p>
            <p>
              <strong>Heure de fin :</strong> {reservation.endTime}
            </p>
            <p>
              <strong>Prix total :</strong> {reservation.totalPrice} XOF
            </p>
            <p>
              <strong>Statut :</strong> {reservation.status}
            </p>
          </div>

          {/* Gestion des paiements */}
          <div className="mt-4 flex flex-col items-center">
            {reservation.payments && (
              <>
                {(() => {
                  const avancePayment = reservation.payments.find(
                    (payment) => payment.command_name === "Avance Réservation"
                  );
                  const restePayment = reservation.payments.find(
                    (payment) =>
                      payment.command_name === "Paiement Final Réservation"
                  );

                  return (
                    <>
                      {/* Bouton pour payer l'avance (30%) */}
                      {!avancePayment ||
                      (avancePayment &&
                        avancePayment.payment_status !== "success") ? (
                        <button
                          onClick={() =>
                            (window.location.href = avancePayment.redirect_url)
                          }
                          className="btn btn-primary w-full max-w-xs mb-2"
                        >
                          Payer l'avance (30%)
                        </button>
                      ) : null}

                      {/* Bouton pour payer le reste (70%) */}
                      {avancePayment &&
                      avancePayment.payment_status === "success" &&
                      (!restePayment ||
                        (restePayment &&
                          restePayment.payment_status !== "success")) ? (
                        <button
                          onClick={() =>
                            (window.location.href = restePayment.redirect_url)
                          }
                          className="btn btn-secondary w-full max-w-xs mb-2"
                        >
                          Payer le reste (70%)
                        </button>
                      ) : null}

                      {/* Indiquer si tous les paiements ont été effectués */}
                      {avancePayment &&
                      avancePayment.payment_status === "success" &&
                      restePayment &&
                      restePayment.payment_status === "success" ? (
                        <p className="text-green-500 mt-2 text-center">
                          Tous les paiements ont été effectués.
                        </p>
                      ) : null}
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
