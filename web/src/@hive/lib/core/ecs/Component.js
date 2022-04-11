import { v4 as uuid } from "uuid";

export class Component {
	constructor({ id } = {}) {
		this.id = id || uuid();
	}
};

export default Component;