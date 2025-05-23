import type React from "react"; // 'React' import est optionnel pour React 17+ avec JSX transform
import { useRef, useState } from "react";
import GamePage from "./GamePage";
import { allLevels } from "./data";
import type { GameLevel } from "./data"; // <-- Correction ici: import type
import "./styles.css";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const navigate = useNavigate();

  const handleLevelComplete = () => {
    if (currentLevelIndex < allLevels.length - 1) {
      setCurrentLevelIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/end");
    }
  };

  const currentLevel: GameLevel | undefined = allLevels[currentLevelIndex];

  // Cette fonction ne retourne rien, elle joue juste la musique
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setMusicStarted(true))
        .catch((e) => {
          alert(`Impossible de lancer la musique : ${e.message}`);
        });
    }
  };

  if (!currentLevel) {
    return (
      <div className="app-container">
        <h1>Code Me Maybe</h1>
        <p>Chargement des niveaux...</p>
        <button type="button" onClick={() => setCurrentLevelIndex(0)}>
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <audio ref={audioRef} loop controls={false} src="/audio/Call_Me.mp3">
        <track kind="captions" />
      </audio>
      {!musicStarted && (
        <button type="button" onClick={playMusic}>
          Musique maestro!
        </button>
      )}
      <h1>Code Me Maybe</h1>
      <GamePage level={currentLevel} onLevelComplete={handleLevelComplete} />
    </div>
  );
};
export default App;
