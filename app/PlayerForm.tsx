"use client";
import styles from "./styles/playerform.module.css";

function PlayerForm() {
  return (
    <form>
      <div className={styles.container}>
        <div className={styles.playerNameContainer}>
          <input
            type="string"
            name="name"
            placeholder="Player Name"
            className={styles.playerNameInput}
          />
        </div>
        <div className={styles.roundsContainer}>
          <select className={styles.roundSelection}>
            <option disabled hidden value={5} defaultValue={5}>
              Number of Rounds
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div>
          <button className={styles.button}>Let&apos;s Go!</button>
        </div>
      </div>
    </form>
  );
}

export default PlayerForm;
