"use client";

import Link from "next/link";
import styles from "./styles/modal.module.css";
import { FaHome } from "react-icons/fa";

export default function Modal({
  player,
  score,
  rounds,
}: Readonly<{ player: string; score: number; rounds: number }>) {
  return (
    <div className={styles.container}>
      <p>
        {player}&apos;s Final Score:
        <br />
        <div className={styles.score}>
          {score} out of {rounds}
        </div>
      </p>
      <div className={styles.home}>
        <button>
          <Link href="/">
            <FaHome />
          </Link>
        </button>
      </div>
    </div>
  );
}
