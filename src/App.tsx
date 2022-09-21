import './App.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import PokemonList from './containers/PokemonList';
import PokemonDetails from './containers/PokemonDetails';

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<div className="app__header">
					<Link to="/">Pokemon List</Link>
				</div>
				<main className="app__main">
					<Routes>
						<Route path="/" element={<PokemonList />} />
						<Route path="/pokemon" element={<PokemonDetails />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
};

export default App;
