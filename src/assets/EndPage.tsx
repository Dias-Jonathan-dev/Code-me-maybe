import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function launchConfetti(): void {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function EndPage(): JSX.Element {
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameFinished) {
      launchConfetti();
    }
  }, [gameFinished]);

  function handleGameEnd(): void {
    setGameFinished(true);
  }

  function handleGoHome(): void {
    navigate("/");
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {!gameFinished ? (
        <button type="button" onClick={handleGameEnd}>
          Terminer le jeu
        </button>
      ) : (
        <div>
          <h2>🎉 Félicitations ! Tu as terminé le jeu ! 🎉</h2>
          <button
            type="button"
            onClick={handleGoHome}
            style={{ marginTop: "1rem" }}
          >
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}

export default EndPage;
