import FormBase from "./FormBase";

export class Form extends FormBase {

	constructor(sections = [], { id, config = {} } = {}) {
		super({ id, config });
		
		this.sections = sections;
	}

	getSectionById(id) {
		let [ section ] = this.sections.filter(sect => sect.id === id);

		if(section) {
			return section;
		}

		return false;
	}
};

export default Form;