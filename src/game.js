import { useEffect } from "react";
import { useState } from "react";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onValue,
} from "firebase/database";

export default function Game() {
  const [stateOfGame, setStatofGame] = useState("On Going!");
  const [roundWinner, setRoundWinner] = useState("");
  const [playerScore, setplayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const playerID = "hDgXa1n3d4SjpOafQH3uuMlEoix2";
  const [previousScore, setPreviousScore] = useState(0);
  let winner;

  function getScore() {
    const db = getDatabase();

    const starCountRef = ref(db, "users/" + playerID + "/points");

    onValue(starCountRef, (snapshot) => {
      setPreviousScore(snapshot.val());
    });
  }
  useEffect(() => {
    getScore();
  });

  function addToScore(uid, points) {
    const db = getDatabase();

    console.log(previousScore);
    // A post entry.
    const postData = {
      points: previousScore + points,
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/users/" + uid + "/"] = postData;

    return update(ref(db), updates);
  }

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

  function handleHand(hand) {
    if (playerScore === 3 || computerScore === 3) {
      // Make sure game ended, Nothing happens. disable fun!

      isGameOver();
    } else {
      document.getElementById(
        "playerSign"
      ).textContent = ` player sign ${hand}`;
      playRound(hand, computerRandomSelection());
      setRoundWinner(winner);
      isGameOver();
    }
  }
  function isGameOver() {
    if (playerScore === 3 || computerScore === 3) {
      // Game ENDED
      document.getElementById("rockButton").disabled = true;
      document.getElementById("paperButton").disabled = true;
      document.getElementById("scissorButton").disabled = true;
      // Game ENDED
      setStatofGame("GAME ENDED!");
    }
  }
  function checkIfPlayerWon() {
    // if player won add 3 points
    addToScore(playerID, 3);
  }

  return (
    <div className="main">
      <div className="gameboard">
        <p>Your total points in this game : {previousScore}</p>
        <p className="game-state" id="game-state">
          State of the Game : {stateOfGame}|||| Round Winner : {roundWinner}
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
