import Agent from "../Agent";

export class System extends Agent {
	static NotifyTrigger = "@dispatch";

	constructor(component, {} = {}) {
		super();

		this.component = component;
		
		const handlers = {
			event: (node, comp, args = [], {} = {}) => {
				comp.func(...args);
			},
		};

		this.toggle("isReducer", false);
	}

	invoke(trigger, args = [], nodes = []) {
		//TODO Pseudo code
		for(let node of nodes) {
			const comp = node.components.get(this.component);

			super.invoke(trigger, node, comp, ...args);
			super.invoke(System.NotifyTrigger, trigger, this.component);
		}
	}
};

export default System;