import { Name as PlayerName, Reducers as PlayerReducers, State as PlayerState } from "./Player";
import { Name as TeamName, Reducers as TeamReducers, State as TeamState } from "./Team";
import { Name as ScoreboardName, Reducers as ScoreboardReducers, State as ScoreboardState } from "./Scoreboard";

export const Name = {
	Player: PlayerName,
	Team: TeamName,
	Scoreboard: ScoreboardName,
};

export const Reducers = {
	Player: PlayerReducers,
	Team: TeamReducers,
	Scoreboard: ScoreboardReducers,
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