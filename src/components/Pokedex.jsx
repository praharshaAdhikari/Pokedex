import useSWR from "swr";
import { useKeywordStore } from "../store";
import Card from "./Card";
import { useEffect, useState } from "react";

const Pokedex = () => {
  const keyword = useKeywordStore((state) => state.keyword);

  const fetchPokemonData = async (url) => {
    const response = await fetch(url);
    const individualResponse = await response.json();
    return {
      name: individualResponse.name,
      image: individualResponse.sprites.front_default,
      type: individualResponse.types.map((type) => type.type.name).join(", "),
      id: individualResponse.id,
    };
  };

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonData = await Promise.all(
      data?.results?.map((pokemon) => fetchPokemonData(pokemon.url))
    );
    return pokemonData;
  };

  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon?limit=151",
    fetchData,
    { refreshInterval: 60 * 60 * 1000 }
  );

  const [pokemonData, setPokemonData] = useState();
  useEffect(() => {
    if (keyword === "") setPokemonData(data);
    else
      setPokemonData(
        data?.filter((pokemon) => {
          const searchable = `${pokemon.name} ${pokemon.type}`;
          return searchable.includes(keyword.toLowerCase());
        })
      );
  }, [data, keyword]);

  if (error)
    return (
      <div className="w-screen flex flex-col items-center gap-10">
        <h2 className="mt-10 capitalize text-5xl font-semibold">
          Error: {error.message}
        </h2>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-screen flex flex-col items-center gap-10">
        <h2 className="mt-10 capitalize text-5xl font-semibold">Loading...</h2>
      </div>
    );
  return (
    <div className="w-screen flex flex-col items-center gap-10">
      <h2 className="mt-10 text-5xl font-semibold">
        {keyword === ""
          ? "All Pokémon"
          : pokemonData?.length === 0
          ? `No results found for '${keyword}'`
          : pokemonData?.length === 1
          ? `1 result found for '${keyword}'`
          : `${pokemonData.length} results found for '${keyword}'`}
      </h2>
      <div className="w-fit mx-auto grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">
        {pokemonData?.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            type={pokemon.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
