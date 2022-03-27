export class Form {

	constructor({ formsMap = [] } = {}) {
		this.forms = formsMap instanceof Map ? formsMap : new Map(formsMap);
	}
};

export default Form;