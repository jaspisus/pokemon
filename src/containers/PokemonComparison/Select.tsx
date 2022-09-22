interface IProps {
	data: string[];
	name: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select = (props: IProps) => {
	const { data, name, value, onChange } = props;

	return (
		<select name={name} onChange={onChange} value={value}>
			{data.map((value: any, index: number) => (
				<option key={index}>{value}</option>
			))}
		</select>
	);
};

export default Select;
