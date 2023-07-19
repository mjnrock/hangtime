import { Node as NodeClass } from "../../@node/Node";
import Core from "./lib/package";

export { Core };

export const Reducers = {
	addTeam: (state, { team }) => {
		return Core.Reducers.Scoreboard.addTeam(state, { team });
	},
	addPlayerToTeam: (state, { teamId, player }) => {
		return Core.Reducers.Scoreboard.addPlayerToTeam(state, { player, teamId });
	},
	addPointsToPlayer: (state, { playerId, points }) => {
		return Core.Reducers.Scoreboard.addPointsToPlayer(state, { playerId, points });
	},
};

export const Nodes = NodeClass.CreateMany({
	Scoreboard: {
		state: Core.State.Scoreboard({}),
		reducers: Reducers,
	},
});

export default {
	Core,
	Nodes,
};