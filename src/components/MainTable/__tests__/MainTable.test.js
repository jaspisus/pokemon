import { render, cleanup, screen } from '@testing-library/react';
import MainTable from '..';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Link: () => <span />,
}));

const mockValues = [
	{
		id: 1,
		thumbnail:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		name: 'bulbasaur',
		types: ['grass', 'poison'],
		region: 'sinnoh',
	},
];

describe('MainTable', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders table', () => {
		render(<MainTable values={mockValues} isDataFetching={false} />);

		expect(screen.getByText(/nazwa/)).toBeInTheDocument();
	});
});
