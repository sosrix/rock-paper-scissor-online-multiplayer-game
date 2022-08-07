import { useEffect } from "react";
import { useState } from "react";

export default function Game() {
  const [roundWinner, setRoundWinner] = useState("");
  const [playerScore, setplayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  let winner;

  function playRound(playerSelection, computerSelection) {
    document.getElementById(
      "computerSign"
    ).textContent = ` computer sign ${computerSelection}`;

    if (playerSelection === computerSelection) {
      winner = "Draw!";
    }
    if (
      (playerSelection === "ROCK" && computerSelection === "SCISSOR") ||
      (playerSelection === "SCISSOR" && computerSelection === "PAPER") ||
      (playerSelection === "PAPER" && computerSelection === "ROCK")
    ) {
      setplayerScore((playerScore) => ++playerScore);
      winner = "Player";
    }
    if (
      (computerSelection === "ROCK" && playerSelection === "SCISSOR") ||
      (computerSelection === "SCISSOR" && playerSelection === "PAPER") ||
      (computerSelection === "PAPER" && playerSelection === "ROCK")
    ) {
      setComputerScore((computerScore) => ++computerScore);
      winner = "Computer";
    }
  }

  const computerRandomSelection = () => {
    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        return "ROCK";
      case 1:
        return "PAPER";
      case 2:
        return "SCISSOR";
    }
  };

  function isGameOver() {
    return playerScore === 5 || computerScore === 5;
  }

  function handleHand(hand) {
    document.getElementById("playerSign").textContent = ` player sign ${hand}`;
    playRound(hand, computerRandomSelection());

    setRoundWinner(winner);
  }

  return (
    <div className="main">
      <div className="gameboard">
        <p className="game-state" id="game-state">
          State of the Game! {roundWinner}
        </p>
        <div className="game-container">
          <div className="player-box">
            <div id="playerSign">[player Sign]</div>
            <p className="score" id="playerScore">
              Player points : {playerScore}
            </p>
          </div>
          <div className="player-box">
            <div id="computerSign">[computer Sign] </div>
            <p className="score" id="computerScore">
              computer points : {computerScore}
            </p>
          </div>
        </div>
      </div>

      <div className="buttons">
        <p className="">Choose your Hand!</p>
        <button
          className="btn"
          id="rockButton"
          onClick={() => handleHand("ROCK")}
        >
          <div className="sign">✊</div>
        </button>
        <button
          className="btn"
          id="paperButton"
          onClick={() => handleHand("PAPER")}
        >
          <div className="sign">✋</div>
        </button>
        <button
          className="btn"
          id="scissorButton"
          onClick={() => handleHand("SCISSOR")}
        >
          <div className="sign">✌</div>
        </button>
      </div>
    </div>
  );
}
