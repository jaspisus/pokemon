import { useContext } from 'react';
import UserData from '../../GlobalState/userData';
import './UserDetails.scss';

const UserDetails = () => {
	const {
		userData: { trainerName, trainerLocation, starterPokemon },
	} = useContext(UserData);

	if (!trainerName) {
		return null;
	}

	return (
		<div className="user-details">
			{`Witaj ${trainerName}, z ${trainerLocation} a mój pokemon to ${starterPokemon}`}
		</div>
	);
};

export default UserDetails;
