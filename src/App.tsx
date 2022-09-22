import './App.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import Modal from './components/Modal';
import MainRoutes from './containers/MainRoutes';

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<div className="app__header">
					<Link to="/">Pokemon List</Link>
				</div>
				<main className="app__main">
					<MainRoutes />
				</main>
			</BrowserRouter>
		</div>
	);
};

export default App;
