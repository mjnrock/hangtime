import Agent from "../Agent";

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
	$(entity, trigger, ...args) {
		if(trigger !== void 0) {
			return entity[ this.nomen ].$(trigger, ...args);
		}

		return entity[ this.nomen ].$;
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