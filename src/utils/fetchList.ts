interface IParams {
	handleData: Function;
	setIsDataFetching?: Function;
	url: string;
}

const fetchList = (props: IParams) => {
	const { handleData, setIsDataFetching, url } = props;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			handleData(data);
			setIsDataFetching?.(false);
		});
};

export default fetchList;
