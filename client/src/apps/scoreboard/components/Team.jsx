import { Player } from "./Player.jsx";
import { State as PlayerState } from "../lib/Player.js";
import { BsPlus } from "react-icons/bs";

export function Team({ team, data, dispatch }) {
	const { scoreboardData } = data;
	const { scoreboardDispatch } = dispatch;

	return (
		<div className="overflow-hidden bg-white rounded-lg shadow">
			<div className="px-4 py-5 sm:p-6">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-medium leading-6 text-gray-900">{ team.name }</h2>
					<h2 className="max-w-xl mt-2 text-lg text-gray-500">Points: { team.roster.reduce((acc, player) => acc + player.stats.points, 0) }</h2>

					<button
						className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						onClick={ () => scoreboardDispatch({
							type: "Scoreboard.addPlayerToTeam",
							data: {
								teamId: team.id,
								player: PlayerState({
									info: {
										name: `Player ${ team.roster.length + 1 }`,
									},
								}),
							}
						}) }
					>
						<BsPlus />
					</button>
				</div>
				<div className="max-w-xl mt-2 text-sm text-gray-500">
					{ team.roster.map((player, index) => {
						return (
							<Player
								key={ player.id }
								player={ player }
								data={ data }
								dispatch={ dispatch }
							/>
						);
					}) }
				</div>
			</div>
		</div>
	);
};

export default Team;