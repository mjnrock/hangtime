import { v4 as uuid } from "uuid";

import Chord from "@lespantsfancy/chord";

export const FormSchema = {
	id: uuid(),
	name: "$root",
	type: Chord.Form.EnumFieldType.GROUP,
	state: [
		{
			id: uuid(),
			name: "name",
			type: Chord.Form.EnumFieldType.TEXT,
			state: "",
			html: {
				placeholder: "Name",
				required: true,
				autoComplete: "name",
				minLength: 3,
				maxLength: 32
			},
			validation: {
				required: true,
			},
		},
		{
			id: uuid(),
			name: "age",
			type: Chord.Form.EnumFieldType.NUMBER,
			state: null,
			html: {
				placeholder: "Age",
				required: true,
				autoComplete: "age",
			},
			validation: {
				required: true,
				min: 0,
				max: 120,
			},
		},
	],
};

export function Form() {
	return (
		<>
			<Chord.Form.React.Group field={ FormSchema } />
		</>
	);
};

export default Form;