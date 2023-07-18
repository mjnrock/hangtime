import React, { useState } from 'react';

export function Scoreboard() {
	const [ teams, setTeams ] = useState([
		{
			name: 'Team 1',
			players: [ { name: 'Player 1', score: 0 } ],
		},
	]);

	const incrementScore = (teamIndex, playerIndex) => {
		setTeams((prevTeams) => {
			const updatedTeams = [ ...prevTeams ];
			updatedTeams[ teamIndex ].players[ playerIndex ].score += 1;
			return updatedTeams;
		});
	};

	const decrementScore = (teamIndex, playerIndex) => {
		if(teams[ teamIndex ].players[ playerIndex ].score > 0) {
			setTeams((prevTeams) => {
				const updatedTeams = [ ...prevTeams ];
				updatedTeams[ teamIndex ].players[ playerIndex ].score -= 1;
				return updatedTeams;
			});
		}
	};

	const addPlayer = (teamIndex) => {
		setTeams((prevTeams) => {
			const updatedTeams = [ ...prevTeams ];
			const newPlayerName = `Player ${ prevTeams[ teamIndex ].players.length + 1 }`;
			updatedTeams[ teamIndex ].players.push({ name: newPlayerName, score: 0 });
			return updatedTeams;
		});
	};

	const removePlayer = (teamIndex, playerIndex) => {
		setTeams((prevTeams) => {
			const updatedTeams = [ ...prevTeams ];
			updatedTeams[ teamIndex ].players = updatedTeams[ teamIndex ].players.filter((_, index) => index !== playerIndex);
			return updatedTeams;
		});
	};

	const addTeam = () => {
		setTeams((prevTeams) => {
			const newTeamName = `Team ${ prevTeams.length + 1 }`;
			const updatedTeams = [ ...prevTeams, { name: newTeamName, players: [ { name: 'Player 1', score: 0 } ] } ];
			return updatedTeams;
		});
	};

	const removeTeam = (teamIndex) => {
		setTeams((prevTeams) => {
			const updatedTeams = prevTeams.filter((_, index) => index !== teamIndex);
			return updatedTeams;
		});
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Scoreboard</h1>

			<div className="flex flex-row items-center justify-center">
				{ teams.map((team, teamIndex) => (
					<div className="flex flex-col items-center justify-center" key={ teamIndex }>
						<div className="flex flex-row items-center justify-center">
							{ teams.length > 1 && (
								<button
									className="px-4 py-2 m-2 text-white bg-gray-500 rounded shadow-sm hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									onClick={ () => removeTeam(teamIndex) }
								>
									Remove Team
								</button>
							) }
						</div>
						{ team.name }
						<div>Total Team Score: { team.players.reduce((totalScore, player) => totalScore + player.score, 0) }</div>
						{ team.players.map((player, playerIndex) => (
							<div key={ playerIndex }>
								{ player.name }
								<div>Score: { player.score }</div>
								<div className="flex flex-row items-center justify-center">
									<button
										className="px-4 py-2 m-2 text-white bg-green-500 rounded shadow-sm hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										onClick={ () => incrementScore(teamIndex, playerIndex) }
									>
										+
									</button>
									<button
										className="px-4 py-2 m-2 text-white bg-red-500 rounded shadow-sm hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
										onClick={ () => decrementScore(teamIndex, playerIndex) }
									>
										-
									</button>
								</div>
								{ team.players.length > 1 && (
									<button
										className="px-4 py-2 m-2 text-white bg-gray-500 rounded shadow-sm hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
										onClick={ () => removePlayer(teamIndex, playerIndex) }
									>
										Remove Player
									</button>
								) }
							</div>
						)) }
						<button
							className="px-4 py-2 m-2 text-white bg-blue-500 rounded shadow-sm hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							onClick={ () => addPlayer(teamIndex) }
						>
							Add Player
						</button>
					</div>
				)) }
			</div>

			<button
				className="px-4 py-2 mt-4 text-white bg-blue-500 rounded shadow-sm hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				onClick={ addTeam }
			>
				Add Team
			</button>
		</div>
	);
}

export default Scoreboard;