// // import { useState, useEffect } from "react";
// // import { Bar } from "react-chartjs-2";

// // const PaymentStats = () => {
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [stats, setStats] = useState(null);
// //   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// //   // Définir les dates par défaut au chargement de la page
// //   useEffect(() => {
// //     const today = new Date();
// //     const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
// //     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// //     const formatDate = (date) => date.toISOString().split("T")[0];

// //     setStartDate(formatDate(firstDay));
// //     setEndDate(formatDate(lastDay));
// //   }, []);

// //   // Appeler fetchStats lorsque les dates changent
// //   useEffect(() => {
// //     if (startDate && endDate) {
// //       fetchStats();
// //     }
// //   }, [startDate, endDate]);

// //   const fetchStats = async () => {
// //     try {
// //       let url = `${API_BASE_URL}/api/payments/stats?`;

// //       if (startDate) {
// //         url += `startDate=${startDate}&`;
// //       }

// //       if (endDate) {
// //         url += `endDate=${endDate}&`;
// //       }

// //       // Supprimer le dernier caractère '&' si nécessaire
// //       url = url.endsWith("&") ? url.slice(0, -1) : url;

// //       console.log("Fetching stats with URL:", url);

// //       const response = await fetch(url, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           // Ajouter l'en-tête Authorization si nécessaire
// //           // 'Authorization': `Bearer ${token}`,
// //         },
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         setStats(data.data);
// //       } else {
// //         console.error(
// //           "Erreur lors de la récupération des statistiques:",
// //           data.message
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Erreur lors de la récupération des statistiques:", error);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     fetchStats();
// //   };

// //   // Préparation des données pour les graphiques
// //   const prepareChartData = (counts, label, type) => {
// //     const labels = counts.map((item) => {
// //       if (type === "daily") {
// //         // Format jj/mm/aaaa
// //         const date = new Date(item._id);
// //         return date.toLocaleDateString();
// //       } else if (type === "monthly") {
// //         // Format mois année (Oct 2024)
// //         const { year, month } = item._id;
// //         const date = new Date(year, month - 1);
// //         return date.toLocaleString("fr-FR", {
// //           month: "short",
// //           year: "numeric",
// //         });
// //       } else if (type === "weekly") {
// //         // Format "Semaine X (Année)"
// //         const { year, week } = item._id;
// //         return `Semaine ${week} (${year})`;
// //       } else {
// //         return item._id;
// //       }
// //     });

// //     // Préparer les datasets pour advance et final
// //     const paymentTypes = ["advance", "final"];
// //     const datasets = paymentTypes.map((paymentType, index) => {
// //       return {
// //         label: paymentType === "advance" ? "Avance" : "Paiement Final",
// //         data: counts.map((item) => {
// //           const payment = item.payments.find(
// //             (p) => p.paymentType === paymentType
// //           );
// //           return payment ? payment.totalAmount : 0;
// //         }),
// //         backgroundColor:
// //           index === 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(153, 102, 255, 0.6)",
// //       };
// //     });

// //     return {
// //       labels,
// //       datasets,
// //     };
// //   };

// //   // Options des graphiques pour les rendre responsives et plus petits
// //   const chartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //   };

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl font-bold mb-4">Statistiques des paiements</h1>

// //       {/* Formulaire de filtres */}
// //       <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
// //         <div>
// //           <label htmlFor="startDate" className="block mb-1">
// //             Date de début :
// //           </label>
// //           <input
// //             type="date"
// //             id="startDate"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             className="input input-bordered"
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="endDate" className="block mb-1">
// //             Date de fin :
// //           </label>
// //           <input
// //             type="date"
// //             id="endDate"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             className="input input-bordered"
// //           />
// //         </div>
// //         <div className="flex items-end">
// //           <button type="submit" className="btn btn-primary">
// //             Afficher
// //           </button>
// //         </div>
// //       </form>

// //       {/* Affichage des graphiques */}
// //       {stats && (
// //         <div className="space-y-8">
// //           {/* Graphique quotidien */}
// //           <div className="chart-container" style={{ height: "300px" }}>
// //             <h2 className="text-xl font-bold mb-2">Paiements par jour</h2>
// //             <Bar
// //               key={`daily-${stats.daily.length}`}
// //               data={prepareChartData(stats.daily, "", "daily")}
// //               options={chartOptions}
// //             />
// //           </div>

// //           {/* Graphique hebdomadaire */}
// //           <div className="chart-container" style={{ height: "300px" }}>
// //             <h2 className="text-xl font-bold mb-2">Paiements par semaine</h2>
// //             <Bar
// //               key={`weekly-${stats.weekly.length}`}
// //               data={prepareChartData(stats.weekly, "", "weekly")}
// //               options={chartOptions}
// //             />
// //           </div>

// //           {/* Graphique mensuel */}
// //           <div className="chart-container" style={{ height: "300px" }}>
// //             <h2 className="text-xl font-bold mb-2">Paiements par mois</h2>
// //             <Bar
// //               key={`monthly-${stats.monthly.length}`}
// //               data={prepareChartData(stats.monthly, "", "monthly")}
// //               options={chartOptions}
// //             />
// //           </div>

// //           {/* Totaux */}
// //           <div>
// //             <h2 className="text-xl font-bold mb-2">Totaux des paiements</h2>
// //             <ul>
// //               {stats.totals.map((total) => (
// //                 <li key={total._id}>
// //                   <strong>
// //                     {total._id === "advance" ? "Avance" : "Paiement Final"} :
// //                   </strong>{" "}
// //                   {total.totalAmount} XOF
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PaymentStats;

// // src/pages/PaymentStats.jsx
// import { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// const PaymentStats = () => {
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
//       let url = `${API_BASE_URL}/api/payments/stats?`;

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
//         },
//       });

//       const data = await response.json();

//       if (data.success) {
//         setStats(data.data);
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
//         const { year, month } = item._id;
//         const date = new Date(year, month - 1);
//         return date.toLocaleString("fr-FR", {
//           month: "short",
//           year: "numeric",
//         });
//       } else if (type === "weekly") {
//         // Format "Semaine X (Année)"
//         const { year, week } = item._id;
//         return `Semaine ${week} (${year})`;
//       } else {
//         return item._id;
//       }
//     });

//     // Préparer les datasets pour avance et paiement final
//     const paymentTypes = ["advance", "final"];
//     const datasets = paymentTypes.map((paymentType, index) => {
//       return {
//         label: paymentType === "advance" ? "Avance" : "Paiement Final",
//         data: counts.map((item) => {
//           const payment = item.payments.find(
//             (p) => p.paymentType === paymentType
//           );
//           return payment ? payment.totalAmount : 0;
//         }),
//         backgroundColor:
//           index === 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(153, 102, 255, 0.6)",
//       };
//     });

//     return {
//       labels,
//       datasets,
//     };
//   };

//   // Options des graphiques pour les rendre responsives et plus petits
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Statistiques des paiements</h1>

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
//             <h2 className="text-xl font-bold mb-2">Paiements par jour</h2>
//             <Bar
//               key={`daily-${stats.daily.length}`}
//               data={prepareChartData(stats.daily, "", "daily")}
//               options={chartOptions}
//             />
//           </div>

//           {/* Graphique hebdomadaire */}
//           <div className="chart-container" style={{ height: "300px" }}>
//             <h2 className="text-xl font-bold mb-2">Paiements par semaine</h2>
//             <Bar
//               key={`weekly-${stats.weekly.length}`}
//               data={prepareChartData(stats.weekly, "", "weekly")}
//               options={chartOptions}
//             />
//           </div>

//           {/* Graphique mensuel */}
//           <div className="chart-container" style={{ height: "300px" }}>
//             <h2 className="text-xl font-bold mb-2">Paiements par mois</h2>
//             <Bar
//               key={`monthly-${stats.monthly.length}`}
//               data={prepareChartData(stats.monthly, "", "monthly")}
//               options={chartOptions}
//             />
//           </div>

//           {/* Totaux */}
//           <div>
//             <h2 className="text-xl font-bold mb-2">Totaux des paiements</h2>
//             <ul>
//               {stats.totals.map((total) => (
//                 <li key={total._id}>
//                   <strong>
//                     {total._id === "advance" ? "Avance" : "Paiement Final"} :
//                   </strong>{" "}
//                   {total.totalAmount} XOF
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentStats;

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const PaymentStats = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState(null);
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

  // Préparation des données pour les graphiques avec formatage des dates
  const prepareChartData = (counts, label, type) => {
    const labels = counts.map((item) => {
      if (type === "daily") {
        const date = new Date(item._id);
        return date.toLocaleDateString();
      } else if (type === "monthly") {
        const { year, month } = item._id;
        const date = new Date(year, month - 1);
        return date.toLocaleString("fr-FR", {
          month: "short",
          year: "numeric",
        });
      } else if (type === "weekly") {
        const { year, week } = item._id;
        return `Semaine ${week} (${year})`;
      } else {
        return item._id;
      }
    });

    const paymentTypes = ["advance", "final"];
    const datasets = paymentTypes.map((paymentType, index) => {
      return {
        label: paymentType === "advance" ? "Avance" : "Paiement Final",
        data: counts.map((item) => {
          const payment = item.payments.find(
            (p) => p.paymentType === paymentType
          );
          return payment ? payment.totalAmount : 0;
        }),
        backgroundColor:
          index === 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(153, 102, 255, 0.6)",
      };
    });

    return {
      labels,
      datasets,
    };
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
        <div className="flex items-end">
          <button type="submit" className="btn btn-primary">
            Afficher
          </button>
        </div>
      </form>

      {/* Affichage des graphiques */}
      {stats && (
        <div className="space-y-8">
          <div className="chart-container" style={{ height: "300px" }}>
            <h2 className="text-xl font-bold mb-2">Paiements par jour</h2>
            <Bar
              data={prepareChartData(stats.daily, "", "daily")}
              options={chartOptions}
            />
          </div>

          <div className="chart-container" style={{ height: "300px" }}>
            <h2 className="text-xl font-bold mb-2">Paiements par semaine</h2>
            <Bar
              data={prepareChartData(stats.weekly, "", "weekly")}
              options={chartOptions}
            />
          </div>

          <div className="chart-container" style={{ height: "300px" }}>
            <h2 className="text-xl font-bold mb-2">Paiements par mois</h2>
            <Bar
              data={prepareChartData(stats.monthly, "", "monthly")}
              options={chartOptions}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Totaux des paiements</h2>
            <ul>
              {stats.totals.map((total) => (
                <li key={total._id}>
                  <strong>
                    {total._id === "advance" ? "Avance" : "Paiement Final"} :
                  </strong>{" "}
                  {total.totalAmount} XOF
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStats;