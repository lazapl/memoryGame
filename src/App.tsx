import React, { useState, useEffect } from 'react';
import './App.css';

const generateRandomArray = (length: number) => {
  const numbers: number[] = [];
  for (let i = 1; i <= length / 2; i++) {
    numbers.push(i, i);
  }
  return numbers.sort(() => Math.random() - 0.5);
};

const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoGame: React.FC = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    setCards(shuffleArray(generateRandomArray(12)));
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2) {
      return;
    }

    setFlippedIndices([...flippedIndices, index]);

    if (flippedIndices.length === 1 && cards[flippedIndices[0]] === cards[index]) {
      setMatchedPairs([...matchedPairs, cards[flippedIndices[0]]]);
      setFlippedIndices([]);
    }

    if (flippedIndices.length === 1) {
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  };

  const renderCard = (value: number, index: number) => {
    const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(value);

    return (
      <div
        key={index}
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => handleCardClick(index)}
      >
        {isFlipped ? value : '?'}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="card-container">
        {cards.map((value, index) => renderCard(value, index))}
      </div>
    </div>
  );
};

export default MemoGame;