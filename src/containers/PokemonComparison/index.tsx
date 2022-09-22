import useAllPokemons from '../../utils/useAllPokemons';
import PokemonStats from './PokemonStats';

const PokemonComparison = () => {
	const { pokemonNames } = useAllPokemons();

	return (
		<div className="pokemon-comparison">
			<PokemonStats pokemonNames={pokemonNames} />
			<PokemonStats pokemonNames={pokemonNames} />
		</div>
	);
};

export default PokemonComparison;
