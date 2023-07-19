import { analyze, clone } from "./util/clone";
import { IdentityClass } from "./Identity";

function safeStringify(obj) {
	const cache = new Set();

	function replacer(key, value) {
		if(typeof value === "object" && value !== null) {
			if(cache.has(value)) {
				return {}; // Replace circular reference with an empty object
			}
			cache.add(value);
		}
		return value;
	}

	return JSON.stringify(obj, replacer);
};

export class Node extends IdentityClass {
	static MergeReducer = (current, next) => {
		return {
			...current,
			...next,
		};
	};
	static UpdateReducer = (current, next) => next;
	static LogEffect = (self, state) => console.warn(`[@${ self.$id }]:`, state);

	static EventTypes = {
		PRE: "pre",
		INIT: "init",
		POST: "post",
		UPDATE: "update",
	};

	constructor ({ state = {}, events = {}, reducers = {}, effects = {}, registry, id, tags = [], ...rest } = {}) {
		super({ id, tags, ...rest });

		this.state = state;
		this.events = {
			reducers,
			effects: {},
			...events,
		};

		/**
		 * This can be a bit confusing, but `effects` are functions that are called
		 * when a *specific* action is dispatched. If you want a "catch all" effect,
		 * you can use the `Node.EventTypes.UPDATE` event.  For example, if you dispatch
		 * an action called `foo`, then any effects registered to `foo` will be called,
		 * and any handlers on the `Node.EventTypes.UPDATE` event will be called, also.
		 */
		for(const [ a, e ] of Object.entries(effects)) {
			this.addEffect(a, ...(Array.isArray(e) ? e : [ e ]));
		}
	}

	init(...args) {
		this.emit(Node.EventTypes.PRE, ...args);
		this.emit(Node.EventTypes.INIT, ...args);
		this.emit(Node.EventTypes.POST, ...args);

		return this;
	}



	dispatch(action, ...args) {
		// if(typeof action === "object") {
		// 	const { target, action: act } = action;
		// 	const registry = analyze(this.state);

		// 	if(!registry[ target ]) {
		// 		return this.state;
		// 	}

		// 	return this.state;
		// }

		let previous = clone(this.state);
		let state = this.state;

		if(this.events.reducers[ action ]) {
			state = this.events.reducers[ action ].call(this, state, ...args);
		}
		if(this.events.reducers.default) {
			state = this.events.reducers.default.call(this, state, ...args);
		}

		if(safeStringify(state) === safeStringify(previous)) {
			return state;
		}

		this.state = { ...state };
		this.emit(Node.EventTypes.UPDATE, state, previous, action);

		if(this.events.effects[ action ]) {
			for(const effect of this.events.effects[ action ]) {
				effect.call(this, state, ...args);
			}
		}

		return state;
	}

	async dispatchAsync(action, ...args) {
		let previous = clone(this.state);
		let state = this.state;

		if(this.events.reducers[ action ]) {
			state = await this.events.reducers[ action ].call(this, state, ...args);
		}

		if(safeStringify(state) === safeStringify(previous)) {
			return state;
		}

		this.state = { ...state };
		this.emit(Node.EventTypes.UPDATE, state, previous, this);

		if(this.events.effects[ action ]) {
			for(const effect of this.events.effects[ action ]) {
				effect.call(this, state, ...args);
			}
		}

		return state;
	}

	addReducer(action, reducer) {
		this.events.reducers[ action ] = reducer;

		return this;
	}

	addEffect(action, ...effects) {
		if(!this.events.effects[ action ]) {
			this.events.effects[ action ] = [];
		}
		this.events.effects[ action ].push(...effects);

		return this;
	}
	removeEffect(action, ...effects) {
		if(!this.events.effects[ action ]) {
			return;
		}
		this.events.effects[ action ] = this.events.effects[ action ].filter(effect => !effects.includes(effect));

		return this;
	}

	emit(event, ...args) {
		if(!this.events[ event ]) {
			return;
		}

		this.events[ event ].forEach(listener => listener(...args));
	}
	async emitAsync(event, ...args) {
		if(!this.events[ event ]) {
			return;
		}

		return Promise.all(this.events[ event ].map(listener => listener(...args)));
	}

	addEventListeners(event, ...listeners) {
		if(!this.events[ event ]) {
			this.events[ event ] = [];
		}

		if(typeof event === "object") {
			for(const [ e, l ] of Object.entries(event)) {
				this.addEventListeners(e, ...l);
			}
		} else {
			this.events[ event ].push(...listeners);
		}

		return this;
	}
	removeEventListeners(event, ...listeners) {
		if(!this.events[ event ]) {
			return;
		}

		if(typeof event === "object") {
			for(const [ e, l ] of Object.entries(event)) {
				this.removeEventListeners(e, ...l);
			}
		} else {
			this.events[ event ] = this.events[ event ].filter(listener => !listeners.includes(listener));
		}

		if(this.events[ event ].length === 0) {
			delete this.events[ event ];
		}

		return this;
	}

	static Create({ state = {}, events = {}, reducers = {}, effects = [], registry, id, tags = [], ...rest } = {}) {
		return new Node({
			state,
			events,
			reducers,
			effects,
			registry,
			id,
			tags,
			...rest,
		});
	}
	static CreateMany(stateObject = {}) {
		const obj = {};
		for(const [ key, state ] of Object.entries(stateObject)) {
			if(typeof state === "function") {
				obj[ key ] = Node.Create(state(key, obj));
			} else {
				obj[ key ] = Node.Create(state);
			}
		}

		return obj;
	}

	static CreateSimple(state = {}) {
		return new Node({
			state,
			reducers: {
				default: Node.MergeReducer,	// `default` is a reserved-keyword fallback for the "switch reducer"
			},

			// STUB: Remove this
			// effects: [ Node.LogEffect ],
		});
	}
	static CreateManySimple(stateObject = {}) {
		const obj = {};
		for(const [ key, state ] of Object.entries(stateObject)) {
			if(typeof state === "function") {
				obj[ key ] = Node.CreateSimple(state(key, obj));
			} else {
				obj[ key ] = Node.CreateSimple(state);
			}
		}

		return obj;
	}
};

export default Node;