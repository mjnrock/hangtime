import { Name as PlayerName, Reducers as PlayerReducers, State as PlayerState } from "./Player";
import { Name as TeamName, Reducers as TeamReducers, State as TeamState } from "./Team";
import { Name as ScoreboardName, Reducers as ScoreboardReducers, State as ScoreboardState } from "./Scoreboard";

export const Name = {
	Player: PlayerName,
	Team: TeamName,
	Scoreboard: ScoreboardName,
};

const namespace = (name, reducers) => {
	const obj = {};

	for(const [ key, reducer ] of Object.entries(reducers)) {
		obj[ `${ name }.${ key }` ] = reducer;
	}

	return obj;
};
export const Reducers = {
	...namespace("Player", PlayerReducers),
	...namespace("Team", TeamReducers),
	...namespace("Scoreboard", ScoreboardReducers),
};

export const State = {
	Player: PlayerState,
	Team: TeamState,
	Scoreboard: ScoreboardState,
};

export default {
	Name,
	Reducers,
	State,
};