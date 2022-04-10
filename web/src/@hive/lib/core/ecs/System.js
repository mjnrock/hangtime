import Agent from "../Agent";

export class System extends Agent {

	constructor({ Agent = {} } = {}) {
		super(Agent);

		this.toggle("isReducer", false);
	}

	//TODO A System should basically be a Routing system for Agents with certain Components
};

export default System;