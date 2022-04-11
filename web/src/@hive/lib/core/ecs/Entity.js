import Agent from "../Agent";

export class Entity extends Agent {
	constructor({ state, Agent = {} } = {}) {
		super({ ...Agent, state });

		this.modules = new Map();

		return new Proxy(this, {
			get: (target, prop) => {
				if(!(prop in target)) {
					// Allow selection of Modules/Components directly
					if(target.modules.has(prop)) {
						return target.modules.get(prop);
					}
				}

				return Reflect.get(target, prop);
			},
		});
	}

	register(key, value) {
		this.modules.set(key, value);

		return this;
	}
	unregister(key, value) {
		return this.modules.delete(key, value);
	}
};

export default Entity;