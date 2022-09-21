import './App.scss';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import PokemonList from './containers/PokemonList';
import PokemonDetails from './containers/PokemonDetails';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<NavLink to="/">Pokemon List</NavLink>
				<Routes>
					<Route path="/" element={<PokemonList />} />
					<Route path="/pokemon" element={<PokemonDetails />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
