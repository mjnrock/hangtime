import React, { useState } from 'react';
import { BsPlus, BsDash, BsTrash } from "react-icons/bs";

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
		<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<h1 className="text-2xl font-semibold text-gray-900">Scoreboard</h1>

			{ teams.map((team, teamIndex) => (
				<div key={ teamIndex } className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
					<div className="overflow-hidden bg-white rounded-lg shadow">
						<div className="px-4 py-5 sm:p-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-medium leading-6 text-gray-900">{ team.name }</h3>
								{ teams.length > 1 && (
									<button
										className="p-2 text-white bg-gray-500 rounded-full hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
										onClick={ () => removeTeam(teamIndex) }
									>
										<BsTrash />
									</button>
								) }
							</div>
							<div className="max-w-xl mt-2 text-sm text-gray-500">
								<p>Total Team Score: { team.players.reduce((totalScore, player) => totalScore + player.score, 0) }</p>
							</div>
							{ team.players.map((player, playerIndex) => (
								<div key={ playerIndex } className="mt-5">
									<div className="flex items-center justify-between">
										<div>
											<h5 className="text-lg font-medium leading-6 text-gray-900">{ player.name }</h5>
											<div className="max-w-xl mt-2 text-sm text-gray-500">
												<p>Score: { player.score }</p>
											</div>
										</div>
										<div className="flex items-center justify-between space-x-4">
											<button
												className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
												onClick={ () => incrementScore(teamIndex, playerIndex) }
											>
												<BsPlus />
											</button>
											<button
												className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
												onClick={ () => decrementScore(teamIndex, playerIndex) }
											>
												<BsDash />
											</button>
											{ team.players.length > 1 && (
												<button
													className="p-2 text-white bg-gray-500 rounded-full hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
													onClick={ () => removePlayer(teamIndex, playerIndex) }
												>
													<BsTrash />
												</button>
											) }
										</div>
									</div>
								</div>
							)) }
							<button
								className="p-2 mt-5 text-white bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								onClick={ () => addPlayer(teamIndex) }
							>
								<BsPlus />
							</button>
						</div>
					</div>
				</div>
			)) }

			<div className="mt-5">
				<button
					className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					onClick={ addTeam }
				>
					<BsPlus />
				</button>
			</div>
		</div>
	);
}

export default Scoreboard;