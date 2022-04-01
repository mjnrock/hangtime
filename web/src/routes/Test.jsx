import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";

function Game({ detail }) {
	return (
		<div className="border rounded p-5 mt-5 mx-5 hover:bg-gray-700 hover:text-white hover:bg-opacity-50">
			<div className="grid grid-flow-row auto-rows-max">
				<div>
					Game Id
					<div>{ detail.id }</div>
				</div>
			</div>
			<div className="mt-5 flex flex-row">
				<div>
					Start
					<div>{ DateTime.fromSeconds(detail.timestamp.start).toFormat(`ff`) }</div>
				</div>
				&nbsp;
				<div>
					End
					<div>{ DateTime.fromSeconds(detail.timestamp.end).toFormat(`ff`) }</div>
				</div>
				&nbsp;
				<div className="font-bold">
					Duration
					<div>{ ~~Interval.fromDateTimes(DateTime.fromSeconds(detail.timestamp.start), DateTime.fromSeconds(detail.timestamp.end)).length(`minutes`) } min</div>
				</div>
			</div>
		</div>
	);
}

export function Host() {
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
