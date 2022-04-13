import System from "../core/ecs/System";
import ComponentWebSocketClient from "./ComponentWebSocketClient";

export class SystemWebSocket extends System {
	static EnumTriggers = [
		"close",
		"error",
		"message",
		"message_error",
		"open",
		"ping",
		"pong",
		"unexpected_response",
		"upgrade",
	];

	constructor(events = {}, { state, Agent = {} } = {}) {
		super(`websocket`, events, { state, Agent });
	}

	affix(entity, { args = [], tags = [] } = {}) {
		return super.affix(entity, ComponentWebSocketClient, { args, tags });
	}
};

export default SystemWebSocket;