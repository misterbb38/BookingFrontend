import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const PaymentStats = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [fields, setFields] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  // Définir les dates par défaut au chargement de la page
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const formatDate = (date) => date.toISOString().split("T")[0];

    setStartDate(formatDate(firstDay));
    setEndDate(formatDate(lastDay));
  }, []);

  // Récupérer la liste des terrains
  useEffect(() => {
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
          // Définir le terrain sélectionné par défaut
          if (data.data.length > 0) {
            setSelectedField(data.data[0].name);
          }
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

    fetchFields();
  }, []);

  // Appeler fetchStats lorsque les dates changent
  useEffect(() => {
    if (startDate && endDate) {
      fetchStats();
    }
  }, [startDate, endDate]);

  const fetchStats = async () => {
    try {
      let url = `${API_BASE_URL}/api/payments/stats?`;

      if (startDate) {
        url += `startDate=${startDate}&`;
      }

      if (endDate) {
        url += `endDate=${endDate}&`;
      }

      // Supprimer le dernier caractère '&' si nécessaire
      url = url.endsWith("&") ? url.slice(0, -1) : url;

      console.log("Fetching stats with URL:", url);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        console.error(
          "Erreur lors de la récupération des statistiques:",
          data.message
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStats();
  };

  // Préparation des données pour les graphiques par terrain
  const prepareFieldChartData = (counts, type) => {
    if (!counts || !selectedField) return { labels: [], datasets: [] };

    // Filtrer les données pour le terrain sélectionné
    const filteredData = counts.filter(
      (item) => item._id.fieldName === selectedField
    );

    let labels = [];
    let paymentTypes = ["advance", "final"];
    let datasets = paymentTypes.map((paymentType, index) => ({
      label: paymentType === "advance" ? "Avance" : "Paiement Final",
      data: [],
      backgroundColor:
        index === 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(153, 102, 255, 0.6)",
    }));

    filteredData.forEach((item) => {
      let label = "";
      if (type === "daily") {
        label = item._id.date;
      } else if (type === "weekly") {
        label = `Semaine ${item._id.week} (${item._id.year})`;
      } else if (type === "monthly") {
        const date = new Date(item._id.year, item._id.month - 1);
        label = date.toLocaleString("fr-FR", {
          month: "short",
          year: "numeric",
        });
      }

      labels.push(label);

      paymentTypes.forEach((paymentType, index) => {
        const payment = item.payments.find(
          (p) => p.paymentType === paymentType
        );
        datasets[index].data.push(payment ? payment.totalAmount : 0);
      });
    });

    return { labels, datasets };
  };

  // Options des graphiques pour les rendre responsives et plus petits
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Statistiques des paiements</h1>

      {/* Formulaire de filtres */}
      <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block mb-1">
            Date de début :
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-1">
            Date de fin :
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="fieldSelect" className="block mb-1">
            Terrain :
          </label>
          <select
            id="fieldSelect"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="select select-bordered"
          >
            {fields.map((field) => (
              <option key={field._id} value={field.name}>
                {field.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn btn-primary">
            Afficher
          </button>
        </div>
      </form>

      {/* Affichage des graphiques */}
      {stats && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Statistiques pour le terrain : {selectedField}
            </h2>
          </div>
          <div className="chart-container" style={{ height: "300px" }}>
            <h3 className="text-lg font-bold mb-2">Paiements par jour</h3>
            <Bar
              data={prepareFieldChartData(stats.perFieldDaily, "daily")}
              options={chartOptions}
            />
          </div>

          <div className="chart-container" style={{ height: "300px" }}>
            <h3 className="text-lg font-bold mb-2">Paiements par semaine</h3>
            <Bar
              data={prepareFieldChartData(stats.perFieldWeekly, "weekly")}
              options={chartOptions}
            />
          </div>

          <div className="chart-container" style={{ height: "300px" }}>
            <h3 className="text-lg font-bold mb-2">Paiements par mois</h3>
            <Bar
              data={prepareFieldChartData(stats.perFieldMonthly, "monthly")}
              options={chartOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStats;
