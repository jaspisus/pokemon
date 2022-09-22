import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './MainTable.scss';

interface IProps {
	values: any[];
	isDataFetching: boolean;
}

const MainTable = (props: IProps) => {
	const { values, isDataFetching } = props;

	console.log(values);

	if (!values.length) {
		return <div>Loading...</div>;
	}

	const curtainClassName = classnames('main-table__curtain', {
		'main-table__curtain--visible': isDataFetching,
	});

	return (
		<div className="main-table">
			<div className={curtainClassName} />
			<table className="main-table__table">
				<thead>
					<tr>
						<th className="main-table__heading">ID</th>
						<th className="main-table__heading">nazwa</th>
						<th className="main-table__heading">typy</th>
						<th className="main-table__heading">region</th>
					</tr>
				</thead>
				<tbody>
					{values.map((pokemon, index) => (
						<tr key={index} className="main-table__row">
							<td className="main-table__cell main-table__cell--id">
								{pokemon.id}
							</td>
							<td className="main-table__cell main-table__cell--name">
								<img
									src={pokemon.thumbnail}
									className="main-table__thumbnail"
									alt="pokemon thumbnail"
								/>
								<Link to={`/pokemon/details?id=${pokemon.id}`}>
									{pokemon.name}
								</Link>
							</td>
							<td className="main-table__cell">{pokemon.types.join(', ')}</td>
							<td className="main-table__cell">{pokemon.region}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MainTable;
