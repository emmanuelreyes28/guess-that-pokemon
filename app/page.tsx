import styles from "../app/styles/page.module.css";
import PlayerForm from "./PlayerForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.formBackground}>
        <div className={styles.title}>
          <h1>Guess that Pok&eacute;mon!</h1>
        </div>
        <div className="playerInput">
          <PlayerForm />
        </div>
      </div>
    </div>
  );
}
