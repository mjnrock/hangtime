import { Node as NodeClass } from "../../@node/Node";
import Core from "./lib/package";

export const Name = Core.Name;
export const Reducers = Core.Reducers;
export const State = Core.State;

export const Nodes = NodeClass.CreateMany({
	Scoreboard: {
		state: Core.State.Scoreboard({}),
		reducers: Core.Reducers,
	},
});

export default {
	Nodes,
};