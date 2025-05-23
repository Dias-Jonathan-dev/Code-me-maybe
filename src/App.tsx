import type React from "react"; // 'React' import est optionnel pour React 17+ avec JSX transform
import { useState } from "react";
import GamePage from "./GamePage";
import { allLevels } from "./data";
import type { GameLevel } from "./data"; // <-- Correction ici: import type
import "./styles.css";
import { Navigate, useNavigate } from "react-router-dom";

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
        {/* CORRECTION: Ajout de type="button" */}
        <button type="button" onClick={() => setCurrentLevelIndex(0)}>
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Jeu de Paires CSS</h1>
      <GamePage level={currentLevel} onLevelComplete={handleLevelComplete} />
    </div>
  );
};

export default App;
