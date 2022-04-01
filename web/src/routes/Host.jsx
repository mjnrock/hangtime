import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import HostGame from "../components/HostGame";

export function Host() {
	const [ ws, setWs ] = useState();

	useEffect(() => {
		const ws = new WebSocket(`wss://kiszka.com:3001`);
		// ws.addEventListener("open", () => {
		// 	ws.send(JSON.stringify({
		// 		type: "find",
		// 	}));
		// });
		
		// ws.addEventListener("message", (payload) => {
		// 	try {
		// 		const msg = JSON.parse(payload.data);

		// 		if(msg.type === "games") {
		// 			setGames(msg.data);
		// 		}
		// 	} catch(e) {}
		// });

		setWs(ws);

		return () => {
			ws.close();
		};
	}, []);

	function onSubmit(obj) {
		// console.log(JSON.stringify({
		// 	type: "host",
		// 	payload: obj,
		// }));
		ws.send(JSON.stringify({
			type: "host",
			payload: obj,
		}));
	}

	return (
		<Map>
			<HostGame onSubmit={ obj => onSubmit(obj) } />
		</Map>
	);
}

export default Host;
