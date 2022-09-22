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
				navigate('/');
			}}
			FallbackComponent={Error}
		>
			<Routes>
				<Route path="/" element={<PokemonList />} />
				<Route path="/pokemon" element={<PokemonDetails />} />
				<Route path="/compare" element={<PokemonComparison />} />
			</Routes>
		</ErrorBoundary>
	);
};

export default MainRoutes;
