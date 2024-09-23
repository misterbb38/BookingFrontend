import backgroundImage from "../assets/foot1.jpg"; // Importer l'image

const Hero = () => {
  return (
    <div
      className="w-full h-[500px] bg-cover bg-center flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Utiliser l'image importée
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">
          Réservez votre terrain de mini foot dès maintenant!
        </h1>
        <p className="text-lg">
          Profitez des meilleurs terrains de mini foot pour des parties
          inoubliables entre amis !
        </p>
      </div>
    </div>
  );
};

export default Hero;
