import { useState, useEffect } from "react";
import "./App.css";

import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/FrostclawLens.png", matched: false },
  { src: "/img/GrazerLens.png", matched: false },
  { src: "/img/LonglegLens.png", matched: false },
  { src: "/img/ShellWalkerLens.png", matched: false },
  { src: "/img/WatcherLens.png", matched: false },
  { src: "/img/StriderLens.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsGameOver(false);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const wonCards = cards.filter((card) => card.matched === true);
    if (wonCards.length === 12) {
      setTimeout(() => setIsGameOver(true), 1000);
    }
  }, [cards]);

  return (
    <div className="App">
      <h1>Hunting Grounds</h1>
      <p>Find all the machine parts!</p>
      <button onClick={shuffleCards}>New Game</button>

      {isGameOver && (
        <div className="game-over">
          <div>Well done Hunter!</div>
          <div>
            You collected all parts in <span>{turns}</span> turns.
          </div>
        </div>
      )}

      {!isGameOver && (
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              cardData={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {!isGameOver && <div className="turns">Turns {turns}</div>}
    </div>
  );
}

export default App;
