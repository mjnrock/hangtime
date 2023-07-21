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
	editTeamName: (state, { teamId, name }) => {
		const team = Core.Lookup.Scoreboard.team(state, teamId);
		if(!team) {
			return state;
		}

		const teamIndex = state.teams.findIndex((t) => t.id === team.id);
		if(teamIndex === -1) {
			return state;
		}

		const newTeams = [ ...state.teams ];
		newTeams[ teamIndex ] = Core.Reducers.Team.setName(team, { name });

		return {
			...state,
			teams: newTeams,
		};
	},
	editPlayerName: (state, { playerId, name }) => {
		console.log("editPlayerName", playerId, name)
		const player = Core.Lookup.Scoreboard.player(state, playerId);
		if(!player) {
			return state;
		}
		
		const nextPlayer = Core.Reducers.Player.setName(player, { name });
		const team = Core.Lookup.Scoreboard.teamByPlayer(state, playerId);
		if(!team) {
			return state;
		}

		console.log(player, nextPlayer, team)

		const teamIndex = state.teams.findIndex((t) => t.id === team.id);
		if(teamIndex === -1) {
			return state;
		}

		console.log(player, nextPlayer, team, teamIndex)

		const newTeams = [ ...state.teams ];
		newTeams[ teamIndex ] = Core.Reducers.Team.replacePlayer(team, { oldPlayer: player, newPlayer: nextPlayer });

		console.log(player, nextPlayer, team, teamIndex, newTeams)

		return {
			...state,
			teams: newTeams,
		};
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