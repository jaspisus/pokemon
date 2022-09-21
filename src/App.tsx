import { useEffect, useState } from 'react';
import './App.scss';

const App = () => {
	const [data, setData] = useState<any[]>([]);
	const [details, setDetails] = useState<any[]>([]);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/')
			.then((response) => response.json())
			.then((data) => {
				setData(data.results);
			});
	}, []);

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

	if (!details.length) {
		return <>Loading...</>;
	}

	return (
		<div className="App">
			<ul>
				{details.map((pokemon, index) => (
					<li>{`${pokemon.id}, ${pokemon.name}, ${pokemon.types[0].type.name}`}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
