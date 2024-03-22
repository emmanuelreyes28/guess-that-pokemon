import Image from "next/image";
import { PokemonDetails } from "./game/page";

export default function PokemonCard(props: Readonly<PokemonDetails>) {
  return (
    <div>
      <Image src={props.sprite} alt="pokemon" width={300} height={300} />
    </div>
  );
}
