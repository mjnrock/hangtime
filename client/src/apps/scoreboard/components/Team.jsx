import { Player } from "./Player.jsx";
import { State as PlayerState } from "../lib/Player.js";
import { BsPerson } from "react-icons/bs";
import { EditableLabel } from "../../../components/EditableLabel.jsx";

export function Team({ team, data, dispatch }) {
	const { scoreboardData } = data;
	const { scoreboardDispatch } = dispatch;

	return (
		<div className="flex flex-col items-center justify-center w-full border border-solid rounded shadow border-neutral-200">
			<div className="flex flex-col items-center justify-center w-full">
				<div className="flex flex-row items-center justify-center w-full gap-2 p-2">
					<div className="flex flex-row items-center justify-center flex-1">
						<EditableLabel
							inputClassName="text-3xl w-full px-2 py-1 border border-solid rounded outline-none border-neutral-200 focus:border-transparent focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
							labelClassName="text-3xl w-full px-2 py-1 border border-solid rounded border-transparent"
							initialValue={ team.name }
							onChange={ value => scoreboardDispatch({
								type: "editTeamName",
								data: {
									teamId: team.id,
									name: value
								}
							}) }
							onBlur={ value => scoreboardDispatch({
								type: "editTeamName",
								data: {
									teamId: team.id,
									name: value
								}
							}) }
						/>
					</div>

					<div className="flex flex-row items-center justify-center flex-1">
						<div className="text-7xl">{ team.roster.reduce((acc, player) => acc + player.stats.points, 0) }</div>
					</div>

					<div className="flex flex-row items-center justify-center flex-1">
						<button
							className="p-2 text-white bg-blue-400 rounded-full hover:bg-blue-500 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
							onClick={ () => scoreboardDispatch({
								type: "addPlayerToTeam",
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
							<BsPerson className="text-[3rem]" />
						</button>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center w-full">
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
		</div >
	);
};

export default Team;