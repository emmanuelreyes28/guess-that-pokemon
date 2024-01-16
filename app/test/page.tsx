"use client";

import { useEffect } from "react";
import PokemonDetails from "../PokemonDetails";

export default function Test() {
  useEffect(() => {
    async function fetchPokemonTarget() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        const data = await response.json();
        const sprite = data.sprites.front_default;
        console.log(sprite);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPokemonTarget();
  }, []);

  return <PokemonDetails />;
}
