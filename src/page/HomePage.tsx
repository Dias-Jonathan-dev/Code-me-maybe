import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/game");
  };

  useEffect(() => {
    // Ajoute une classe sur body quand HomePage monte
    document.body.classList.add("homepage-background");

    // Enlève la classe quand HomePage démonte
    return () => {
      document.body.classList.remove("homepage-background");
    };
  }, []);

  return (
    <div className="homepage">
     <div className="sectionbackground">
      <h1>Code Me Maybe !</h1>
        <p>Apprenez le CSS en jouant : le mémo interactif.</p>
       <p style={{ fontSize: "12pt", color: "black" }}>Par Annick, Johnathan et Camille</p>

         <button
             type="button"
             className="buttonswtich"
             onClick={handleClick}
         >
             Commencez le jeu
         </button>
     </div>
    </div>
  );
}

export default HomePage;
