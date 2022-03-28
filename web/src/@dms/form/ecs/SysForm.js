import System from "../../../@hive/lib/core/ecs/System";

export class SysForm extends System {
	constructor() {
		super();

		this.addTriggers({
			"Form.Add": (node, comp, [ form ], {} = {}) => {
				comp.forms.set(form.id, form);
			},
			"Form.Remove": (node, comp, [ fid ], {} = {}) => {
				comp.forms.delete(fid);
			},

			"Section.Add": (node, comp, [ fid, section ], {} = {}) => {
				const form = comp.getFormById(fid);
				
				form.sections.push(section);
			},
			"Section.Remove": (node, comp, [ fid, sid ], {} = {}) => {
				const form = comp.getFormById(fid);
				
				form.sections = form.sections.filter( sec => sec.id !== sid);
			},
			"Section.Swap": (node, comp, [ fid, i1, i2 ], {} = {}) => {
				const form = comp.getFormById(fid);

				if(form) {
					[ comp.form.sections[ i1 ], comp.form.sections[ i2 ] ] = [ comp.form.sections[ i2 ], comp.form.sections[ i1 ] ];
				}
			},

			"Field.Add": (node, comp, [ fid, sid, field ], {} = {}) => {
				const form = comp.getFormById(fid);
				const section = form.getSectionById(sid);

				if(section) {
					section.fields.push(field);
				}
			},
			"Field.Remove": (node, comp, [ fid, sid, ffid ], {} = {}) => {
				const form = comp.getFormById(fid);
				const section = form.getSectionById(sid);

				if(section) {
					section.fields = section.fields.filter(fld => fld.id !== ffid);
				}
			},
			"Field.Swap": (node, comp, [ fid, sid, i1, i2 ], {} = {}) => {
				const form = comp.getFormById(fid);
				const section = form.getSectionById(sid);

				if(section) {
					[ section.fields[ i1 ], section.fields[ i2 ] ] = [ section.fields[ i2 ], section.fields[ i1 ] ];
				}
			},
		});
	}
};

export default SysForm;