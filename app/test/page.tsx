"use client";

import { useEffect, useState } from "react";
import PokemonDetails from "../PokemonDetails";

//create types for states
export type TargetPokemon = {
  name: string;
  sprite: string;
};

const randomId = (): number => {
  return Math.floor(Math.random() * 151) + 1;
};

export default function Test() {
  //create states for target pokemon and pokemon names
  const [targetPokemon, setTargetPokemon] = useState<TargetPokemon | null>(
    null
  );

  useEffect(() => {
    async function fetchPokemonTarget() {
      try {
        const id = randomId();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const sprite = data.sprites.front_default;
        const pokemonName = data.name;
        setTargetPokemon({ name: pokemonName, sprite: sprite });
      } catch (error) {
        console.log(error);
      }
    }

    //create fetchPokemonNames async functions
    fetchPokemonTarget();

    async function fetchPokemonOptions() {
      try {
        const pokemonNames: string[] = [];
        for (let i = 0; i < 3; i++) {
          const id = randomId();
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const data = await response.json();
          const pokemonName = data.name;
          pokemonNames.push(pokemonName);
        }
        console.log(pokemonNames);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonOptions();
  }, []);

  //pass in state values into to pokemonDetails as props
  return <PokemonDetails />;
}
