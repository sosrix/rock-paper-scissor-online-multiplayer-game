import { useEffect } from "react";
import { useState } from "react";

export default function Main() {
  const [playerHand, SetPlayerHand] = useState("");

  useEffect(() => {
    const rockButton = document.getElementById("rockButton");
    const paperButton = document.getElementById("paperButton");
    const scissorButton = document.getElementById("scissorButton");

    rockButton.addEventListener("click", () => handleHand("✊"));
    paperButton.addEventListener("click", () => handleHand("✋"));
    scissorButton.addEventListener("click", () => handleHand("✌"));
  }, []);

  function handleHand(hand) {
    SetPlayerHand(hand);
    document.getElementById(
      "player1Sign"
    ).textContent = ` player 1 sign ${hand}`;
    console.log(hand);
  }

  return (
    <div className="main">
      <div className="gameboard">
        <p className="game-state" id="game-state">
          State of the Game!
        </p>
        <div className="game-container">
          <div className="player-box">
            <div id="player1Sign">[player 1 Sign]</div>
            <p className="score" id="player1Score">
              Player 1 points : 0
            </p>
          </div>
          <div className="player-box">
            <div id="player2Sign">[player 2 Sign] </div>
            <p className="score" id="player2Score">
              Player 2 points : 0
            </p>
          </div>
        </div>
      </div>

      <div className="buttons">
        <p className="">Choose your Hand!</p>
        <button className="btn" id="rockButton">
          <div className="sign">✊</div>
        </button>
        <button className="btn" id="paperButton">
          <div className="sign">✋</div>
        </button>
        <button className="btn" id="scissorButton">
          <div className="sign">✌</div>
        </button>
      </div>
    </div>
  );
}
