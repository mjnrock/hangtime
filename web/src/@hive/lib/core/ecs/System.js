import Agent from "../Agent";
import Module from "./Module";

//TODO Figure out a place to do a System Dictionary

export class System extends Agent {
	constructor(nomen, events = {}, { state, Agent = {} } = {}) {
		super({ ...Agent, state });

		// System expects this to match a Module.nomen exactly
		this.nomen = nomen;

		this.toggle("isReducer", false);

		for(let [ trigger, handlers ] of Object.entries(events)) {
			if(!Array.isArray(handlers)) {
				handlers = [ handlers ];
			}

			this.addTrigger(trigger, ...handlers);
		}

		return new Proxy(this, {
			get: (target, prop) => {
				if(typeof prop === "string" && prop[ 0 ] === "$") {
					return (...args) => target.invoke(prop.substring(1), ...args);
				}

				return Reflect.get(target, prop);
			},
		});
	}

	check(entity) {
		return !!entity[ this.nomen ];
	}
	get(entity) {
		return entity[ this.nomen ];
	}

	/**
	 * A convenience wrapper for Module.Add that already includes @this references,
	 * thus allowing System to act in a factory-like capacity, given an @entity
	 * and a @componentClass
	 */
	affix(entity, componentClass, { args = [], tags = [] } = {}) {
		if(Array.isArray(entity)) {
			for(let ent of entity) {
				Module.Add(this.nomen, { entity: ent, componentClass, system: this, args, tags });
			}
		}

		return Module.Add(this.nomen, { entity, componentClass, system: this, args, tags });
	}
	$(entity, trigger, ...args) {
		if(Array.isArray(entity)) {
			let ret = new Map();
			for(let ent of entity) {
				ret.set(entity, this.$(ent, trigger, ...args));
			}

			return ret;
		}

		if(trigger !== void 0) {
			return entity[ this.nomen ].$(trigger, ...args);
		}

		return entity[ this.nomen ].$;
	}
	async a$(entity, trigger, ...args) {
		return await this.$(entity, trigger, ...args);
	}

	
	//? Reminder
	// [
	// 	args,
	// 	{
	// 		namespace: this.config.namespace,
	// 		trigger: trigger,
	// 		target: this,
	// 		state: this.state,
	// 		invoke: this.invoke,
			
	// 		...this.config.globals,
	// 	}
	// ];
	// /**
	//  * Example handler
	//  */
	// onTrigger([ moduleInstance, ...args ], obj = {}) {

	// }
};

export default System;