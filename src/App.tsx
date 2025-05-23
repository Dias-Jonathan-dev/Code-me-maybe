import type React from "react";
import { useState } from "react";
import GamePage from "./page/GamePage.tsx";
import { allLevels } from "./data";
import type { GameLevel } from "./data"; // <-- Correction ici: import type
import "./css/styles.css";
import "./css/home.css"
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const navigate = useNavigate();

  const handleLevelComplete = () => {
    if (currentLevelIndex < allLevels.length - 1) {
      setCurrentLevelIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/end");
    }
  };

  const currentLevel: GameLevel | undefined = allLevels[currentLevelIndex];

  if (!currentLevel) {
    return (
      <div className="app-container">
        <h1>Jeu de Paires CSS</h1>
        <p>Chargement des niveaux...</p>
        <button type="button" onClick={() => setCurrentLevelIndex(0)}>
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Code me Maybe 𓆹</h1>
      <GamePage level={currentLevel} onLevelComplete={handleLevelComplete} />
    </div>
  );
};

export default App;
