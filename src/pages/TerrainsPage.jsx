import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foot2 from "../assets/foot2.jpg";
import foot3 from "../assets/foot3.jpg";
import foot4 from "../assets/foot4.jpg";
import foot5 from "../assets/foot5.jpg";
import foot6 from "../assets/foot6.jpg";
import foot7 from "../assets/foot7.jpg";
import foot8 from "../assets/foot8.jpg";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const TerrainsPage = () => {
  const [terrains, setTerrains] = useState([]); // Initialisation avec un tableau vide
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({}); // Stocke la position du slide actuel pour chaque terrain

  const images = [foot2, foot3, foot4, foot5, foot6, foot7, foot8]; // Toutes les images
  const navigate = useNavigate(); // Hook pour la redirection
  // Fonction pour récupérer les terrains depuis l'API
  const fetchTerrains = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/terrains`);
      const data = await response.json();
      if (response.ok && data.success) {
        // Lier chaque terrain aux mêmes images
        const terrainsWithImages = data.data.map((terrain) => {
          return { ...terrain, images }; // Ajout de toutes les images à chaque terrain
        });
        setTerrains(terrainsWithImages);

        // Initialiser currentSlides avec 0 pour chaque terrain
        const initialSlides = terrainsWithImages.reduce((acc, terrain) => {
          acc[terrain._id] = 0;
          return acc;
        }, {});
        setCurrentSlides(initialSlides);
      } else {
        setError("Erreur lors de la récupération des terrains.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des terrains:", error);
      setError("Erreur lors de la récupération des terrains.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    document.getElementById("image-modal").showModal();
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.getElementById("image-modal").close();
  };

  const handleNext = (terrainId, images) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [terrainId]: (prev[terrainId] + 1) % images.length,
    }));
  };

  const handlePrev = (terrainId, images) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [terrainId]: (prev[terrainId] - 1 + images.length) % images.length,
    }));
  };

  const handleSelectSlide = (terrainId, index) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [terrainId]: index,
    }));
  };
  const handleReservation = () => {
    navigate("/"); // Redirige vers l'accueil
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Nos Terrains</h1>

      {loading ? (
        <div className="text-center">
          <span className="loading loading-spinner text-primary"></span>
          <p>Chargement des terrains...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {terrains.length > 0 ? (
            terrains.map((terrain) => (
              <div
                key={terrain._id}
                className="card bg-base-100 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <figure className="h-64 relative">
                  <div className="relative w-full h-full">
                    {/* Affichage de l'image active */}
                    <img
                      src={terrain.images[currentSlides[terrain._id]]}
                      alt={`${terrain.name} Image ${
                        currentSlides[terrain._id] + 1
                      }`}
                      className="object-cover h-full w-full cursor-pointer"
                      onClick={() =>
                        openModal(terrain.images[currentSlides[terrain._id]])
                      }
                    />

                    {/* Boutons de navigation pour le carousel */}
                    <button
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                      onClick={() => handlePrev(terrain._id, terrain.images)}
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                      onClick={() => handleNext(terrain._id, terrain.images)}
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Bouton d'agrandissement */}
                    <button
                      className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full"
                      onClick={() =>
                        openModal(terrain.images[currentSlides[terrain._id]])
                      }
                    >
                      <ZoomIn size={20} />
                    </button>
                  </div>
                </figure>

                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold">
                    {terrain.name}
                  </h2>
                  <p>
                    <strong>Superficie :</strong>{" "}
                    {terrain.size || "Non spécifiée"}
                  </p>
                  <p>
                    <strong>Dimensions :</strong>{" "}
                    {terrain.dimensions || "Non spécifiées"}
                  </p>
                  <p>
                    <strong>Prix :</strong> {terrain.pricePerHour} XOF/h
                  </p>
                  <div className="card-actions mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={handleReservation}
                    >
                      Réserver
                    </button>
                  </div>
                </div>

                {/* Boutons de pagination (icônes pour naviguer entre les images) */}
                <div className="flex justify-center w-full py-2 gap-2">
                  {terrain.images.map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-xs ${
                        currentSlides[terrain._id] === index
                          ? "btn-primary"
                          : ""
                      }`}
                      onClick={() => handleSelectSlide(terrain._id, index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Aucun terrain disponible pour le moment.</p>
          )}
        </div>
      )}

      {/* Modal pour agrandir l'image */}
      <dialog id="image-modal" className="modal">
        <div className="modal-box p-0">
          {selectedImage && (
            <img src={selectedImage} alt="Image agrandie" className="w-full" />
          )}
          <div className="modal-action">
            <button className="btn btn-primary" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TerrainsPage;
