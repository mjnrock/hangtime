import { v4 as uuid } from "uuid";

export const Name = "Player";

export const Reducers = {
	addPoints: (state, { points }) => {
		let nextPoints = Math.max(0, state.stats.points + points);

		if(nextPoints === state.stats.points) {
			return state;
		}

		return {
			...state,
			stats: {
				...state.stats,
				points: nextPoints,
				pointsHistory: [
					...state.stats.pointsHistory,
					[ Date.now(), points ],
				],
			},
		};
	},
	setName: (state, { name }) => ({
		...state,
		info: {
			...state.info,
			name,
		},
	}),
	setTeam: (state, { team }) => ({
		...state,
		info: {
			...state.info,
			team,
		},
	}),
};

export const State = (state = {}) => ({
	id: uuid(),
	info: {
		name: "",
		team: "",
		...(state?.info || {}),
	},
	stats: {
		points: 0,
		pointsHistory: [],
		...(state?.stats || {}),
	},
	...state,
});

export default {
	Name,
	State,
	Reducers,
};