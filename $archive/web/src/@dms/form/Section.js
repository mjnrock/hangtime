import FormBase from "./FormBase";

export class Section extends FormBase {

	constructor(fields = [], { id, config = {} } = {}) {
		super({ id, config });
		
		this.fields = fields;
	}

	getFieldById(id) {
		let [ field ] = this.fields.filter(field => field.id === id);

		if(field) {
			return field;
		}

		return false;
	}
};

export default Section;