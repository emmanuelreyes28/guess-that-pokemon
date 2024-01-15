export async function getPokemons() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  const pokemons = response.json();
  console.log(pokemons);
}
getPokemons();
function Pokemon() {
  return (
    <div>
      <p>Hi this is pokemon function</p>
    </div>
  );
}

export default Pokemon;
