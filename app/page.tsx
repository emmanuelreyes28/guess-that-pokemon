import Image from "next/image";
import styles from "./page.module.css";
import PlayerForm from "./PlayerForm";

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Guess that Pok&eacute;mon!</h1>
      <PlayerForm />
    </div>
  );
}
