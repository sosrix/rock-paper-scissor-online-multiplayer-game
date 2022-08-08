import { useEffect } from "react";
import { useState } from "react";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Game(user) {
  const [stateOfGame, setStatofGame] = useState("ON GOING!");
  const [roundWinner, setRoundWinner] = useState("");
  const [playerScore, setplayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const playerID = "hDgXa1n3d4SjpOafQH3uuMlEoix2";
  const [previousScore, setPreviousScore] = useState(0);
  let winner;

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user = currentUser;
    } else {
      user = null;
    }
  });

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
    document.getElementById("computerSign").textContent = computerSelection;

    if (playerSelection === computerSelection) {
      winner = "DRAW!";
    }
    if (
      (playerSelection === "✊" && computerSelection === "✌") ||
      (playerSelection === "✌" && computerSelection === "✋") ||
      (playerSelection === "✋" && computerSelection === "✊")
    ) {
      setplayerScore((playerScore) => ++playerScore);
      winner = "YOU!";
    }
    if (
      (computerSelection === "✊" && playerSelection === "✌") ||
      (computerSelection === "✌" && playerSelection === "✋") ||
      (computerSelection === "✋" && playerSelection === "✊")
    ) {
      setComputerScore((computerScore) => ++computerScore);
      winner = "COMPUTER!";
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
    if (playerScore === 3 || computerScore === 3) {
      // Make sure game ended, Nothing happens. disable fun!

      isGameOver();
    } else {
      document.getElementById("playerSign").textContent = hand;
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
  function resetGame() {
    setStatofGame("ON GOING!");
    setRoundWinner("");
    setplayerScore(0);
    setComputerScore(0);
    winner = "";
    document.getElementById("playerSign").textContent = "🥊";
    document.getElementById("computerSign").textContent = "🥊";

    document.getElementById("rockButton").disabled = false;
    document.getElementById("paperButton").disabled = false;
    document.getElementById("scissorButton").disabled = false;
  }

  function checkIfPlayerWon() {
    // if player won add 3 points
    addToScore(playerID, 3);
  }
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="main">
      <div className="gameboard">
        <div className="userArea">
          <div className="user">
            <div class="avatar">
              <img
                class="avatar__image"
                src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png"
              />
            </div>
            <p>USERNAME</p>
            <button className="singOut-btn" onClick={logout}>
              Sign Out
            </button>
          </div>
          <p className="userMessage"> SCORE : {previousScore}</p>
        </div>
        <div className="state-Area">
          <p className="game-state">
            {stateOfGame === "ON GOING!"
              ? "For every win you get [3] points added on your total SCORE!"
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
    </div>
  );
}
