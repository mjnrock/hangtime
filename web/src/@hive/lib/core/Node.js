import Agent from "./Agent";

export class Node extends Agent {
	constructor({ id } = {}) {
		super({ id });

		this.components = new Map();
	}
};

export default Node;