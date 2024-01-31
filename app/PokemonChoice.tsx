// import { PokemonDetails } from "./test/page";

export default function PokemonChoice({
  name,
  onClick,
}: Readonly<{ name: string; onClick: React.MouseEventHandler }>) {
  return <button onClick={onClick}>{name}</button>;
}
