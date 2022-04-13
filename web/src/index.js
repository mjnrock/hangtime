import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./leaflet.css";
import "./main.css";
import App from "./App";

import FactoryWebSocket from "./@hive/lib/components/FactoryWebSocket";
import EntityWebSocket from "./@hive/lib/components/EntityWebSocket";

FactoryWebSocket.Instance = new FactoryWebSocket([ 
	[
		[ `test`, [
			(...args) => console.log(true, true, true, ...args),
		]],
	], {
		state: {},
	},
]);

const testEntity = new EntityWebSocket({
	WebSocket: {
		args: [ {
			connection: 1234,
			middleware: {
				pack: 432,
				unpack: 8907,
			},
		} ],
		tags: [ `cat` ],
	},
});
console.log(testEntity.websocket.$(`test`, 1, 2, 3));

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
);
