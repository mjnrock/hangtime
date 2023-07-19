import { useNode } from "../@node/react/useNode.js";
import { State, Nodes } from "../apps/scoreboard/main.js";

import { Team } from "../apps/scoreboard/components/Team.jsx";

export function Default() {
	const { state: scoreboardData, dispatch: scoreboardDispatch } = useNode(Nodes.Scoreboard);

	console.log("scoreboardData", scoreboardData);

	const middleware = (payload) => {
		scoreboardDispatch(payload);
	};

	return (
		<>
			<h1>Default</h1>

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

			<button onClick={ () => middleware({
				type: "Scoreboard.addTeam",
				data: {
					team: State.Team({
						name: `Team ${ scoreboardData.teams.length + 1 }`,
					}),
				},
			}) }>Add Team</button>
		</>
	);
};

export default Default;