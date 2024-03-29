import { v4 as uuid } from "uuid";

export const Name = "Team";

export const Reducers = {
	addPlayer: (state, { player }) => {
		return {
			...state,
			roster: [
				...state.roster,
				player,
			],
		};
	},
	removePlayer: (state, { player }) => ({
		...state,
		roster: state.roster.filter((p) => p.id !== player.id),
	}),
	setName: (state, { name }) => ({
		...state,
		name,
	}),
};

export const State = (state = {}) => ({
	id: uuid(),
	name: "",
	roster: [],
	...state,
});

export default {
	Name,
	Reducers,
	State,
};