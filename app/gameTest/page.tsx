"use client";
import { useEffect, useState } from "react";

type PokemonChosen = {
  name: string;
  sprite: string;
};

function RandomPokemonChosen({
  onPokemonUpdate,
}: {
  onPokemonUpdate: (pokemon: PokemonChosen) => void;
}) {
  useEffect(() => {
    let round = 0;

    const fetchPokemon = async () => {
      let randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();

      const pokemon: PokemonChosen = {
        name: data.name,
        sprite: data.sprites.front_default,
      };

      onPokemonUpdate(pokemon);
    };

    fetchPokemon();
  });
  return null;
}

export default function GameTest() {
  const [pokemonChosen, setPokemonChosen] = useState<PokemonChosen>();

  const handlePokemonUpdate = (pokemon: PokemonChosen) => {
    setPokemonChosen(pokemon);
  };
  return (
    <div>
      <RandomPokemonChosen onPokemonUpdate={handlePokemonUpdate} />
      {pokemonChosen && (
        <div>
          <p>Name: {pokemonChosen.name}</p>
          <img src={pokemonChosen.sprite} alt={pokemonChosen.name} />
        </div>
      )}
    </div>
  );
}
