// import { PokemonDetails } from "./test/page";

export default function PokemonChoice({ name }: Readonly<{ name: string }>) {
  return (
    <div>
      <button>{name}</button>
    </div>
  );
}
