import { v4 as uuid } from "uuid";

import Signal from "./Signal";

export class Agent {
	static DefaultReducer = (signal) => {	// Handler is here as a reference in case it needs to be removed as a handler and will be bound to the Node in the constructor
		if(signal.meta.isCoerced) {
			// (Implicit data) Functionally, this occurs when a Signal was created ad hoc, and the original @args were condensed into an array and assigned to .data, thus unpackage
			return signal.data[ 0 ];
		}
		
			// (Explicit data) A Signal was explicitly created, so use w/e data was present in the Signal
		return signal.data;
	}

	constructor({ state = {}, triggers = [], config, namespace, id } = {}) {
		this.id = id || uuid();

		this.state = state;
		this.triggers = new Map(triggers);

		this.config = {
			isReducer: true,	// Make ALL triggers return a state -- to exclude a trigger from state, create a * handler that returns true on those triggers
			allowRPC: true,		// If no trigger handlers exist AND an internal method is named equal to the trigger, pass ...args to that method

			queue: new Set(),
			isBatchProcessing: false,
			maxBatchSize: 1000,

			//TODO There's a lot of nuance here that needs to be worked out, but key here added as a future addition
			namespace: typeof namespace === "function" ? namespace : trigger => trigger,

			...config,
		};
	}

	deconstructor() {}


	/**
	 * Convenience function for toggling/altering configuration booleans -- must be a boolean
	 */
	toggle(configAttribute, newValue) {
		if(typeof this.config[ configAttribute ] === "boolean") {
			if(typeof newValue === "boolean") {	
				this.config[ configAttribute ] = newValue;
			} else {
				this.config[ configAttribute ] = !this.config[ configAttribute ];
			}
		}

		return this;
	}
	assert(configAttribute, expectedValue) {
		return this.config[ configAttribute ] === expectedValue;
	}


	/**
	 * @trigger can be anything, not limited to strings
	 */
	addTrigger(trigger, handler) {
		let handlers = this.triggers.get(trigger) || new Set();
		
		if(typeof handler === "function") {
			handlers.add(handler);
		}

		this.triggers.set(trigger, handlers);

		return this;
	}
	addTriggers(addTriggerArgs = []) {
		for(let args of addTriggerArgs) {
			this.addTrigger(...args);
		}

		return this;
	}
	removeTrigger(trigger, handler) {
		let handlers = this.triggers.get(trigger);

		if(handlers instanceof Set) {
			return handlers.delete(handler);
		}

		return false;
	}
	removeTriggers(removeTriggerArgs = []) {
		let results = [];
		for(let args of removeTriggerArgs) {
			results.push(this.removeTrigger(...args));
		}

		return results;
	}


	/**
	 * This should NOT be used externally.
	 * 
	 * A handling abstract to more easily deal with
	 * batching vs immediate invocations
	 */
	__handleInvocation(signal) {
		// Many contingent handlers receive the same payload, so abstract it here
		const payload = [ signal, {
			trigger: signal.type,
			target: this,
			state: this._state,
			globalState: this.state,
			broadcast: this.broadcast,
			invoke: this.invoke,
		} ];

		/**
		 * ? Pre hooks
		 * These act as filters iff one returns << true >> and will cease execution immediately (i.e. no handlers or effects will be processed)
		 */
		for(let fn of (this.triggers.get("$pre") || [])) {
			let result = fn(...payload);

			if(result === true) {
				return false;
			}
		}

		let hadMatch = false;
		for(let [ trigger, handlers ] of this.triggers) {
			if(signal.type === trigger) {
				hadMatch = true;
				/**
				 * "state" handlers won't reduce, but could theoretically use
				 * this._state directly, if needed
				 */
				if(this.config.isReducer === true && signal.type !== "update") {
					let next;
					// Execute all handlers before continuing

					if(handlers.size === 0) {
						next = Agent.DefaultReducer(...payload);
					} else {
						for(let handler of handlers) {
							next = handler(...payload);
						}
					}

					const oldState = this.state;
					this.state = next;

					this.invoke("update", { current: next, previous: oldState });
				} else {
					// Execute all handlers before continuing
					for(let handler of handlers) {
						handler(...payload);
					}
				}
			}
		}

		// Only execute below if a trigger handler did not exist AND Node is configured to accept RPC
		//? Note, there are limitations to this usage paradigm, so explicitly define a custom RPC handler to handle such cases (e.g. .update vis-a-vis "update")
		if(hadMatch === false && this.config.allowRPC === true) {
			// Verify that the RPC has a landing method
			if(typeof signal.type === "string" && typeof this[ signal.type ] === "function") {
				//!	If the .data is an Array, expand it -- you may need to array-wrap the data payload depending on how .invoke was called (cf .invoke @args)
				// * As a general rule, explicitly create a Signal when performing RPC
				if(Array.isArray(signal.data)) {
					this[ signal.type ](...signal.data);
				} else {
					this[ signal.type ](signal.data);
				}

				hadMatch = true;
			}
		}

		/**
		 * ? Post hooks
		 * Treat these like Effects
		 */
		for(let fn of (this.triggers.get("$post") || [])) {
			fn(...payload);
		}

		return hadMatch;
	}

	/**
	 * If in batch mode, add trigger to queue; else,
	 * handle the invocation immediately.
	 * 
	 * This is overloaded by either passing a Signal
	 * directly, or by passing the trigger type and
	 * data args and a Signal will be created
	 */
	invoke(signalOrTrigger, ...args) {
		let signal;

		if(Signal.Conforms(signalOrTrigger)) {
			signal = signalOrTrigger;
		} else {
			signal = Signal.Create({
				type: signalOrTrigger,
				data: args,
				emitter: this,
			}, {
				coerced: true,
			});
		}

		/**
		 * Short-circuit the invocation if the trigger has not been loaded
		 */
		if(!this.triggers.has(signal.type)) {
			return false;
		}

		if(this.config.isBatchProcessing === true) {
			this.config.queue.add(signal);

			return true;
		} else {
			return this.__handleInvocation(signal);
		}
	}

	/**
	 * Process @qty amount of queued triggers
	 */
	process(qty = this.config.maxBatchSize) {
		if(this.config.isBatchProcessing !== true) {
			return [];
		}

		const queue = [ ...this.config.queue ];
		const results = [];
		const runSize = Math.min(qty, this.config.maxBatchSize);

		for(let i = 0; i < runSize; i++) {
			const signal = queue[ i ];
			const result = this.__handleInvocation(signal);

			results.push(result);
		}

		this.config.queue = new Set(queue.slice(runSize));

		return results;
	}

	async asyncInvoke(signalOrTrigger, ...args) {
		return await Promise.resolve(this.invoke(signalOrTrigger, ...args));
	}
	async asyncProcess(qty = this.config.maxBatchSize) {
		return await Promise.resolve(this.process(qty));
	}

	static Create(obj = {}) {
		return new this(obj);
	}
	static Factory(qty = 1, fnOrObj) {
		// Single-parameter override for .Spawning one (1) this
		if(typeof qty === "function" || typeof qty === "object") {
			fnOrObj = qty;
			qty = 1;
		}

		let hbases = [];
		for(let i = 0; i < qty; i++) {
			let hbase = this.Create(typeof fnOrObj === "function" ? fnOrObj(i, qty) : fnOrObj);

			hbases.push(hbase);
		}

		if(qty === 1) {
			return hbases[ 0 ];
		}

		return hbases;
	}
};

export default Agent;