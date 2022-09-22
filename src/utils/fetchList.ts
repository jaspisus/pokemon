interface IParams {
	handleData: Function;
	handleError?: Function;
	setIsDataFetching?: Function;
	url: string;
}

const fetchList = (props: IParams) => {
	const { handleData, handleError, setIsDataFetching, url } = props;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			handleData(data);
			setIsDataFetching?.(false);
		})
		.catch((error) => {
			handleError?.(error);
		});
};

export default fetchList;
