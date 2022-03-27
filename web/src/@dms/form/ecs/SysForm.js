export class SysForm {

	// const payload = [ signal, {
	// 	trigger: signal.type,
	// 	target: this,
	// 	state: this.state,
	// 	invoke: this.invoke,
	// } ];
	constructor() {
		this.events = {
			"Field.Swap": (signal) => {
				
			},
		}
	}
};

export default SysForm;