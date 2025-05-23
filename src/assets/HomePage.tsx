import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function HomePage() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/game");
  };

  useEffect(() => {
    // Ajoute une classe sur body quand HomePage monte
    document.body.classList.add("homepage-background");

    // Animation tremblement à intervalle régulier
    const interval = setInterval(() => {
      if (h1Ref.current) {
        h1Ref.current.classList.add("shake");
        setTimeout(() => {
          h1Ref.current?.classList.remove("shake");
        }, 700); // durée de l'animation (doit correspondre à la durée CSS)
      }
    }, 3000); // toutes les 3 secondes

    // Nettoyage
    return () => {
      document.body.classList.remove("homepage-background");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="homepage">
      <img
        src="src/assets/images/11240811.jpg"
        alt="fond"
        className="header-wallpaper"
      />
      <div className="homepage-text">
        <div className="homepage-bienvenue">
          {/* <img
            src="src/assets/images/sun.svg"
            alt="sun"
            className="homepage-sun"
          /> */}
          <h1 ref={h1Ref}>Code Me Maybe !</h1>
          {/* <img
            src="src/assets/images/glace.svg"
            alt="glace"
            className="homepage-ice"
          /> */}
        </div>
        <button type="button" onClick={handleClick}>
          PLAY
        </button>
      </div>
    </div>
  );
}

export default HomePage;
