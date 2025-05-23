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
    <div style={{ textAlign: "center" }} className="end-page-container">
      <img
        src="src/assets/images/fond header_Plan de travail 1.svg"
        alt="fond"
        className="header-wallpaper"
      />
      <img src="src/assets/images/sun.svg" alt="sun" className="homepage-sun" />
      <h2>🎉 Félicitations ! Tu as terminé le jeu ! 🎉</h2>
      <button
        type="button"
        onClick={handleGoHome}
        style={{ marginTop: "1rem" }}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

export default EndPage;
