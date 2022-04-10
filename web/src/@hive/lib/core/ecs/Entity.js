import Agent from "../Agent";

export class Entity extends Agent {
	constructor({ state, Agent = {} } = {}) {
		super({ ...Agent, state });

		this.registry = new Map();

		return new Proxy(this, {
			get: (target, prop) => {
				if(!(prop in target)) {
					// Allow selection of Modules/Components directly
					if(target.registry.has(prop)) {
						return target.registry.get(prop);
					}
				}

				return Reflect.get(target, prop);
			},
		});
	}
};

export default Entity;