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

        cards.push({
            originalId: pair.id,
            uniqueId: `${pair.id}-visual-${index}-${Math.random()}`,
            display: pair.visualCard,
            isFlipped: false,
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
        console.log("useEffect triggered for flippedCards. Length:", flippedCards.length);
        if (flippedCards.length === 2) {
            setIsChecking(true);
            const [index1, index2] = flippedCards;
            const card1 = cards[index1];
            const card2 = cards[index2];

            console.log("Comparing cards:", {
                card1Id: card1.originalId,
                card1UniqueId: card1.uniqueId,
                card2Id: card2.originalId,
                card2UniqueId: card2.uniqueId,
            });

            if (card1.originalId === card2.originalId && card1.uniqueId !== card2.uniqueId) {
                console.log("Match found!");
                setCards((prevCards) =>
                    prevCards.map((card, idx) =>
                        idx === index1 || idx === index2 ? { ...card, isMatched: true } : card
                    )
                );
                setMatchesFound((prev) => prev + 1);
                setFlippedCards([]);
                setIsChecking(false);
            } else {
                console.log("No match.");
                timeoutRef.current = setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card, idx) =>
                            idx === index1 || idx === index2 ? { ...card, isFlipped: false } : card
                        )
                    );
                    setFlippedCards([]);
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
        if (isChecking || cards[index].isFlipped || cards[index].isMatched) {
            console.log("Card click ignored:", {
                index,
                isChecking,
                isFlipped: cards[index].isFlipped,
                isMatched: cards[index].isMatched,
                flippedCardsLength: flippedCards.length
            });
            return;
        }

        setCards((prevCards) =>
            prevCards.map((card, idx) =>
                idx === index ? { ...card, isFlipped: true } : card
            )
        );
        setFlippedCards((prevFlipped) => {
            const newFlipped = [...prevFlipped, index];
            console.log("Flipped cards updated:", newFlipped);
            return newFlipped;
        });
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
                        isFlipped={card.isFlipped || card.isMatched}
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