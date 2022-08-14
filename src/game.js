import { useEffect } from "react";
import { useState } from "react";
import UserArea from "./userArea";

import { getDatabase, ref, update, onValue } from "firebase/database";

import LoaderWrapper from "./loaderwrapper";

export default function Game({ user }) {
  const [stateOfGame, setStatofGame] = useState("ON GOING!");
  const [roundWinner, setRoundWinner] = useState("");
  const [fighting, setFighting] = useState(false);
  const [playerScore, setplayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerID, setPlayerID] = useState();
  const [previousScore, setPreviousScore] = useState(0);
  const [popup, setPopup] = useState("none");
  const [winner, setWinner] = useState("WHO?");

  function getScore() {
    const db = getDatabase();

    const starCountRef = ref(db, "users/" + playerID + "/points");

    onValue(starCountRef, (snapshot) => {
      setPreviousScore(snapshot.val());
    });
  }
  useEffect(() => {
    getScore();

    console.log("runned getScore");
  });

  function addToScore(playerID, points) {
    const db = getDatabase();

    console.log(previousScore);
    // A post entry.
    const postData = {
      points: previousScore + points,
    };
    if (postData.points >= 0) {
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/users/" + playerID + "/"] = postData;

      return update(ref(db), updates);
    }
  }

  function playRound(playerSelection, computerSelection) {
    const cmpHand = document.getElementById("computerSign");
    cmpHand.textContent = computerSelection;

    if (playerSelection === computerSelection) {
      setRoundWinner("DRAW!");
    }
    if (
      (playerSelection === "✊" && computerSelection === "✌") ||
      (playerSelection === "✌" && computerSelection === "✋") ||
      (playerSelection === "✋" && computerSelection === "✊")
    ) {
      setplayerScore((playerScore) => ++playerScore);
      setRoundWinner("YOU!");
    }
    if (
      (computerSelection === "✊" && playerSelection === "✌") ||
      (computerSelection === "✌" && playerSelection === "✋") ||
      (computerSelection === "✋" && playerSelection === "✊")
    ) {
      setComputerScore((computerScore) => ++computerScore);
      setRoundWinner("COMPUTER!");
    }
  }

  const computerRandomSelection = () => {
    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        return "✊";
      case 1:
        return "✋";
      case 2:
        return "✌";
    }
  };

  function handleHand(hand) {
    if (!fighting) {
      setFighting(true);
      document.getElementById("rockButton").disabled = true;
      document.getElementById("paperButton").disabled = true;
      document.getElementById("scissorButton").disabled = true;
      setTimeout(() => {
        document.getElementById("rockButton").disabled = false;
        document.getElementById("paperButton").disabled = false;
        document.getElementById("scissorButton").disabled = false;
        setFighting(false);
      }, 700);
      if (playerScore === 3 || computerScore === 3) {
        // Make sure game ended, Nothing happens. disable fun!
        isGameOver();
      } else {
        document.getElementById("playerSign").textContent = hand;
        playRound(hand, computerRandomSelection());
      }
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
  function resetGame() {
    setFighting(true);
    setTimeout(() => {
      setStatofGame("ON GOING!");
      setRoundWinner("");
      setWinner("WHO?");
      setPopup("none");
      setplayerScore(0);
      setComputerScore(0);
      document.getElementById("playerSign").textContent = "🥊";
      document.getElementById("computerSign").textContent = "🥊";
      document.getElementById("rockButton").disabled = false;
      document.getElementById("paperButton").disabled = false;
      document.getElementById("scissorButton").disabled = false;
      setFighting(false);
    }, 1000);
  }

  useEffect(() => {
    setPlayerID(user.uid);
    if (playerScore === 3) {
      isGameOver();
      addToScore(playerID, 3);
      setWinner("YOU WON! +[3] points added to your SCORE!");
      setPopup("block");
    }
    if (computerScore === 3) {
      isGameOver();
      addToScore(playerID, -3);
      setWinner("YOU LOST! -[3] points taken from your SCORE!");
      setPopup("block");
    }
  }, [playerScore, computerScore]);

  return (
    <>
      <LoaderWrapper>
        <LoaderWrapper.loadingAnimation />
      </LoaderWrapper>
      <div className="main">
        <div className="gameboard">
          <UserArea user={user} previousScore={previousScore} />

          <div className="state-Area">
            <p className="game-state">
              {stateOfGame === "ON GOING!"
                ? "For every win you get +[3] points added on your total SCORE! and lose -[3] point if you lost"
                : stateOfGame}
            </p>
            <p className="round-winner">
              {roundWinner && roundWinner !== "DRAW!"
                ? `${roundWinner} - WON THIS ROUND`
                : roundWinner === "DRAW!"
                ? "Opsie IT'S A DRAW"
                : "START PLAYING!"}
            </p>
          </div>
          {fighting ? <LoaderWrapper.loadingAnimation /> : ""}
          <div className="game-container">
            <div className="player-box">
              <div className="playerSign" id="playerSign">
                🥊
              </div>
              <p className="score" id="playerScore">
                YOUR POINTS : <span className="round-score">{playerScore}</span>
              </p>
            </div>
            <div className="player-box">
              <div className="computerSign" id="computerSign">
                🥊
              </div>
              <p className="score" id="computerScore">
                COMPUTER POINTS :{" "}
                <span className="round-score">{computerScore}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="choices">
          <p className="your-choice">CHOOSE YOUR HAND!</p>
          <button
            className="btn"
            id="rockButton"
            onClick={() => handleHand("✊")}
          >
            <div className="handSign">✊</div>
          </button>
          <button
            className="btn"
            id="paperButton"
            onClick={() => handleHand("✋")}
          >
            <div className="handSign">✋</div>
          </button>
          <button
            className="btn"
            id="scissorButton"
            onClick={() => handleHand("✌")}
          >
            <div className="handSign">✌</div>
          </button>
        </div>
        <button className="restartGame-btn" onClick={() => resetGame()}>
          RESET GAME!
        </button>
        <div className="modal" style={{ display: popup }}>
          <div className="modal-content">
            <span className="close" onClick={() => setPopup("none")}>
              &times;
            </span>
            <p>{winner}</p>
            <button className="restartGame-btn" onClick={() => resetGame()}>
              PLAY AGAIN!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
