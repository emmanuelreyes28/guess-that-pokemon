import { PlayerInfo } from "./PlayerForm";

export default function PlayerScore({ name, rounds }: PlayerInfo) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Score: 0/{rounds}</p>
    </div>
  );
}
