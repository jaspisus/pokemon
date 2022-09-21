interface IProps {
	values: any[];
}

const MainTable = (props: IProps) => {
	const { values } = props;

	return (
		<table className="pokemon-list">
			<thead>
				<tr>
					<th className="pokemon-list__heading">ID</th>
					<th className="pokemon-list__heading">name</th>
					<th className="pokemon-list__heading">types</th>
					<th className="pokemon-list__heading">Region</th>
				</tr>
			</thead>
			<tbody>
				{values.map((pokemon, index) => (
					<tr key={index} className="pokemon-list__table-row">
						<td className="pokemon-list__table-cell pokemon-list__table-cell--id">
							{pokemon.id}
						</td>
						<td className="pokemon-list__table-cell pokemon-list__table-cell--name">
							<img
								src={pokemon.thumbnail}
								className="pokemon-list__thumbnail"
								alt="pokemon thumbnail"
							/>
							{pokemon.name}
						</td>
						<td className="pokemon-list__table-cell">
							{pokemon.types.join(', ')}
						</td>
						<td className="pokemon-list__table-cell">{pokemon.region}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default MainTable;
