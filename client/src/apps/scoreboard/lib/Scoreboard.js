import { v4 as uuid } from "uuid";

import { Reducers as TeamReducers } from "./Team";
import { Reducers as PlayerReducers } from "./Player";

export const Name = "Scoreboard";

export const Lookup = {
	team: (state, id) => state.teams.find((t) => t.id === id),
	player: (state, id) => state.teams.reduce((acc, team) => {
		const player = team.roster.find((p) => p.id === id);
		if(player) {
			acc = player;
		}

		return acc;
	}, null),
	teamByPlayer: (state, playerId) => state.teams.find((team) => {
		return team.roster.find((player) => player.id === playerId);
	}),
};

export const Reducers = {
	addTeam: (state, { team }) => {
		return {
			...state,
			teams: [
				...state.teams,
				team,
			],
		};
	},
	removeTeam: (state, { team }) => ({
		...state,
		teams: state.teams.filter((t) => t.id !== team.id),
	}),
	addPlayerToTeam: (state, { teamId, player }) => {
		const team = Lookup.team(state, teamId);
		if(!team) {
			return state;
		}

		// find the index of the team
		const teamIndex = state.teams.findIndex((t) => t.id === team.id);
		if(teamIndex === -1) {
			return state;
		}

		// create a new teams array
		const newTeams = [ ...state.teams ];
		newTeams[ teamIndex ] = TeamReducers.addPlayer(team, { player });

		return {
			...state,
			teams: newTeams,
		};
	},
	addPointsToPlayer: (state, { playerId, points }) => {
		const player = Lookup.player(state, playerId);
		if(!player) {
			return state;
		}

		return {
			...state,
			teams: state.teams.map((team) => {
				const playerIndex = team.roster.findIndex((p) => p.id === player.id);
				if(playerIndex !== -1) {
					// create a new roster array
					const newRoster = [ ...team.roster ];
					newRoster[ playerIndex ] = PlayerReducers.addPoints(player, { points });

					return {
						...team,
						roster: newRoster,
					}
				}

				return team;
			}),
		};
	},
};

export const State = (state = {}) => ({
	id: uuid(),
	teams: [],
	...state,
});

export default {
	Name,
	Reducers,
	State,
	Lookup,
};