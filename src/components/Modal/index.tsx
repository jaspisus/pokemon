import { useEffect, useState } from 'react';
import fetchList from '../../utils/fetchList';
import randomNumbers from '../../utils/randomNumbers';
import './Modal.scss';

interface IProps {
	prop?: any;
}

const locationUrl = 'https://pokeapi.co/api/v2/location/';
const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

const Modal = (props: IProps) => {
	const { prop } = props;
	const [locationData, setLocationData] = useState<any[]>([]);
	const [pokemonData, setPokemonData] = useState<any[]>([]);
	const [drawnPokemons, setDrawnPokemons] = useState<any[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

	const handleLocationData = (data: any) => {
		setLocationData(data.results);
	};

	const handlePokemonData = (data: any) => {
		setPokemonData(data.results);
	};

	useEffect(() => {
		fetchList({ url: locationUrl, handleData: handleLocationData });
		fetchList({
			url: pokemonsUrl,
			handleData: handlePokemonData,
			setIsDataFetching,
		});
	}, []);

	useEffect(() => {
		if (pokemonData.length) {
			const pokemonNames = pokemonData.map((pokemon) => pokemon.name);
			const randomIndexes = randomNumbers(0, pokemonNames.length, 3);
			const pickedNames = pokemonNames.filter((_, index) =>
				randomIndexes.includes(index)
			);

			setDrawnPokemons(pickedNames);
		}
	}, [pokemonData]);

	useEffect(() => {
		const timeoutIndex = setTimeout(() => {
			setIsModalVisible(true);
		}, 5000);

		return () => {
			clearTimeout(timeoutIndex);
		};
	}, []);

	const handleSubmit = (event: any) => {
		event.preventDefault();

		console.log(event.target.trainer.value);
		console.log(event.target.region.value);
		console.log(event.target.pokemon.value);

		setIsModalVisible(false);
	};

	if (!isModalVisible) {
		return null;
	}

	return (
		<>
			<div className="modal">
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>Trener Pokemonów</legend>
						<input name="trainer" type="text" required />
					</fieldset>
					<fieldset>
						<legend>Lokalizacja</legend>
						<select name="region" required>
							{locationData.map((region: any, index: number) => (
								<option key={index}>{region.name}</option>
							))}
						</select>
					</fieldset>
					<fieldset>
						<legend>Wybierz startowego pokemona</legend>
						{drawnPokemons.map((pokemon) => (
							<div>
								<input
									type="radio"
									id={pokemon}
									name="pokemon"
									value={pokemon}
									required
								/>
								<label htmlFor={pokemon}>{pokemon}</label>
							</div>
						))}
					</fieldset>
					<button>Zapisz</button>
				</form>
			</div>
			<div className="modal-backdrop" />
		</>
	);
};

export default Modal;
