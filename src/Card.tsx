// src/Card.tsx
import type React from "react";
import type { DisplayOption } from "./data";
import "./styles.css";

interface CardProps {
  cardId: string;
  display: DisplayOption;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

// Fonction utilitaire pour rendre le contenu visuel en fonction du cardId
const renderVisualContent = (cardId: string) => {
  const visualElements: Record<string, React.ReactNode> = {
    "font-size-2em": <span style={{ fontSize: "2em" }}>Texte Grand</span>,
    "font-weight-bold": <span style={{ fontWeight: "bold" }}>Texte Gras</span>,
    "font-style-italic": (
      <em style={{ fontStyle: "italic" }}>Texte Italique</em>
    ),
    "color-blue": <span style={{ color: "blue" }}>Texte Bleu</span>,
    "text-align-center": (
      <div style={{ textAlign: "center", width: "100%" }}>Centré</div>
    ),
    "padding-20px": (
      <div
        className="visual-box"
        style={{ padding: "20px", border: "1px solid #ccc" }}
      >
        Padding
      </div>
    ),
    "margin-auto": (
      <div className="visual-box visual-margin-auto">Marge Auto</div>
    ),
    "border-2px-dashed": (
      <div className="visual-box" style={{ border: "2px dashed red" }}>
        Bordure
      </div>
    ),
    "background-color-yellow": (
      <div className="visual-full-box" style={{ backgroundColor: "yellow" }} />
    ),
    "box-shadow-medium": <div className="visual-box visual-box-shadow" />,
    "border-radius-50p": (
      <div className="visual-circle" style={{ backgroundColor: "#add8e6" }} />
    ),
    "opacity-05": (
      <div
        className="visual-full-box"
        style={{ opacity: 0.5, backgroundColor: "rgba(0, 128, 0, 0.7)" }}
      />
    ),
    "display-flex": (
      <div className="visual-flex-container">
        <div className="flex-item">1</div>
        <div className="flex-item">2</div>
      </div>
    ),
    "flex-direction-column": (
      <div className="visual-flex-container visual-flex-column">
        <div className="flex-item">1</div>
        <div className="flex-item">2</div>
      </div>
    ),
    "justify-content-center": (
      <div className="visual-flex-container visual-justify-center">
        <div className="flex-item">Contenu</div>
      </div>
    ),
    "align-items-center": (
      <div className="visual-flex-container visual-align-center">
        <div className="flex-item">Contenu</div>
      </div>
    ),
    "text-decoration-underline": (
      <span style={{ textDecoration: "underline" }}>Texte Souligné</span>
    ),
    "text-transform-uppercase": (
      <span style={{ textTransform: "uppercase" }}>MAJUSCULES</span>
    ),
    "position-relative": (
      <div className="visual-positioned-box visual-relative">Relative</div>
    ),
    "position-absolute": (
      <div className="visual-positioned-box visual-absolute">Absolue</div>
    ),
    "z-index-high": (
      <div className="visual-positioned-box visual-z-index-high">Z-Index</div>
    ),
    "overflow-hidden": (
      <div className="visual-overflow-box" style={{ overflow: "hidden" }}>
        Texte très long qui doit être coupé...
      </div>
    ),
    "width-50p": (
      <div className="visual-width-box" style={{ width: "50%" }}>
        Largeur 50%
      </div>
    ),
    "height-80px": (
      <div className="visual-height-box" style={{ height: "80px" }}>
        Hauteur 80px
      </div>
    ),
    "cursor-grab": (
      <div className="visual-full-box" style={{ cursor: "grab" }}>
        Déplacez-moi
      </div>
    ),
    "transform-scale-12": (
      <div
        className="visual-box"
        style={{ transform: "scale(1.2)", backgroundColor: "#e0ffe0" }}
      >
        Agrandir
      </div>
    ),
    "background-image": (
      <div
        className="visual-full-box"
        style={{
          backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
        }}
      />
    ),
    "box-sizing-border-box": (
      <div
        className="visual-box"
        style={{
          width: "80px",
          height: "80px",
          padding: "10px",
          border: "5px solid green",
          boxSizing: "border-box",
          backgroundColor: "#ccffcc",
        }}
      >
        BB
      </div>
    ),
    "text-shadow": (
      <span style={{ textShadow: "2px 2px 4px black", color: "white" }}>
        Ombre Texte
      </span>
    ),
    "transition-all-1s": (
      <div
        className="visual-box hover-effect"
        style={{
          transition: "all 1s ease",
          width: "80%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Hover Moi
      </div>
    ),
    "flex-wrap-wrap": (
      <div className="visual-flex-container visual-flex-wrap">
        <div className="flex-item">1</div>
        <div className="flex-item">2</div>
        <div className="flex-item">3</div>
        <div className="flex-item">4</div>
      </div>
    ),
    "align-self-end": (
      <div className="visual-flex-container visual-align-self-parent">
        <div className="flex-item">Start</div>
        <div className="flex-item visual-align-self-child">End</div>
      </div>
    ),
    "outline-2px-solid": (
      <div
        className="visual-box"
        style={{ outline: "2px solid orange", outlineOffset: "3px" }}
      >
        Contour
      </div>
    ),
    "text-overflow-ellipsis": (
      <div className="visual-overflow-ellipsis-box">
        Ceci est un texte très long qui devrait être tronqué avec des points de
        suspension à la fin.
      </div>
    ),
  };

  return visualElements[cardId] || null;
};

const Card: React.FC<CardProps> = ({
  cardId,
  display,
  isFlipped,
  isMatched,
  onClick,
}) => {
  const cardClassName = `card ${isFlipped || isMatched ? "flipped" : ""} ${
    isMatched ? "matched" : ""
  }`;

  const renderCardContent = () => {
    // Si la prop 'display' est undefined ou null (ce qui peut arriver avec l'erreur "display is undefined")
    if (!display) {
      return null;
    }

    // Si la carte est de type 'name' et qu'elle doit afficher un style visuel (niveau 3+)
    if (display.type === "name" && Object.keys(display.style).length > 0) {
      return (
        <div className="card-visual-content" style={display.style}>
          <div className="card-name-overlay">{display.content || ""}</div>
          {renderVisualContent(cardId)}{" "}
          {/* Utilisation de la fonction utilitaire */}
        </div>
      );
    }
    // Si la carte est de type 'name' sans style visuel (niveaux 1 et 2)
    if (display.type === "name") {
      return (
        <div className="card-name-content" style={display.style}>
          {display.content || ""}
        </div>
      );
    }
    // Si la carte est de type 'visual'
    return (
      <div className="card-visual-content" style={display.style}>
        {renderVisualContent(cardId)}{" "}
        {/* Utilisation de la fonction utilitaire */}
      </div>
    );
  };

  return (
    <div
      className={cardClassName}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="card-inner">
        <div className="card-front" />
        <div
          className="card-back"
          // Applique le style de display.style à la face arrière
          // Ceci est important pour les cartes 'visual' ou les cartes 'name' avec style visuel
          style={display.style}
        >
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
};

export default Card;
