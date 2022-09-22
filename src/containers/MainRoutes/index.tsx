import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Error from '../../components/Error';
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
			</Routes>
		</ErrorBoundary>
	);
};

export default MainRoutes;
