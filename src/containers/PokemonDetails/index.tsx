import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import fetchList from '../../utils/fetchList';
import useQuery from '../../utils/useQuery';
import './PokemonDetails.scss';

const PokemonDetails = () => {
	const [pokemonData, setPokemonData] = useState<any>({});
	const [evolutionData, setEvolutionData] = useState<any>({});
	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

	const id = useQuery()?.get('id');
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const evolutionsUrl = `https://pokeapi.co/api/v2/evolution-chain/${id}`;

	const navigate = useNavigate();

	const handlePokemonData = (data: any) => {
		setPokemonData(data);
	};

	const handleEvolutionsData = (data: any) => {
		setEvolutionData(data);
	};

	const handleError = useCallback(() => {
		navigate('/');
	}, [navigate]);

	useEffect(() => {
		if (!id) {
			navigate('/');

			return;
		}

		fetchList({ handleData: handlePokemonData, handleError, url: pokemonUrl });
		fetchList({
			handleData: handleEvolutionsData,
			handleError,
			url: evolutionsUrl,
			setIsDataFetching,
		});
	}, [evolutionsUrl, handleError, id, navigate, pokemonUrl]);

	if (isDataFetching || !Object.keys(pokemonData).length) {
		return <div>Loading...</div>;
	}

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
