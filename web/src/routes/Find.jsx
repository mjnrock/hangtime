import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import FindGame from "../components/FindGame";

export function Find() {
	const [ ws, setWs ] = useState();
	const [ games, setGames ] = useState([]);

	useEffect(() => {
		const ws = new WebSocket(`wss://kiszka.com:3001`);
		ws.addEventListener("open", () => {
			ws.send(JSON.stringify({
				type: "find",
			}));
		});
		
		ws.addEventListener("message", (payload) => {
			try {
				const msg = JSON.parse(payload.data);

				if(msg.type === "games") {
					setGames(msg.data);
				}
			} catch(e) {}
		});

		setWs(ws);

		return () => {
			ws.close();
		};
	}, []);

	//TODO	The game-derived draggable markers needs better way to pass to Map, as the Markers likely need to respond to hover events and contain game information
	return (
		<div className="mt-5 flex flex-row">
			<Map markers={ games.map(game => [ game.lat, game.long ]) } />
			<FindGame games={ games } />
		</div>
	);
}

export default Find;
