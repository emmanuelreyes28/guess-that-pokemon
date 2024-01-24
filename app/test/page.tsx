"use client";

import { useEffect, useState } from "react";
import PokemonDetails from "../PokemonDetails";

/*
use one aync function to get all pokemon details that will be used for the game page
first get four random ids and store them in array - can have randomIds function loop through 4 iteration and populate idsArray
second map over array to fetch api for given id - this will be done in the async function
*/

export type PokemonDetails = {
  name: string;
  sprite: string;
};

const randomIds = (): number[] => {
  const ids: number[] = [];
  while (ids.length < 4) {
    let randomNum = Math.floor(Math.random() * 151) + 1;
    // avoid duplicates
    if (!ids.includes(randomNum)) {
      ids.push(randomNum);
    }
  }
  return ids;
};

export default function Test() {
  //create states for target pokemon and pokemon names
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  const fetchPokemonDetails = async () => {
    const idArray = randomIds();
    try {
      const result = await Promise.all(
        idArray.map(async (id) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const data = await response.json();
          console.log(data.name);
          return data;
        })
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function startFetching() {
      const result = await fetchPokemonDetails();
      // console.log(result);

      result?.forEach((item) => {
        setPokemonDetails((prevPokemonDetails) => {
          return [
            ...prevPokemonDetails,
            { name: item.name, sprite: item.sprites.front_default },
          ];
        });
      });
    }
    startFetching();
  }, []);

  //pass in state values into to pokemonDetails as props
  return (
    <>
      <PokemonDetails />
      <div>
        {pokemonDetails.map((pokemon) => (
          <div key={pokemon.name}>
            <p>{pokemon.name}</p>
            <p>{pokemon.sprite}</p>
          </div>
        ))}
      </div>
    </>
  );
}
