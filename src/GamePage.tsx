// src/GamePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import type { GameLevel, DisplayOption } from './data';
import './styles.css';

interface GamePageProps {
    level: GameLevel;
    onLevelComplete: () => void;
}

interface GridCardState {
    originalId: string;
    uniqueId: string;
    display: DisplayOption;
    isFlipped: boolean;
    isMatched: boolean;
}

const shuffleArray = <T>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

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
            isFlipped: true, // La carte "nom" est Flipped par défaut (visible)
            isMatched: false,
        });

        // Carte pour la représentation visuelle
        cards.push({
            originalId: pair.id,
            uniqueId: `${pair.id}-visual-${index}-${Math.random()}`,
            display: pair.visualCard,
            isFlipped: false, // La carte "visuelle" n'est PAS flipped par défaut (face cachée)
            isMatched: false,
        });
    });

    return shuffleArray(cards);
};

const GamePage: React.FC<GamePageProps> = ({ level, onLevelComplete }) => {
    const [cards, setCards] = useState<GridCardState[]>(() => generateLevelCards(level));
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchesFound, setMatchesFound] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setCards(generateLevelCards(level));
        setFlippedCards([]);
        setMatchesFound(0);
        setIsChecking(false);
    }, [level]);

    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            const [index1, index2] = flippedCards;
            const card1 = cards[index1];
            const card2 = cards[index2];

            // S'assurer que l'une est une carte 'name' et l'autre une carte 'visual'
            const isNameCard1 = card1.display.type === 'name';
            const isNameCard2 = card2.display.type === 'name';

            let matched = false;
            // Une paire est valide si une est 'name', l'autre 'visual', et leurs originalId correspondent
            if (
                (isNameCard1 && !isNameCard2 && card1.originalId === card2.originalId) ||
                (!isNameCard1 && isNameCard2 && card1.originalId === card2.originalId)
            ) {
                matched = true;
            }

            if (matched) {
                setCards((prevCards) =>
                    prevCards.map((card, idx) =>
                        idx === index1 || idx === index2 ? { ...card, isMatched: true } : card
                    )
                );
                setMatchesFound((prev) => prev + 1);
                setFlippedCards([]); // Réinitialise les cartes sélectionnées
                setIsChecking(false);
            } else {
                timeoutRef.current = setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card, idx) => {
                            // Si la carte n'est PAS une carte 'name' et n'est PAS matched, la retourner
                            // Cela signifie que seules les cartes 'visual' non-matched se retournent.
                            if ((idx === index1 || idx === index2) && card.display.type !== 'name' && !card.isMatched) {
                                return { ...card, isFlipped: false };
                            }
                            return card;
                        })
                    );
                    setFlippedCards([]); // Réinitialise les cartes sélectionnées
                    setIsChecking(false);
                }, 1200);
            }
        }
    }, [flippedCards, cards]);

    useEffect(() => {
        if (matchesFound > 0 && matchesFound === level.pairs.length) {
            timeoutRef.current = setTimeout(() => {
                onLevelComplete();
            }, 1500);
        }
    }, [matchesFound, level.pairs.length, onLevelComplete]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCardClick = (index: number) => {
        const clickedCard = cards[index];

        // Empêcher le clic si une vérification est en cours
        if (isChecking) {
            return;
        }

        // Empêcher le clic si la carte est déjà trouvée
        if (clickedCard.isMatched) {
            return;
        }

        // Empêcher de cliquer une carte déjà retournée (sauf si elle est déjà dans flippedCards et qu'on reclique dessus)
        // Nous voulons permettre de cliquer sur les cartes "name" (qui sont isFlipped par défaut)
        // mais seulement si elles ne sont pas déjà dans la liste des cartes retournées pour cette tentative de paire.
        if (flippedCards.includes(index)) { // Si la carte est déjà dans flippedCards (cliquée une première fois)
            return; // Ne rien faire, elle est déjà sélectionnée
        }


        // Si c'est la première carte cliquée (aucun flippedCards)
        if (flippedCards.length === 0) {
            // Si c'est une carte 'name' qui est déjà flipped, on l'ajoute directement à flippedCards.
            // Si c'est une carte 'visual' qui n'est pas flipped, on la retourne et on l'ajoute.
            setCards((prevCards) =>
                prevCards.map((card, idx) =>
                    idx === index && card.display.type === 'visual' ? { ...card, isFlipped: true } : card // Ne retourner visuellement que les cartes 'visual'
                )
            );
            setFlippedCards([index]);
        }
        // Si c'est la deuxième carte cliquée
        else if (flippedCards.length === 1) {
            const firstFlippedIndex = flippedCards[0];
            const firstFlippedCard = cards[firstFlippedIndex];

            // Empêcher de cliquer la même carte deux fois
            if (index === firstFlippedIndex) {
                return;
            }

            // Vérifier que la première carte est une carte "name" ET la deuxième une "visual"
            // OU la première est une "visual" ET la deuxième une "name"
            const isFirstName = firstFlippedCard.display.type === 'name';
            const isClickedName = clickedCard.display.type === 'name';

            if ( (isFirstName && !isClickedName) || (!isFirstName && isClickedName) ) {
                // C'est une combinaison valide (name/visual ou visual/name)
                setCards((prevCards) =>
                    prevCards.map((card, idx) =>
                        idx === index ? { ...card, isFlipped: true } : card // Retourner la deuxième carte cliquée (qu'elle soit name ou visual)
                    )
                );
                setFlippedCards((prevFlipped) => [...prevFlipped, index]);
            } else {
                // Clic sur deux cartes du même type (ex: deux 'name' ou deux 'visual') sans correspondance immédiate.
                // On pourrait ajouter un feedback visuel ici si souhaité.
                // Pour l'instant, on réinitialise simplement pour forcer un nouveau choix après un délai.
                // Mais pour la logique, on va juste ignorer ce clic ou le laisser être traité par le setTimeout s'il y a 2 cartes de ce type
                // Le cas le plus simple est de réinitialiser et laisser l'utilisateur rechoisir.
                // Ou bien de gérer ce cas spécifique comme un "non-match" et de ne retourner que la carte visual.
                // Laissons le useEffect gérer le non-match après l'ajout à flippedCards.
                setCards((prevCards) =>
                    prevCards.map((card, idx) =>
                        idx === index ? { ...card, isFlipped: true } : card // Retourner la deuxième carte pour qu'elle soit visible pendant la vérification
                    )
                );
                setFlippedCards((prevFlipped) => [...prevFlipped, index]);
            }
        }
    };


    const gridSizeStyle = {
        gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil((level.pairs.length * 2) / level.gridSize)}, 1fr)`,
    };

    return (
        <div className="game-page">
            <h2>Niveau {level.id}</h2>
            <p>Paires trouvées: {matchesFound} / {level.pairs.length}</p>
            <div className="grid-container" style={gridSizeStyle}>
                {cards.map((card, index) => (
                    <Card
                        key={card.uniqueId}
                        cardId={card.originalId}
                        display={card.display}
                        isFlipped={card.isFlipped}
                        isMatched={card.isMatched}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
                {Array.from({ length: (level.gridSize * Math.ceil((level.pairs.length * 2) / level.gridSize)) - (level.pairs.length * 2) }).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-card"></div>
                ))}
            </div>
        </div>
    );
};

export default GamePage;