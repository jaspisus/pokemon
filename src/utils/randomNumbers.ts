const randomNumbers = (min: number, max: number, amount: number): number[] => {
	let result = [];

	for (let i = 0; i < amount; i++) {
		result.push(Math.floor(Math.random() * max) + min);
	}

	return result;
};

export default randomNumbers;
