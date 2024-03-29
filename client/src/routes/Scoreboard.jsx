import { useNode } from "../@node/react/useNode.js";
import { State, Nodes } from "../apps/scoreboard/main.js";

import { Team } from "../apps/scoreboard/components/Team.jsx";

import { BsPeople } from "react-icons/bs";

export function Scoreboard() {
	const { state: scoreboardData, dispatch: scoreboardDispatch } = useNode(Nodes.Scoreboard);

	return (
		<div className="p-4 m-2 border rounded border-neutral-200">
			{
				scoreboardData.teams.map((team, index) => {
					return (
						<Team
							key={ team.id }
							data={ { scoreboardData } }
							dispatch={ { scoreboardDispatch } }
							team={ team }
						/>
					);
				})
			}

			<div className="flex flex-row items-center justify-center mt-4">
				<button
					className="p-2 text-white bg-purple-500 rounded-full hover:bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
					onClick={ () => scoreboardDispatch({
						type: "Scoreboard.addTeam",
						data: {
							team: State.Team({
								name: `Team ${ scoreboardData.teams.length + 1 }`,
							}),
						},
					}) }
				>
					<BsPeople className="text-[4rem]" />
				</button>
			</div>
		</div>
	);
};

export default Scoreboard;