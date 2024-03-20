"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PokemonCard from "../PokemonCard";
import PokemonChoice from "../PokemonChoice";
import styles from "../styles/game.module.css";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

//TO-DO: create modal for end of game showing player final score and play again button
// style game page and modal
// add styling to response text

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

export default function Game() {
  //create states for target pokemon and pokemon names
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [answer, setAnswer] = useState<PokemonDetails>();
  const [response, setResponse] = useState<string>("");
  const [fetchTriggered, setFetchTriggered] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [isPokemonChosen, setIsPokemonChosen] = useState<boolean>(false);
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [gameInProgress, setGameInProgress] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const playerName = searchParams.get("name");
  const rounds = Number(searchParams.get("rounds"));

  const fetchPokemonDetails = async () => {
    const idArray = randomIds();
    try {
      const result = await Promise.all(
        idArray.map(async (id) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const data = await response.json();
          // console.log(data.name);
          return data;
        })
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      const result = await fetchPokemonDetails();
      if (!ignore) {
        result?.forEach((item) => {
          setPokemonDetails((prevPokemonDetails) => {
            return [
              ...prevPokemonDetails,
              { name: item.name, sprite: item.sprites.front_default },
            ];
          });
        });
        setFetchTriggered(false); // reset fetch trigger
        setRoundsPlayed(roundsPlayed + 1);
      }
    }

    if (fetchTriggered) {
      startFetching();
    }

    return () => {
      ignore = true;
    };
  }, [fetchTriggered, roundsPlayed]);

  useEffect(() => {
    // shuffle pokemon array so the answer is not always the same button
    const shuffledPokemon = shuffle(pokemonDetails);
    setPokemonDetails(shuffledPokemon);
    const indexAnswer = Math.floor(Math.random() * 4);
    setAnswer(pokemonDetails.at(indexAnswer));
  }, [pokemonDetails]);

  function handleClick(pokemon: { name: string }) {
    setIsPokemonChosen(true); // reveal pokemon once player has made a choice
    setGameInProgress(false); // disable pokemon options from being clickable

    if (pokemon.name === answer?.name) {
      setScore(score + 1);
      setResponse("Correct!");
    } else {
      setResponse(`Incorrect! It's ${answer?.name}!`);
    }
    // check if game is over
    isGameOver();
  }

  function isGameOver() {
    if (roundsPlayed >= rounds) {
      console.log("End of game!");
    } else {
      setTimeout(() => {
        setPokemonDetails([]); // reset array of pokemonDetails to avoid from growing on every render
        setFetchTriggered(true); // trigger fetch function when player makes selections
        setIsPokemonChosen(false);
        setGameInProgress(true);
      }, 1200);
    }
  }

  const optionContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Guess that Pok&eacute;mon!</h1>
          <div className={styles.stats}>
            <p>
              {playerName}&apos;s score: {score}
            </p>
            <p className={styles.rounds}>round: {roundsPlayed}</p>
          </div>
        </div>
        <div
          className={`${styles.pokemonCard} ${
            isPokemonChosen ? styles.showPokemon : styles.hidePokemon
          }`}
        >
          <div>
            {answer && (
              <PokemonCard name={answer.name} sprite={answer.sprite} />
            )}
          </div>
        </div>
        <div className={styles.response}>{isPokemonChosen && response}</div>

        {pokemonDetails.map((pokemon, index) => (
          <motion.div
            key={pokemon.name}
            className={styles.pokemonOption}
            variants={optionContainer}
            initial="hidden"
            animate={"show"}
          >
            <PokemonChoice
              name={pokemon.name}
              onClick={() => gameInProgress && handleClick(pokemon)}
            />
          </motion.div>
        ))}
      </div>
      <div className={styles.footer}>
        <p>Emmanuel Reyes &copy;</p>
        <div className={styles.github}>
          <FaGithub />
        </div>
      </div>
    </>
  );
}
