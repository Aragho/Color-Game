import React, { useState, useEffect } from "react";
import './App.css';

const colors = ["red", "green", "yellow", "blue", "purple", "orange"];

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = (guessedColor) => {
    if (guessedColor === targetColor) {
      setGameStatus("Congratulations! You guessed correctly!");
      setScore((prevScore) => prevScore + 1);

      const colorBox = document.querySelector('.color-box');
      colorBox.classList.add('celebration');

      setTimeout(() => {
        colorBox.classList.remove('celebration');
        startNewGame();
      }, 1000); 
    } else {
      setGameStatus("Oops... Wrong Guess! Try Again.");

      const status = document.querySelector('.status');
      status.classList.add('fade-out');

      setTimeout(() => {
        status.classList.remove('fade-out');
      }, 1000);
    }
  };

  const startNewGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setGameStatus("");
  };

  const resetGame = () => {
    setScore(0);
    startNewGame();
  };

  return (
    <div className="container">
      <h1>Color Guessing Game</h1>
      <div
        className="color-box"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      ></div>
      <p className="instructions" data-testid="gameInstructions">
        Guess the Correct Color!
      </p>
      <div className="color-options">
        {colors.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p className={`status`} data-testid="gameStatus">
        {gameStatus}
      </p>
      <p className="score">
        Score: <span data-testid="score">{score}</span>
      </p>
      <button
        className="new-game-button"
        data-testid="newGameButton"
        onClick={resetGame}
      >
        New Game
      </button>
    </div>
  );
};

export default App;
