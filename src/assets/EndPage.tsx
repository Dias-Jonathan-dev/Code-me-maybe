import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function launchConfetti(): void {
  confetti({
    particleCount: 700,
    spread: 300,
    origin: { y: 0.6 },
  });
}

function EndPage() {
  const navigate = useNavigate();

  useEffect(() => {
    launchConfetti();
  }, []); // se déclenche une seule fois au chargement

  function handleGoHome(): void {
    navigate("/");
  }

  return (
    <div
      style={{ textAlign: "center", position: "relative" }}
      className="end-page-container"
    >
      <img
        src="src/assets/images/11240811.jpg"
        alt="fond"
        className="header-wallpaper"
      />
      <img
        src="src/assets/images/sun.svg"
        alt="sun"
        className="homepage-sun"
        style={{ position: "relative", zIndex: 2 }}
      />
      <h2 style={{ position: "relative", zIndex: 2 }}>
        🎉 Félicitations ! Tu as terminé ! 🎉
      </h2>
      <button
        type="button"
        onClick={handleGoHome}
        style={{ position: "relative", zIndex: 2 }}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

export default EndPage;
