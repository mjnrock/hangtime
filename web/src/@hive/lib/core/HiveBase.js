import { v4 as uuid } from "uuid";

export class HiveBase {
	constructor({ id } = {}) {
		this.id = id || uuid();
	}
};

export default HiveBase;