import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";

import GameCard from "../components/GameCard";

export function Test() {
	const [ ws, setWs ] = useState();
	const [ games, setGames ] = useState([]);

	useEffect(() => {
		const ws = new WebSocket(`wss://kiszka.com:3001`);
		ws.addEventListener("open", () => {
			// console.log(823749823);
			// ws.send(JSON.stringify({
			// 	cats: 15
			// }));
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
	}, []);

	function hostGame() {
		ws.send(JSON.stringify({
			type: "host",
		}));
	}
	function findGame() {
		ws.send(JSON.stringify({
			type: "find",
		}));
	}


	const [ datetime, setDatetime ] = useState(Date.now());

	return (
		<div>
			Tests

			<input type="datetime-local" value={ dateFormat(datetime, "yyyy-mm-dd'T'HH:MM:ss") } onChange={ e => setDatetime(new Date(e.target.value)) } />

			<button onClick={ e => hostGame() }>Host</button>
			<button onClick={ e => findGame() }>Find</button>

			{
				games.map(game => <GameCard detail={ game } key={ game.id } />)
			}
		</div>
	);
}

export default Test;
