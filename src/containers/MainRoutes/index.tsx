import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Error from '../../components/Error';
import PokemonComparison from '../PokemonComparison';
import PokemonDetails from '../PokemonDetails';
import PokemonList from '../PokemonList';

const MainRoutes = () => {
	const navigate = useNavigate();

	return (
		<ErrorBoundary
			onReset={() => {
				navigate('/pokemon');
			}}
			FallbackComponent={Error}
		>
			<Routes>
				<Route path="/pokemon" element={<PokemonList />} />
				<Route path="/pokemon/details" element={<PokemonDetails />} />
				<Route path="/pokemon/compare" element={<PokemonComparison />} />
			</Routes>
		</ErrorBoundary>
	);
};

export default MainRoutes;
