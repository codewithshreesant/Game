import React from 'react';
import './Card.css';

function Card({ card, onFlip, isFlipped, isMatched }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card);
    }
  };

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      {isFlipped || isMatched ? card.value : ''}
    </div>
  );
}

export default Card;