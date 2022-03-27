import FormBase from "./FormBase";

export class Form extends FormBase {

	constructor(sections = [], { id, config = {} } = {}) {
		super({ id, config });
		
		this.sections = sections;
	}
};

export default Form;