import type React from "react";
import { useState } from "react";
import GamePage from "./GamePage";
import { allLevels } from "./data";
import type { GameLevel } from "./data";
import "./styles.css";

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const handleLevelComplete = () => {
    if (currentLevelIndex < allLevels.length - 1) {
      setCurrentLevelIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("Félicitations ! Vous avez terminé tous les niveaux !");
      setCurrentLevelIndex(0);
    }
  };

  const currentLevel: GameLevel | undefined = allLevels[currentLevelIndex];

  if (!currentLevel) {
    return (
      <div className="app-container">
        <h1>Code Me Maybe</h1>
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
      <h1>Code Me Maybe</h1>
      <GamePage level={currentLevel} onLevelComplete={handleLevelComplete} />
    </div>
  );
};

export default App;
