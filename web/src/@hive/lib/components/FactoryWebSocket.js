import SystemWebSocket from "./SystemWebSocket";

export class FactoryWebSocket {
	static Instance;

	constructor(systemArgs = []) {
		if(!FactoryWebSocket.Instance) {
			FactoryWebSocket.Instance = this;
		} else {
			return FactoryWebSocket.Instance;
		}
		
		this.entries = new Map();
		this.entries.set(`websocket`, new SystemWebSocket(...systemArgs));
	}
	
	static Register(entity, { compArgs = [], tags = [] } = {}) {
		const system = this.Instance.entries.get(`websocket`);

		return system.affix(entity, { system, args: compArgs, tags });
	}
};

export default FactoryWebSocket;