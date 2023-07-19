import FormBase from "./FormBase";

export class Field extends FormBase {
	static DataType = {
		STRING: "str",
		NUMBER: "num",
		BOOLEAN: "bool",
		ARRAY: "arr",
	};

	static ViewType = {
		TEXT: "text",
		NUMBER: "number",
		TOGGLE: "toggle",
		RADIO: "radio",
		CHECKBOX: "checkbox",
		DATE: "date",
		TIME: "time",
		DATETIME: "datetime",
	};

	constructor(value, dataType = Field.DataType.STRING, viewType = Field.ViewType.TEXT, { id, config = {} } = {}) {
		super({ id, config });

		this.value = value; 

		this.dataType = dataType;
		this.viewType = viewType;
	}
};

export default Field;