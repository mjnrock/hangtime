import { v4 as uuid } from "uuid";

export class FormBase {
	constructor({ id, config = {} } = {}) {
		this.id = id || uuid();
		this.log = new Set();

		this.config = {
			isLogging: false,

			...config,
		};

		return new Proxy(this, {
			set(target, prop, value) {
				if(target.config.isLogging && prop !== "log") {
					target.log.add([ "set", prop, value, Date.now() ]);
				}

				return Reflect.set(target, prop, value);
			},
		});
	}
};

export default FormBase;