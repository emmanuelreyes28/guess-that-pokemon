"use client";
import { useState } from "react";
import Pokemon from "../PokemonImage";

async function getPokemon() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
  );
  const data = await response.json();
  return data.results; // Use 'results' property to get the array of Pokemon
}

function getRandomId() {
  return Math.floor(Math.random() * 151) + 1;
}

// getPokemonDetails will return the pokemon name and sprite to be guessed
async function getPokemonDetails(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonDetails = await response.json();
  const pokemonName = pokemonDetails.name;
  const pokemonSprite = pokemonDetails.sprites.front_default;
  console.log(pokemonName);
  console.log(pokemonSprite);
}

function getPokemonNameOptions(n = 3) {
  const options = [];
  const pokemonArray = getPokemon();
}

getPokemonDetails(getRandomId());

export default function GamePage() {
  type PokemonChosen = {
    name: string;
    sprite: string;
  };

  type PokemonOptions = {
    option1: string;
    option2: string;
    option3: string;
  };

  const [pokemonChosen, setPokemonChosen] = useState<PokemonChosen>();
  const [pokemonOptions, setPokemonOptions] = useState<PokemonOptions>();

  return (
    <div>
      <p>Game Page</p>
      <h1>Where is my text</h1>
    </div>
  );
}
