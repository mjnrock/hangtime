export class Hookable {
	constructor() {
		this._config = {
			isPrivate: true,
		};
		this._hooks = {
			fn: [],
			get: [],
			set: [],
		};

		return new Proxy(this, {
			get: (target, prop) => {
				if(prop[ 0 ] === "_" && target._config.isPrivate === true) {
					return Reflect.get(target, prop);
				}

				const result = Reflect.get(target, prop);

				//TODO Account for nuances here
				// if(typeof result === "function") {
				// 	return (...args) => {
				// 		const ret = result(...args);

				// 		for(let fn of target._hooks.fn) {
				// 			fn({ prop, result: ret, target });
				// 		}

				// 		return ret;
				// 	};
				// }

				for(let fn of target._hooks.get) {
					fn({ prop, result, target });
				}

				return result;
			},
			set: (target, prop, value) => {
				if(prop[ 0 ] === "_" && target._config.isPrivate === true) {
					return Reflect.set(target, prop, value);
				}

				const previous = Reflect.get(target, prop);
				const result = Reflect.set(target, prop, value);

				for(let fn of target._hooks.set) {
					fn({ prop, value, previous , target });
				}

				return result;
			},
		});
	}
};

export default Hookable;