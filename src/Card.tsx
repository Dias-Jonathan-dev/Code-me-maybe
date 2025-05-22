// src/Card.tsx

import React from 'react';
import type { DisplayOption } from './data'; // Ajout du mot-clé 'type'
import './styles.css';

interface CardProps {
    cardId: string; // L'ID original de la paire pour la correspondance
    display: DisplayOption; // Ce qui doit être affiché sur cette carte
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ cardId, display, isFlipped, isMatched, onClick }) => {
    const cardClassName = `card ${isFlipped || isMatched ? 'flipped' : ''} ${
        isMatched ? 'matched' : ''
    }`;

    // Helper pour rendre le contenu visuel en fonction du type de carte
    const renderCardContent = () => {
        if (display.type === 'name') {
            // Pour une carte "nom"
            return (
                <div className="card-name-content" style={display.style}>
                    {display.content || ''} {/* Affiche le nom ou rien si vide */}
                </div>
            );
        } else {
            // Pour une carte "visuel"
            return (
                <div className="card-visual-content"> {/* Le style de display.style est appliqué ici */}
                    {/* Rendu des éléments DOM réels qui montrent l'effet CSS */}
                    {cardId === 'font-size-2em' && <span style={{ fontSize: '2em' }}>Texte Grand</span>}
                    {cardId === 'font-weight-bold' && <span style={{ fontWeight: 'bold' }}>Texte Gras</span>}
                    {cardId === 'font-style-italic' && <em style={{ fontStyle: 'italic' }}>Texte Italique</em>}
                    {cardId === 'color-blue' && <span style={{ color: 'blue' }}>Texte Bleu</span>}
                    {cardId === 'text-align-center' && <div style={{ textAlign: 'center', width: '100%' }}>Centré</div>}
                    {cardId === 'padding-20px' && <div className="visual-box" style={{ padding: '20px', border: '1px solid #ccc' }}>Padding</div>}
                    {cardId === 'margin-auto' && <div className="visual-box visual-margin-auto">Marge Auto</div>}
                    {cardId === 'border-2px-dashed' && <div className="visual-box" style={{ border: '2px dashed red' }}>Bordure</div>}
                    {cardId === 'background-color-yellow' && <div className="visual-full-box" style={{ backgroundColor: 'yellow' }}></div>}
                    {cardId === 'box-shadow-medium' && <div className="visual-box visual-box-shadow"></div>}
                    {cardId === 'border-radius-50p' && <div className="visual-circle" style={{ backgroundColor: '#add8e6' }}></div>}
                    {cardId === 'opacity-05' && <div className="visual-full-box" style={{ opacity: 0.5, backgroundColor: 'rgba(0, 128, 0, 0.7)' }}></div>}
                    {cardId === 'display-flex' && (
                        <div className="visual-flex-container">
                            <div className="flex-item">1</div><div className="flex-item">2</div>
                        </div>
                    )}
                    {cardId === 'flex-direction-column' && (
                        <div className="visual-flex-container visual-flex-column">
                            <div className="flex-item">1</div><div className="flex-item">2</div>
                        </div>
                    )}
                    {cardId === 'justify-content-center' && (
                        <div className="visual-flex-container visual-justify-center">
                            <div className="flex-item">Contenu</div>
                        </div>
                    )}
                    {cardId === 'align-items-center' && (
                        <div className="visual-flex-container visual-align-center">
                            <div className="flex-item">Contenu</div>
                        </div>
                    )}
                    {cardId === 'text-decoration-underline' && <span style={{ textDecoration: 'underline' }}>Texte Souligné</span>}
                    {cardId === 'text-transform-uppercase' && <span style={{ textTransform: 'uppercase' }}>MAJUSCULES</span>}
                    {cardId === 'position-relative' && <div className="visual-positioned-box visual-relative">Relative</div>}
                    {cardId === 'position-absolute' && <div className="visual-positioned-box visual-absolute">Absolue</div>}
                    {cardId === 'z-index-high' && <div className="visual-positioned-box visual-z-index-high">Z-Index</div>}
                    {cardId === 'overflow-hidden' && <div className="visual-overflow-box" style={{ overflow: 'hidden' }}>Texte très long qui doit être coupé...</div>}
                    {cardId === 'width-50p' && <div className="visual-width-box" style={{ width: '50%' }}>Largeur 50%</div>}
                    {cardId === 'height-80px' && <div className="visual-height-box" style={{ height: '80px' }}>Hauteur 80px</div>}
                    {cardId === 'cursor-grab' && <div className="visual-full-box" style={{ cursor: 'grab' }}>Déplacez-moi</div>}
                    {cardId === 'transform-scale-12' && <div className="visual-box" style={{ transform: 'scale(1.2)', backgroundColor: '#e0ffe0' }}>Agrandir</div>}
                    {cardId === 'background-image' && <div className="visual-full-box" style={{ backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}></div>}
                    {cardId === 'box-sizing-border-box' && <div className="visual-box" style={{ width: '80px', height: '80px', padding: '10px', border: '5px solid green', boxSizing: 'border-box', backgroundColor: '#ccffcc' }}>BB</div>}
                    {cardId === 'text-shadow' && <span style={{ textShadow: '2px 2px 4px black', color: 'white' }}>Ombre Texte</span>}
                    {cardId === 'transition-all-1s' && <div className="visual-box hover-effect" style={{ transition: 'all 1s ease', backgroundColor: 'lightcoral' }}>Hover Moi</div>}
                    {cardId === 'flex-wrap-wrap' && (
                        <div className="visual-flex-container visual-flex-wrap">
                            <div className="flex-item">1</div><div className="flex-item">2</div><div className="flex-item">3</div><div className="flex-item">4</div>
                        </div>
                    )}
                    {cardId === 'align-self-end' && (
                        <div className="visual-flex-container visual-align-self-parent">
                            <div className="flex-item">Start</div><div className="flex-item visual-align-self-child">End</div>
                        </div>
                    )}
                    {cardId === 'outline-2px-solid' && <div className="visual-box" style={{ outline: '2px solid orange', outlineOffset: '3px' }}>Contour</div>}
                    {cardId === 'text-overflow-ellipsis' && <div className="visual-overflow-ellipsis-box">Ceci est un texte très long qui devrait être tronqué avec des points de suspension à la fin.</div>}
                    {/* Fallback si pas de cas spécifique - idéalement, il ne devrait plus y en avoir */}
                    {!display.content && <div className="card-visual-hint-default">?</div>}
                </div>
            );
        }
    };

    return (
        <div className={cardClassName} onClick={onClick}>
            <div className="card-inner">
                <div className="card-front"></div> {/* Face cachée de la carte */}
                <div className="card-back" style={display.type === 'visual' ? display.style : {}}>
                    {/* Le style de display.style est maintenant appliqué sur la face arrière pour 'visual' */}
                    {/* Et le contenu est rendu par renderCardContent */}
                    {renderCardContent()}
                </div>
            </div>
        </div>
    );
};

export default Card;