"use client";

import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard";
import PokemonChoice from "../PokemonChoice";

//TO-DO: START ON LOGIC OF CORRECT POKEMON CHOICE BEING SELECTED
// KEEP TRACK OF SCORE
// CHANGE USE EFFECT DEPENDENCY ON BUTTON CLICKED POSSIBLY

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

const shuffle = (array: PokemonDetails[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Test() {
  //create states for target pokemon and pokemon names
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [answer, setAnswer] = useState<PokemonDetails>();

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

  useEffect(() => {
    // shuffle pokemon array so the answer is not always the same button
    const shuffledPokemon = shuffle(pokemonDetails);
    setPokemonDetails(shuffledPokemon);
    const indexAnswer = Math.floor(Math.random() * 4);
    setAnswer(pokemonDetails.at(indexAnswer));
  }, [pokemonDetails]);

  return (
    <div>
      {answer && <PokemonCard name={answer.name} sprite={answer.sprite} />}

      {pokemonDetails.map((pokemon) => (
        <PokemonChoice key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
}
