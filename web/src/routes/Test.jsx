import React, { useState, useEffect } from "react";

function Game({ detail }) {
	return (
		<div className="border rounded p-5 mt-5 mx-5 hover:bg-gray-700 hover:text-white hover:bg-opacity-50">
			<div className="grid grid-flow-row auto-rows-max">				
				<div>{ detail.id }</div>
			</div>
			<div className="mt-5 grid grid-flow-row auto-rows-max">
				<div>{ detail.timestamp.start }</div>
				<div>{ detail.timestamp.end }</div>
			</div>
		</div>
	);
}

export function Host() {
	const [ ws, setWs ] = useState();
	const [ games, setGames ] = useState([]);

	useEffect(() => {
		const ws = new WebSocket(`wss://kiszka.com:3001`);
		ws.addEventListener("open", function open() {
			console.log(823749823);
			ws.send(JSON.stringify({
				cats: 15
			}));
		});
		
		ws.addEventListener("message", function message(input) {
			try {
				const msg = JSON.parse(input.data);

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

	return (
		<div>
			Tests

			<button onClick={ e => hostGame() }>Host</button>
			<button onClick={ e => findGame() }>Find</button>

			{
				games.map(game => <Game detail={ game } key={ game.id } />)
			}
		</div>
	);
}

export default Host;
