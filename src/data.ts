import type { CSSProperties } from "react";

export interface DisplayOption {
  type: "name" | "visual";
  content: string;
  style: CSSProperties;
}

export interface CssPair {
  id: string;
  nameCard: DisplayOption;
  visualCard: DisplayOption;
}

export interface GameLevel {
  id: number;
  pairs: CssPair[];
  showNamesOnNameCard: boolean;
  showVisualOnNameCard: boolean;
  gridSize: number;
}

const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const allPossibleCssPairs: CssPair[] = [
  {
    id: "font-size-2em",
    nameCard: { type: "name", content: "font-size: 2em;", style: {} },
    visualCard: {
      type: "visual",
      content: "Font Size 2em",
      style: { fontSize: "2em" },
    },
  },
  {
    id: "font-weight-bold",
    nameCard: { type: "name", content: "font-weight: bold;", style: {} },
    visualCard: {
      type: "visual",
      content: "Texte Gras",
      style: { fontWeight: "bold" },
    },
  },
  {
    id: "font-style-italic",
    nameCard: { type: "name", content: "font-style: italic;", style: {} },
    visualCard: {
      type: "visual",
      content: "Texte Italique",
      style: { fontStyle: "italic" },
    },
  },
  {
    id: "color-blue",
    nameCard: { type: "name", content: "color: blue;", style: {} },
    visualCard: {
      type: "visual",
      content: "Texte Bleu",
      style: { color: "blue" },
    },
  },
  {
    id: "text-align-center",
    nameCard: { type: "name", content: "text-align: center;", style: {} },
    visualCard: {
      type: "visual",
      content: "Centré",
      style: { textAlign: "center", width: "100%" },
    },
  },
  {
    id: "padding-20px",
    nameCard: { type: "name", content: "padding: 20px;", style: {} },
    visualCard: {
      type: "visual",
      content: "Padding",
      style: { padding: "20px", border: "1px solid #ccc" },
    },
  },
  {
    id: "margin-auto",
    nameCard: { type: "name", content: "margin: auto;", style: {} },
    visualCard: {
      type: "visual",
      content: "Marges Auto",
      style: { margin: "auto", width: "80%" },
    },
  },
  {
    id: "border-2px-dashed",
    nameCard: { type: "name", content: "border: 2px dashed red;", style: {} },
    visualCard: {
      type: "visual",
      content: "Bordure Trait",
      style: { border: "2px dashed red" },
    },
  },
  {
    id: "background-color-yellow",
    nameCard: { type: "name", content: "background-color: yellow;", style: {} },
    visualCard: {
      type: "visual",
      content: "Fond Jaune",
      style: { backgroundColor: "yellow" },
    },
  },
  {
    id: "box-shadow-medium",
    nameCard: {
      type: "name",
      content: "box-shadow: 5px 5px 10px rgba(0,0,0,0.3);",
      style: {},
    },
    visualCard: {
      type: "visual",
      content: "Ombre Boîte",
      style: { boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" },
    },
  },
  {
    id: "border-radius-50p",
    nameCard: { type: "name", content: "border-radius: 50%;", style: {} },
    visualCard: {
      type: "visual",
      content: "Cercle",
      style: {
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        backgroundColor: "#add8e6",
      },
    },
  },
  {
    id: "opacity-05",
    nameCard: { type: "name", content: "opacity: 0.5;", style: {} },
    visualCard: {
      type: "visual",
      content: "Translucide",
      style: { opacity: 0.5, backgroundColor: "rgba(0, 128, 0, 0.7)" },
    },
  },
  {
    id: "display-flex",
    nameCard: { type: "name", content: "display: flex;", style: {} },
    visualCard: {
      type: "visual",
      content: "Conteneur Flex",
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid #eee",
        height: "100%",
      },
    },
  },
  {
    id: "flex-direction-column",
    nameCard: { type: "name", content: "flex-direction: column;", style: {} },
    visualCard: {
      type: "visual",
      content: "Flex Colonne",
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid #eee",
        height: "100%",
      },
    },
  },
  {
    id: "justify-content-center",
    nameCard: { type: "name", content: "justify-content: center;", style: {} },
    visualCard: {
      type: "visual",
      content: "Justify Center",
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #eee",
        height: "100%",
      },
    },
  },
  {
    id: "align-items-center",
    nameCard: { type: "name", content: "align-items: center;", style: {} },
    visualCard: {
      type: "visual",
      content: "Align Center",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        border: "1px solid #eee",
        height: "100%",
      },
    },
  },
  {
    id: "text-decoration-underline",
    nameCard: {
      type: "name",
      content: "text-decoration: underline;",
      style: {},
    },
    visualCard: {
      type: "visual",
      content: "Souligné",
      style: { textDecoration: "underline" },
    },
  },
  {
    id: "text-transform-uppercase",
    nameCard: {
      type: "name",
      content: "text-transform: uppercase;",
      style: {},
    },
    visualCard: {
      type: "visual",
      content: "MAJUSCULES",
      style: { textTransform: "uppercase" },
    },
  },
  {
    id: "position-relative",
    nameCard: { type: "name", content: "position: relative;", style: {} },
    visualCard: {
      type: "visual",
      content: "Relative",
      style: {
        position: "relative",
        top: "10px",
        left: "10px",
        backgroundColor: "#ccffcc",
        border: "1px dashed green",
      },
    },
  },
  {
    id: "position-absolute",
    nameCard: { type: "name", content: "position: absolute;", style: {} },
    visualCard: {
      type: "visual",
      content: "Absolue",
      style: {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#ffcccc",
        border: "1px dashed red",
      },
    },
  },
  {
    id: "z-index-high",
    nameCard: { type: "name", content: "z-index: 10;", style: {} },
    visualCard: {
      type: "visual",
      content: "Z-Index Élevé",
      style: {
        position: "relative",
        zIndex: 10,
        backgroundColor: "#f0f0f0",
        border: "1px dashed black",
      },
    },
  },
  {
    id: "overflow-hidden",
    nameCard: { type: "name", content: "overflow: hidden;", style: {} },
    visualCard: {
      type: "visual",
      content: "Débordement Caché",
      style: {
        width: "80px",
        height: "30px",
        overflow: "hidden",
        border: "1px solid grey",
        whiteSpace: "nowrap",
      },
    },
  },
  {
    id: "width-50p",
    nameCard: { type: "name", content: "width: 50%;", style: {} },
    visualCard: {
      type: "visual",
      content: "Largeur 50%",
      style: {
        width: "50%",
        backgroundColor: "#ffe0b2",
        border: "1px solid orange",
      },
    },
  },
  {
    id: "height-80px",
    nameCard: { type: "name", content: "height: 80px;", style: {} },
    visualCard: {
      type: "visual",
      content: "Hauteur 80px",
      style: {
        height: "80px",
        backgroundColor: "#b2e0ff",
        border: "1px solid blue",
      },
    },
  },
  {
    id: "cursor-grab",
    nameCard: { type: "name", content: "cursor: grab;", style: {} },
    visualCard: {
      type: "visual",
      content: "Curseur Grabbing",
      style: {
        cursor: "grab",
        backgroundColor: "#f0f8ff",
        border: "1px solid #ddd",
      },
    },
  },
  {
    id: "transform-scale-12",
    nameCard: { type: "name", content: "transform: scale(1.2);", style: {} },
    visualCard: {
      type: "visual",
      content: "Agrandir",
      style: { transform: "scale(1.2)", backgroundColor: "#e0ffe0" },
    },
  },
  {
    id: "background-image",
    nameCard: {
      type: "name",
      content: "background-image: linear-gradient(...);",
      style: {},
    },
    visualCard: {
      type: "visual",
      content: "Dégradé",
      style: {
        backgroundImage: "linear-gradient(to right, red, orange)",
        width: "100%",
        height: "100%",
      },
    },
  },
  {
    id: "box-sizing-border-box",
    nameCard: { type: "name", content: "box-sizing: border-box;", style: {} },
    visualCard: {
      type: "visual",
      content: "Box Sizing",
      style: {
        width: "80px",
        height: "80px",
        padding: "10px",
        border: "5px solid green",
        boxSizing: "border-box",
        backgroundColor: "#ccffcc",
      },
    },
  },
  {
    id: "text-shadow",
    nameCard: {
      type: "name",
      content: "text-shadow: 2px 2px 4px black;",
      style: {},
    },
    visualCard: {
      type: "visual",
      content: "Ombre Texte",
      style: {
        textShadow: "2px 2px 4px black",
        color: "white",
        backgroundColor: "transparent",
      },
    },
  },
  {
    id: "transition-all-1s",
    nameCard: { type: "name", content: "transition: all 1s ease;", style: {} },
    visualCard: {
      type: "visual",
      content: "Transition (hover)",
      style: { backgroundColor: "lightcoral", transition: "all 1s ease" },
    },
  },
  {
    id: "flex-wrap-wrap",
    nameCard: { type: "name", content: "flex-wrap: wrap;", style: {} },
    visualCard: {
      type: "visual",
      content: "Flex Wrap",
      style: {
        display: "flex",
        flexWrap: "wrap",
        border: "1px dashed blue",
        width: "100%",
        height: "100%",
      },
    },
  },
  {
    id: "align-self-end",
    nameCard: { type: "name", content: "align-self: flex-end;", style: {} },
    visualCard: {
      type: "visual",
      content: "Align Self End",
      style: {
        display: "flex",
        alignItems: "flex-start",
        border: "1px dashed purple",
        width: "100%",
        height: "100%",
      },
    },
  },
  {
    id: "outline-2px-solid",
    nameCard: {
      type: "name",
      content: "outline: 2px solid orange;",
      style: {},
    },
    visualCard: {
      type: "visual",
      content: "Contour Orange",
      style: { outline: "2px solid orange", outlineOffset: "3px" },
    },
  },
  {
    id: "text-overflow-ellipsis",
    nameCard: { type: "name", content: "text-overflow: ellipsis;", style: {} },
    visualCard: {
      type: "visual",
      content: "Tronqué...",
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "80%",
        border: "1px solid #aaa",
      },
    },
  },
];

function getUniquePairs(sourcePairs: CssPair[], count: number): CssPair[] {
  if (count > sourcePairs.length) {
    console.warn(
      `Not enough unique CSS pairs available for ${count} pairs. Only ${sourcePairs.length} pairs exist.`,
    );
    return shuffleArray([...sourcePairs]);
  }
  return shuffleArray([...sourcePairs]).slice(0, count);
}

export const allLevels: GameLevel[] = [];

allLevels.push({
  id: 1,
  pairs: getUniquePairs(allPossibleCssPairs, 4),
  showNamesOnNameCard: true,
  showVisualOnNameCard: false,
  gridSize: 3,
});

allLevels.push({
  id: 2,
  pairs: getUniquePairs(allPossibleCssPairs, 6),
  showNamesOnNameCard: true,
  showVisualOnNameCard: false,
  gridSize: 4,
});

allLevels.push({
  id: 3,
  pairs: getUniquePairs(allPossibleCssPairs, 8),
  showNamesOnNameCard: true,
  showVisualOnNameCard: true,
  gridSize: 4,
});

allLevels.push({
  id: 4,
  pairs: getUniquePairs(allPossibleCssPairs, 10),
  showNamesOnNameCard: true,
  showVisualOnNameCard: true,
  gridSize: 5,
});

allLevels.push({
  id: 5,
  pairs: getUniquePairs(allPossibleCssPairs, 12),
  showNamesOnNameCard: false,
  showVisualOnNameCard: true,
  gridSize: 5,
});

allLevels.push({
  id: 6,
  pairs: getUniquePairs(allPossibleCssPairs, 15),
  showNamesOnNameCard: false,
  showVisualOnNameCard: true,
  gridSize: 6,
});

allLevels.push({
  id: 7,
  pairs: getUniquePairs(allPossibleCssPairs, 18),
  showNamesOnNameCard: false,
  showVisualOnNameCard: true,
  gridSize: 6,
});

allLevels.push({
  id: 8,
  pairs: getUniquePairs(allPossibleCssPairs, 20),
  showNamesOnNameCard: false,
  showVisualOnNameCard: true,
  gridSize: 7,
});

allLevels.push({
  id: 9,
  pairs: getUniquePairs(allPossibleCssPairs, 22),
  showNamesOnNameCard: false,
  showVisualOnNameCard: true,
  gridSize: 7,
});

allLevels.push({
  id: 10,
  pairs: getUniquePairs(allPossibleCssPairs, 25),
  showNamesOnNameCard: false,
  showVisualOnNameCard: true,
  gridSize: 8,
});
