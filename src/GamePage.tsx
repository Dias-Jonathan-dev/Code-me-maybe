// src/GamePage.tsx

import React, { useState, useEffect } from 'react';
import Card from './Card';
import type { GameLevel, CssPair, DisplayOption } from './data'; // Ajout du mot-clé 'type'
import './styles.css';

interface GamePageProps {
    level: GameLevel;
    onLevelComplete: () => void;
}

// État local pour chaque instance de carte dans la grille
interface GridCardState {
    originalId: string; // L'ID de la paire à laquelle cette carte appartient
    uniqueId: string;   // ID unique pour cette carte dans la grille
    display: DisplayOption; // Ce qui est affiché sur cette carte
    isFlipped: boolean;
    isMatched: boolean;
}

// Fonction utilitaire pour générer les cartes pour un niveau
const generateLevelCards = (level: GameLevel): GridCardState[] => {
    const cards: GridCardState[] = [];
    const pairsToUse = level.pairs;

    pairsToUse.forEach((pair, index) => {
        // Carte pour le nom de la propriété CSS
        cards.push({
            originalId: pair.id,
            uniqueId: `${pair.id}-name-${index}-${Math.random()}`,
            display: {
                type: 'name',
                content: level.showNamesOnNameCard ? pair.nameCard.content : '',
                style: level.showVisualOnNameCard ? pair.visualCard.style : pair.nameCard.style,
            },
            isFlipped: false,
            isMatched: false,
        });

        // Carte pour la représentation visuelle
        cards.push({
            originalId: pair.id,
            uniqueId: `${pair.id}-visual-${index}-${Math.random()}`,
            display: pair.visualCard,
            isFlipped: false,
            isMatched: false,
        });
    });

    // Mélanger toutes les cartes avant de les retourner
    return shuffleArray(cards);
};

// Fonction utilitaire pour mélanger un tableau (à garder ici ou dans data.ts si elle est commune)
const shuffleArray = <T>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};


const GamePage: React.FC<GamePageProps> = ({ level, onLevelComplete }) => {
    const [cards, setCards] = useState<GridCardState[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]); // Indices des cartes retournées
    const [matchesFound, setMatchesFound] = useState(0); // Compteur de paires trouvées
    const [isChecking, setIsChecking] = useState(false); // Pour empêcher de cliquer pendant la vérification

    // Réinitialiser les cartes quand le niveau change
    useEffect(() => {
        setCards(generateLevelCards(level)); // Utilisez la fonction de génération
        setFlippedCards([]);
        setMatchesFound(0);
    }, [level]);

    // Effet pour vérifier les paires lorsque deux cartes sont retournées
    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            const [index1, index2] = flippedCards;
            const card1 = cards[index1];
            const card2 = cards[index2];

            // Vérifier si les originalId correspondent (c'est la condition de paire)
            // Et s'assurer qu'elles ne sont pas la même carte cliquée deux fois
            if (card1.originalId === card2.originalId && card1.uniqueId !== card2.uniqueId) {
                // Paires trouvées
                setCards((prevCards) =>
                    prevCards.map((card, idx) =>
                        idx === index1 || idx === index2 ? { ...card, isMatched: true } : card
                    )
                );
                setMatchesFound((prev) => prev + 1);
            }

            // Attendre un peu avant de retourner les cartes ou de passer au suivant
            const timer = setTimeout(() => {
                setCards((prevCards) =>
                    prevCards.map((card, idx) =>
                        idx === index1 || idx === index2 ? { ...card, isFlipped: false } : card
                    )
                );
                setFlippedCards([]);
                setIsChecking(false);
            }, 1200); // 1.2 secondes pour voir les cartes

            return () => clearTimeout(timer);
        }
    }, [flippedCards, cards]); // Dépendances mises à jour

    // Effet pour vérifier si toutes les paires ont été trouvées
    useEffect(() => {
        // Le nombre total de cartes est level.pairs.length * 2
        // Donc le nombre de paires à trouver est (level.pairs.length * 2) / 2 = level.pairs.length
        if (matchesFound > 0 && matchesFound === level.pairs.length) {
            // Toutes les paires trouvées, passer au niveau suivant
            setTimeout(() => {
                onLevelComplete();
            }, 1500); // Laisser un petit délai pour voir la dernière paire
        }
    }, [matchesFound, level.pairs.length, onLevelComplete]);

    const handleCardClick = (index: number) => {
        if (isChecking || cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) {
            return; // Ne rien faire si on est en train de vérifier, si la carte est déjà retournée ou trouvée, ou si deux cartes sont déjà retournées
        }

        setCards((prevCards) =>
            prevCards.map((card, idx) =>
                idx === index ? { ...card, isFlipped: true } : card
            )
        );
        setFlippedCards((prevFlipped) => [...prevFlipped, index]);
    };

    const gridSizeStyle = {
        gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil((level.pairs.length * 2) / level.gridSize)}, 1fr)`, // Ajustement pour le nombre de lignes
    };


    return (
        <div className="game-page">
            <h2>Niveau {level.id}</h2>
            <p>Paires trouvées: {matchesFound} / {level.pairs.length}</p>
            <div className="grid-container" style={gridSizeStyle}>
                {cards.map((card, index) => (
                    <Card
                        key={card.uniqueId}
                        cardId={card.originalId} // Passe l'ID de la paire pour le rendu visuel
                        display={card.display} // Passe l'objet display qui contient le type et le contenu/style
                        isFlipped={card.isFlipped || card.isMatched}
                        isMatched={card.isMatched}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
                {/* Ajouter des cartes vides si le nombre de cartes n'est pas un multiple de gridSize*gridSize */}
                {Array.from({ length: (level.gridSize * Math.ceil((level.pairs.length * 2) / level.gridSize)) - (level.pairs.length * 2) }).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-card"></div>
                ))}
            </div>
        </div>
    );
};

export default GamePage;