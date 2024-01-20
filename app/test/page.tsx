"use client";

import { useEffect, useState } from "react";
import PokemonDetails from "../PokemonDetails";

//create types for states
export type TargetPokemon = {
  // name: string;
  sprite: string;
};

export type PokemonOptions = {
  names: Array<string>;
};

const randomId = (): number => {
  return Math.floor(Math.random() * 151) + 1;
};

export default function Test() {
  //create states for target pokemon and pokemon names
  const [targetPokemon, setTargetPokemon] = useState<TargetPokemon | null>(
    null
  );
  const [pokemonOptions, setPokemonOptions] = useState<PokemonOptions>({
    names: [],
  });

  useEffect(() => {
    async function fetchPokemonTarget() {
      try {
        const id = randomId();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const sprite = data.sprites.front_default;
        const pokemonName = data.name;
        setTargetPokemon({ sprite: sprite });
        setPokemonOptions((prevOptions) => ({
          names: [...prevOptions.names, pokemonName],
        }));
        // pokemonOptions?.names.push(pokemonName);
        // setTargetPokemon({ name: pokemonName, sprite: sprite });
      } catch (error) {
        console.log(error);
      }
    }

    //create fetchPokemonNames async functions
    fetchPokemonTarget();

    async function fetchPokemonOptions() {
      try {
        const pokemonNames: string[] = [];
        // track ids visited so we do not run into duplicates
        const idsVisited: number[] = [];

        // for (let i = 0; pokemonNames.length !== 3; i++) {
        for (let i = 0; pokemonOptions?.names.length != 4; i++) {
          console.log(pokemonOptions.names.length);
          const id = randomId();
          // if id is not in idsVisited
          if (!(id in idsVisited)) {
            // add id to idsVisited
            idsVisited.push(id);
            // fetch pokemon name for given id
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const data = await response.json();
            const pokemonName = data.name;
            // store pokemon name to pokemonName array
            // pokemonNames.push(pokemonName);
            // pokemonOptions?.names.push(pokemonName);
            setPokemonOptions((prevOptions) => ({
              names: [...prevOptions.names, pokemonName],
            }));
          }
        }
        // console.log(pokemonOptions);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonOptions();
  }, []);

  console.log(pokemonOptions);

  //pass in state values into to pokemonDetails as props
  return <PokemonDetails />;
}
