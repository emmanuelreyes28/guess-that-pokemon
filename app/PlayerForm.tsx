"use client";
import { useState } from "react";
import styles from "./styles/playerform.module.css";

function PlayerForm() {
  interface PlayerInfo {
    name: string;
    rounds: number;
  }

  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    name: "",
    rounds: 5,
  });

  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (playerInfo.name.length > 0) {
          console.log(playerInfo);
        } else {
          setMessage("Please enter player name");
        }
      }}
    >
      <div className={styles.container}>
        <div className={styles.playerNameContainer}>
          <input
            type="text"
            name="name"
            placeholder="Player Name"
            className={styles.playerNameInput}
            onChange={(event) => {
              const { name, value } = event.target;
              setPlayerInfo((prevPlayerInfo) => ({
                ...prevPlayerInfo,
                [name]: value,
              }));
            }}
          />
        </div>
        <div className={styles.roundsContainer}>
          <select className={styles.roundSelection}>
            <option value={5}>5 Rounds</option>
            <option value={10}>10 Rounds</option>
            <option value={15}>15 Rounds</option>
            <option value={20}>20 Rounds</option>
            <option value={25}>25 Rounds</option>
          </select>
        </div>
        <div>
          <button type="submit" className={styles.button}>
            Let&apos;s Go!
          </button>
        </div>
        <div className={styles.message}>{message}</div>
      </div>
    </form>
  );
}

export default PlayerForm;
