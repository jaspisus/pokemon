import { useCallback, useEffect, useState } from 'react';
import MainTable from '../../components/MainTable';
import fetchList from '../../utils/fetchList';
import './PokemonList.scss';

type TPaginationLinks = [string, string];

const pageLimit = 15;

const PokemonList = () => {
	const [data, setData] = useState<any[]>([]);
	const [details, setDetails] = useState<any[]>([]);
	const [regions, setRegions] = useState<any[]>([]);
	const [pokemonValues, setPokemonValues] = useState<any[]>([]);
	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);
	const [paginationLinks, setPaginationLinks] = useState<TPaginationLinks>([
		'',
		'',
	]);

	const handleData = useCallback((data: any) => {
		setData(data.results);
		setPaginationLinks([data.previous ?? '', data.next ?? '']);
	}, []);

	useEffect(() => {
		const url = `https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}`;

		fetchList({ handleData, setIsDataFetching, url });
	}, [handleData]);

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

	const onPrev = () => {
		setIsDataFetching(true);
		fetchList({ handleData, setIsDataFetching, url: paginationLinks[0] });
	};

	const onNext = () => {
		setIsDataFetching(true);
		fetchList({ handleData, setIsDataFetching, url: paginationLinks[1] });
	};

	return (
		<div className="pokemon-list">
			<MainTable values={pokemonValues} isDataFetching={isDataFetching} />
			<div className="pokemon-list__buttons">
				<button
					onClick={onPrev}
					disabled={!paginationLinks[0] || isDataFetching}
				>
					Prev
				</button>
				<button
					onClick={onNext}
					disabled={!paginationLinks[1] || isDataFetching}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default PokemonList;
