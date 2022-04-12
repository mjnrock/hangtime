import { v4 as uuid } from "uuid";

export class Module {
	constructor(nomen, { entity, componentClass, system, args = [], tags = [] } = {}) {
		this.id = uuid();
		this.nomen = nomen;		// The unique name for a Module
		this.tags = new Set(tags);		// Any tags for filtering/selection
		
		this.defaultArgs = args;	// Used as defaults when reseeding
		this.classes = {
			component: componentClass,		// Used to reseed
		};

		this.state = new this.classes.component(...this.defaultArgs);	// State *is* the component
		this.system = system;	// Allow system ref to change, but have same nomen
		
		if(entity) {
			this.register(entity);
		}

		this.state.__module = this;		// See NOTE in Component file
	}

	static Add(entity, nomen, { componentClass, system, args = [] } = {}) {
		const module = new this(nomen, { componentClass, system, args });
		module.register(entity);

		return entity;
	}
	static Remove(entity, nomen) {
		const module = entity[ nomen ];
		module.register(entity);

		return entity;
	}

	$(trigger, ...args) {
		return this.system.invoke(trigger, this, ...args);
	}

	reseed(...args) {
		if(args.length === 0) {
			this.state = new this.classes.component(...this.defaultArgs);
		} else {
			this.state = new this.classes.component(...args);
		}		

		this.state.__module = this;

		return this;
	}

	attach(system) {
		this.system = system;

		return this;
	}
	detach() {
		this.system = null;

		return this;
	}

	register(entity) {
		entity.register(this.nomen, this);
		this.entity = entity;

		return this;
	}
	unregister(entity) {		
		if(entity === this.entity) {
			entity.unregister(this.nomen);
			this.entity = null;
		}

		return this;
	}
};

export default Module;