import './App.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import Modal from './components/Modal';
import MainRoutes from './containers/MainRoutes';
import UserData from './GlobalState/userData';
import { useEffect, useState } from 'react';
import UserDetails from './components/UserDetails';

export interface IUserData {
	trainerName?: string;
	trainerLocation?: string;
	starterPokemon?: string;
}

const App = () => {
	const [userData, setUserData] = useState<IUserData>({});

	useEffect(() => {
		if (Object.keys(userData).length) {
			localStorage.setItem('USER_DATA', JSON.stringify(userData));
		}
	}, [userData]);

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem('USER_DATA') || '{}'));
	}, []);

	return (
		<div className="app">
			<UserData.Provider value={{ userData, setUserData }}>
				<BrowserRouter>
					<div className="app__header">
						<Link to="/pokemon">Lista Pokemonów</Link>
						<Link to="/pokemon/compare">Porównywarka Pokemonów</Link>
						<UserDetails />
					</div>
					<main className="app__main">
						<MainRoutes />
					</main>
				</BrowserRouter>
				<Modal />
			</UserData.Provider>
		</div>
	);
};

export default App;
