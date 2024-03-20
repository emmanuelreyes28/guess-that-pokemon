"use client";

export default function Modal({
  player,
  score,
  rounds,
}: Readonly<{ player: string; score: number; rounds: number }>) {
  return (
    <>
      {player}&apos;s Final Score: {score}/{rounds}
    </>
  );
}
