import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const generateCards = () => {
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
    const shuffledCards = [...cardValues].sort(() => Math.random() - 0.5).map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    generateCards();
    setTimer(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleFlip = (card) => {
    if (flippedCards.length < 2 && !card.isFlipped && !card.isMatched) {
      const newCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      setCards(newCards);
      setFlippedCards([...flippedCards, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.value === secondCard.value) {
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
        setScore((prevScore) => prevScore + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = cards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id ? { ...c, isFlipped: false } : c
          );
          setCards(newCards);
          setFlippedCards([]);
          setScore((prevScore) => Math.max(0, prevScore - 2));
        }, 500);
      }
    }
  }, [flippedCards, cards, matchedCards]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsRunning(false);
      alert(`Game Over! Your score is ${score} and time is ${timer} seconds.`);
    }
  }, [matchedCards, cards.length, score, timer]);

  const resetGame = () => {
    setIsRunning(false);
    generateCards();
    setTimer(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsRunning(true);
  };

  return (
    <div className='container'>
      <div className="app">
        <h1>Memory Game</h1>
        <div className="info">
          <div id="timer">Time: {timer}s</div>
          <div id="score">Score: {score}</div>
        </div>
        <div className="game-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onFlip={handleFlip}
              isFlipped={card.isFlipped}
              isMatched={matchedCards.includes(card.id)}
            />
          ))}
        </div>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}

export default App;