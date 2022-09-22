import { useContext, useEffect, useState } from 'react';
import UserData from '../../GlobalState/userData';
import fetchList from '../../utils/fetchList';
import randomNumbers from '../../utils/randomNumbers';
import useAllPokemons from '../../utils/useAllPokemons';
import './Modal.scss';

const url = 'https://pokeapi.co/api/v2/location/';

const Modal = () => {
	const [locationData, setLocationData] = useState<any[]>([]);
	const [drawnPokemons, setDrawnPokemons] = useState<any[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

	const { userData, setUserData } = useContext(UserData);

	const handleData = (data: any) => {
		setLocationData(data.results);
	};

	const pokemonData = useAllPokemons();

	useEffect(() => {
		fetchList({
			url,
			handleData,
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

		setUserData({
			trainerName: event.target.trainer.value,
			trainerLocation: event.target.region.value,
			starterPokemon: event.target.pokemon.value,
		});

		setIsModalVisible(false);
	};

	if ((!isModalVisible && !isDataFetching) || Object.keys(userData).length) {
		return null;
	}

	return (
		<>
			<div className="modal">
				<form onSubmit={handleSubmit} className="modal__form">
					<fieldset className="modal__fieldset">
						<legend>Trener Pokemonów</legend>
						<input name="trainer" type="text" required />
					</fieldset>
					<fieldset className="modal__fieldset">
						<legend>Lokalizacja</legend>
						<select name="region" required>
							{locationData.map((region: any, index: number) => (
								<option key={index}>{region.name}</option>
							))}
						</select>
					</fieldset>
					<fieldset className="modal__fieldset">
						<legend>Wybierz startowego pokemona</legend>
						{drawnPokemons.map((pokemon) => (
							<div>
								<input
									type="radio"
									id={pokemon}
									name="pokemon"
									value={pokemon}
									required
									className="modal__pokemon-choice"
								/>
								<label htmlFor={pokemon}>{pokemon}</label>
							</div>
						))}
					</fieldset>
					<button className="modal__save-btn">Zapisz</button>
				</form>
			</div>
			<div className="modal-backdrop" />
		</>
	);
};

export default Modal;
