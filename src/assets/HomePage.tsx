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
      <img
        src="src/assets/images/fond header_Plan de travail 1.svg"
        alt="fond"
        className="header-wallpaper"
      />
      <div className="homepage-text">
        <div className="homepage-bienvenue">
          <img
            src="src/assets/images/sun.svg"
            alt="sun"
            className="homepage-sun"
          />
          <h1>Code Me Maybe !</h1>
          <img
            src="src/assets/images/glace.svg"
            alt="glace"
            className="homepage-ice"
          />
        </div>
        <button type="button" onClick={handleClick}>
          Start
        </button>
      </div>
      <footer>Made with love</footer>
    </div>
  );
}

export default HomePage;
