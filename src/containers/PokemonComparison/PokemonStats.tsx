import { useEffect, useState } from 'react';
import fetchList from '../../utils/fetchList';
import Select from './Select';
import './PokemonComparison.scss';

interface IProps {
	pokemonNames: string[];
}

const statsToShow = ['hp', 'attack', 'defense', 'speed'] as const;

type TStats = { [K in typeof statsToShow[number]]?: string };

const PokemonStats = (props: IProps) => {
	const { pokemonNames } = props;

	const [isDataFetching, setIsDataFetching] = useState<boolean>(true);
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonData, setPokemonData] = useState<any>({});

	const onSelect = (e: any) => {
		setIsDataFetching(true);
		setPokemonName(e.target.value);
	};

	const handleData = (data: any) => {
		setPokemonData(data);
	};

	useEffect(() => {
		const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName || 1}/`;

		fetchList({
			url,
			handleData,
			setIsDataFetching,
		});
	}, [pokemonName]);

	if (isDataFetching) {
		return (
			<div className="pokemon-stats">
				<img alt="pokemon thumbnail" className="pokemon-stats__thumbnail" />
				<Select
					value={pokemonName}
					data={pokemonNames}
					name="left"
					onChange={onSelect}
				/>
				<div>Loading...</div>
			</div>
		);
	}

	const stats: TStats = {};

	statsToShow.forEach((statName) => {
		const stat = pokemonData.stats.find(
			(entry: any) => entry.stat.name === statName
		);

		stats[statName] = stat.base_stat;
	});

	return (
		<div className="pokemon-stats">
			<img
				src={pokemonData.sprites.front_default}
				alt="pokemon thumbnail"
				className="pokemon-stats__thumbnail"
			/>
			<Select
				value={pokemonName}
				data={pokemonNames}
				name="left"
				onChange={onSelect}
			/>
			<ul>
				{statsToShow.map((stat, index) => (
					<li key={index}>{`${stat}: ${stats[stat]}`}</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonStats;
