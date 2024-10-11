// import { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// const ReservationStats = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [stats, setStats] = useState(null);
//   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

//   // Définir les dates par défaut au chargement de la page
//   useEffect(() => {
//     const today = new Date();
//     const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
//     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

//     const formatDate = (date) => date.toISOString().split("T")[0];

//     setStartDate(formatDate(firstDay));
//     setEndDate(formatDate(lastDay));
//   }, []);

//   // Appeler fetchStats lorsque les dates changent
//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchStats();
//     }
//   }, [startDate, endDate]);

//   const fetchStats = async () => {
//     try {
//       let url = `${API_BASE_URL}/api/reservations/reservations/stats?`;

//       if (startDate) {
//         url += `startDate=${startDate}&`;
//       }

//       if (endDate) {
//         url += `endDate=${endDate}&`;
//       }

//       // Supprimer le dernier caractère '&' si nécessaire
//       url = url.endsWith("&") ? url.slice(0, -1) : url;

//       console.log("Fetching stats with URL:", url);

//       const response = await fetch(url, {
//         headers: {
//           "Content-Type": "application/json",
//           // Ajouter l'en-tête Authorization si nécessaire
//           // 'Authorization': `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (data.success) {
//         setStats(data);
//       } else {
//         console.error(
//           "Erreur lors de la récupération des statistiques:",
//           data.message
//         );
//       }
//     } catch (error) {
//       console.error("Erreur lors de la récupération des statistiques:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchStats();
//   };

//   // Préparation des données pour les graphiques avec formatage des dates
//   const prepareChartData = (counts, label, type) => {
//     const labels = counts.map((item) => {
//       if (type === "daily") {
//         // Format jj/mm/aaaa
//         const date = new Date(item._id);
//         return date.toLocaleDateString();
//       } else if (type === "monthly") {
//         // Format mois année (Oct 2024)
//         const [year, month] = item._id.split("-");
//         const date = new Date(year, month - 1);
//         return date.toLocaleString("fr-FR", {
//           month: "short",
//           year: "numeric",
//         });
//       } else {
//         return item._id; // Pour les autres types (hebdomadaire)
//       }
//     });

//     const data = counts.map((item) => item.count);

//     return {
//       labels,
//       datasets: [
//         {
//           label: `Nombre de réservations ${label}`,
//           data,
//           backgroundColor: "rgba(54, 162, 235, 0.6)",
//         },
//       ],
//     };
//   };

//   // Options des graphiques pour les rendre responsives et plus petits
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     // Vous pouvez ajuster l'aspectRatio ou définir une hauteur fixe
//     // aspectRatio: 1.5,
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Statistiques des réservations</h1>

//       {/* Formulaire de filtres */}
//       <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
//         <div>
//           <label htmlFor="startDate" className="block mb-1">
//             Date de début :
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="input input-bordered"
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate" className="block mb-1">
//             Date de fin :
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="input input-bordered"
//           />
//         </div>
//         <div className="flex items-end">
//           <button type="submit" className="btn btn-primary">
//             Afficher
//           </button>
//         </div>
//       </form>

//       {/* Affichage des graphiques */}
//       {stats && (
//         <div className="space-y-8">
//           {/* Graphique quotidien */}
//           <div className="chart-container" style={{ height: "300px" }}>
//             <h2 className="text-xl font-bold mb-2">Réservations par jour</h2>
//             <Bar
//               key={`daily-${stats.dailyCounts.length}`}
//               data={prepareChartData(stats.dailyCounts, "par jour", "daily")}
//               options={chartOptions}
//             />
//           </div>

//           {/* Graphique hebdomadaire */}
//           <div className="chart-container" style={{ height: "300px" }}>
//             <h2 className="text-xl font-bold mb-2">Réservations par semaine</h2>
//             <Bar
//               key={`weekly-${stats.weeklyCounts.length}`}
//               data={prepareChartData(
//                 stats.weeklyCounts.map((item) => ({
//                   _id: `Semaine ${item._id.week} (${item._id.year})`,
//                   count: item.count,
//                 })),
//                 "par semaine",
//                 "weekly"
//               )}
//               options={chartOptions}
//             />
//           </div>

//           {/* Graphique mensuel */}
//           <div className="chart-container" style={{ height: "300px" }}>
//             <h2 className="text-xl font-bold mb-2">Réservations par mois</h2>
//             <Bar
//               key={`monthly-${stats.monthlyCounts.length}`}
//               data={prepareChartData(
//                 stats.monthlyCounts,
//                 "par mois",
//                 "monthly"
//               )}
//               options={chartOptions}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReservationStats;

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const ReservationStats = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
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

  // Appeler fetchStats lorsque les filtres changent
  useEffect(() => {
    if (startDate && endDate) {
      fetchStats();
    }
  }, [startDate, endDate, selectedField]);

  const fetchStats = async () => {
    try {
      let url = `${API_BASE_URL}/api/reservations/reservations/stats?`;

      if (startDate) {
        url += `startDate=${startDate}&`;
      }

      if (endDate) {
        url += `endDate=${endDate}&`;
      }

      if (selectedField) {
        url += `fieldId=${selectedField}&`;
      }

      // Supprimer le dernier caractère '&' si nécessaire
      url = url.endsWith("&") ? url.slice(0, -1) : url;

      console.log("Fetching stats with URL:", url);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          // Ajouter l'en-tête Authorization si nécessaire
          // 'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setStats(data);
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

  // Préparation des données pour les graphiques avec formatage des dates
  const prepareChartData = (counts, label, type) => {
    const labels = counts.map((item) => {
      if (type === "daily") {
        // Format jj/mm/aaaa
        const date = new Date(item._id.date);
        return date.toLocaleDateString();
      } else if (type === "monthly") {
        // Format mois année (Oct 2024)
        const date = new Date(item._id.year, item._id.month - 1);
        return date.toLocaleString("fr-FR", {
          month: "short",
          year: "numeric",
        });
      } else if (type === "weekly") {
        return `Semaine ${item._id.week} (${item._id.year})`;
      } else {
        return item._id; // Pour les autres types
      }
    });

    const data = counts.map((item) => item.count);

    return {
      labels,
      datasets: [
        {
          label: `Nombre de réservations ${label}`,
          data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };
  };

  // Options des graphiques pour les rendre responsives et plus petits
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // Vous pouvez ajuster l'aspectRatio ou définir une hauteur fixe
    // aspectRatio: 1.5,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Statistiques des réservations</h1>

      {/* Formulaire de filtres */}
      <form onSubmit={handleSubmit} className="flex flex-wrap space-x-4 mb-4">
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
            <option value="">Tous les terrains</option>
            {fields.map((field) => (
              <option key={field._id} value={field._id}>
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
          {/* Graphique quotidien */}
          <div className="chart-container" style={{ height: "300px" }}>
            <h2 className="text-xl font-bold mb-2">Réservations par jour</h2>
            <Bar
              key={`daily-${stats.dailyCounts.length}`}
              data={prepareChartData(stats.dailyCounts, "par jour", "daily")}
              options={chartOptions}
            />
          </div>

          {/* Graphique hebdomadaire */}
          <div className="chart-container" style={{ height: "300px" }}>
            <h2 className="text-xl font-bold mb-2">Réservations par semaine</h2>
            <Bar
              key={`weekly-${stats.weeklyCounts.length}`}
              data={prepareChartData(
                stats.weeklyCounts,
                "par semaine",
                "weekly"
              )}
              options={chartOptions}
            />
          </div>

          {/* Graphique mensuel */}
          <div className="chart-container" style={{ height: "300px" }}>
            <h2 className="text-xl font-bold mb-2">Réservations par mois</h2>
            <Bar
              key={`monthly-${stats.monthlyCounts.length}`}
              data={prepareChartData(
                stats.monthlyCounts,
                "par mois",
                "monthly"
              )}
              options={chartOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationStats;
