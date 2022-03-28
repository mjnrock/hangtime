export class CompForm {
	constructor() {
		this.forms = new Map();
	}

	getFormById(id) {
		let form = this.forms.get(id);

		if(form) {
			return form;
		}

		return false;
	}
};

export default CompForm;