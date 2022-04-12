import Agent from "../Agent";

export class Entity extends Agent {
	constructor({ state, Agent = {} } = {}) {
		super({ ...Agent, state });

		this.modules = new Map();

		return new Proxy(this, {
			get: (target, prop) => {
				if(!(prop in target)) {
					/**
					 * NOTE: This is singularly used to access the Module.state (i.e. Component) directly,
					 * via a << Entity[ module.name ] >> syntax.  See note in Component.
					 */
					if(target.modules.has(prop)) {
						return target.modules.get(prop).state;
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

	/**
	 * Will return either a single Module or
	 * and array of Modules, depending on the
	 * length of @inputs
	 */
	findModule(...inputs) {
		let isSingleResult = false;
		const ret = new Set();
		for(let input of inputs) {
			if(this.modules.has(input)) {
				// @input is a name
				ret.add(this.modules.get(input));

				if(inputs.length === 1) {
					isSingleResult = true;	// arg length is 1 AND value a name
				}
			} else {
				for(let module of this.modules) {
					if(module.tags.has(input)) {
						// @input is a tag
						ret.add(module);
					} else if(module.id === input) {
						// @input is an id
						ret.add(module);
					}
				}
			}
		}

		if(isSingleResult && ret.size === 1) {
			return ret.values().next().value;
		}

		return [ ...ret ];
	}
};

export default Entity;