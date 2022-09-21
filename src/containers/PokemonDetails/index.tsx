import { useCallback, useEffect, useState } from 'react';
import fetchList from '../../utils/fetchList';
import useQuery from '../../utils/useQuery';
import './PokemonDetails.scss';

const PokemonDetails = () => {
	const [pokemonData, setPokemonData] = useState<any>({});
	const [evolutionData, setEvolutionData] = useState<any>({});
	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

	const id = useQuery()?.get('id');
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
	const evolutionsUrl = `https://pokeapi.co/api/v2/evolution-chain/${id}/`;

	const handlePokemonData = useCallback((data: any) => {
		setPokemonData(data);
	}, []);

	const handleEvolutionsData = useCallback((data: any) => {
		setEvolutionData(data);
	}, []);

	useEffect(() => {
		fetchList({ handleData: handlePokemonData, url: pokemonUrl });
		fetchList({
			handleData: handleEvolutionsData,
			url: evolutionsUrl,
			setIsDataFetching,
		});
	}, [evolutionsUrl, handleEvolutionsData, handlePokemonData, pokemonUrl]);

	if (isDataFetching) {
		return <div>Loading...</div>;
	}

	console.log(evolutionData);

	return (
		<div className="pokemon-details">
			<span className="pokemon-details__name">{pokemonData.name}</span>
			<div className="pokemon-details__image">
				<img src={pokemonData.sprites.front_default} alt="pokemon thumbnail" />
			</div>
			<div className="pokemon-details__list">
				<span>Evolutions:</span>
				<ol>
					<li>{evolutionData.chain.species.name}</li>
					{evolutionData.chain.evolves_to.map(
						(evolution: any, index: number) => (
							<li key={index}>{evolution.species.name}</li>
						)
					)}
				</ol>
			</div>
		</div>
	);
};

export default PokemonDetails;
