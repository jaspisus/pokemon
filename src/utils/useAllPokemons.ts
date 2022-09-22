import { useEffect, useMemo, useState } from 'react';
import fetchList from './fetchList';

const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

const useAllPokemons = () => {
	const [pokemonData, setPokemonData] = useState<any[]>([]);
	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

	const handleData = (data: any) => {
		setPokemonData(data.results);
	};

	useEffect(() => {
		fetchList({
			url,
			handleData,
			setIsDataFetching,
		});
	}, []);

	const pokemonNames = useMemo(
		() => pokemonData.map((pokemon) => pokemon.name),
		[pokemonData]
	);

	if (isDataFetching) {
		return { pokemonData: [], pokemonNames: [] };
	}

	return { pokemonData, pokemonNames };
};

export default useAllPokemons;
