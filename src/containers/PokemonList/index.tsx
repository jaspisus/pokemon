import { useEffect, useState } from 'react';
import MainTable from '../../components/MainTable';
import './PokemonList.scss';

interface IProps {
	prop?: any;
}

const PokemonList = (props: IProps) => {
	const { prop } = props;

	const [data, setData] = useState<any[]>([]);
	const [details, setDetails] = useState<any[]>([]);
	const [regions, setRegions] = useState<any[]>([]);
	const [pokemonValues, setPokemonValues] = useState<any[]>([]);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/')
			.then((response) => response.json())
			.then((data) => {
				setData(data.results);
			});
	}, []);

	useEffect(() => {
		if (data.length) {
			Promise.all(
				data.map((pokemon) =>
					fetch(pokemon.url).then((response) => response.json())
				)
			).then((data) => {
				setDetails(data);
			});
		}
	}, [data]);

	useEffect(() => {
		if (details.length) {
			Promise.all(
				details.map((pokemon) =>
					fetch(`https://pokeapi.co/api/v2/location/${pokemon.id}/`).then(
						(response) => response.json()
					)
				)
			).then((data) => {
				setRegions(data);
			});
		}
	}, [details]);

	useEffect(() => {
		if (data.length && details.length && regions.length) {
			setPokemonValues(
				data.map((_, index) => ({
					id: details[index].id,
					thumbnail: details[index].sprites.front_default,
					name: details[index].name,
					types: details[index].types.map((slot: any) => slot.type.name),
					region: regions[index].region.name,
				}))
			);
		}
	}, [data, details, regions]);

	if (!details.length) {
		return <>Loading...</>;
	}

	return (
		<>
			<MainTable values={pokemonValues} />
		</>
	);
};

export default PokemonList;
