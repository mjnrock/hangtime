import FormBase from "./FormBase";

export class Section extends FormBase {

	constructor(fields = [], { id, config = {} } = {}) {
		super({ id, config });
		
		this.fields = fields;
	}
};

export default Section;