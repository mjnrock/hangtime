import { v4 as uuid } from "uuid";

export class Module {
	constructor(nomen, { entity, componentClass, systemInstance, args = [], tags = [] } = {}) {
		this.id = uuid();
		this.nomen = nomen;		// The unique name for a Module
		this.tags = new Set(tags);		// Any tags for filtering/selection
		
		this.defaultArgs = args;	// Used as defaults when reseeding
		this.classes = {
			component: componentClass,		// Used to reseed
		};

		this.state = new this.classes.component(...this.defaultArgs);	// State *is* the component
		this.system = systemInstance;	// Allow system ref to change, but have same nomen
		this.entity = entity;
	}

	static Add(entity, nomen, { componentClass, systemInstance, args = [] } = {}) {
		const module = new this(nomen, { componentClass, systemInstance, args });
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
		if(!args.length) {
			this.state = new this.classes.component(...this.defaultArgs);

			return this;
		}
		
		this.state = new this.classes.component(...args);

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
		entity.unregister(this.nomen);

		if(entity === this.entity) {
			this.entity = null;
		}

		return this;
	}
};

export default Module;