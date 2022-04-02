import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";

import FindMap from "../components/FindMap";
import GameList from "../components/GameList";

export function Find() {
	const [ position, setPosition ] = useState([ 0, 0 ]);
	const [ state, setState ] = useState({
		games: [],
		spotlight: false,
		filter: {
			category: [ "Sports" ],
			activity: [ "Basketball" ],
			start: Date.now(),
			end: Date.now() + 7200000,
		},
	});
	
	//TODO Invoke this by something other than component execution
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
			setPosition([ coords.latitude, coords.longitude ]);
		});
	}

	const [ ws, setWs ] = useState();

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
					setState({
						...state,
						games: msg.data,
					});
				}
			} catch(e) {}
		});

		setWs(ws);

		return () => {
			ws.close();
		};
	}, []);

	function onSpotlight(game) {
		setState({
			...state,
			spotlight: game,
		});

	}

	if(position[ 0 ] === 0 || position[ 1 ] === 0) {
		return (
			<div className="font-bold">Acquiring GPS Position...</div>
		);
	}

	//TODO	The game-derived draggable markers needs better way to pass to Map, as the Markers likely need to respond to hover events and contain game information
	return (
		<div className="mt-5 flex flex-col h-screen">
			<div className="w-full">
				<input type="text" placeholder="Category" value={ state.filter.category.join("") } className="border rounded m-4 p-2 w-fit" />
				<input type="text" placeholder="Activity" value={ state.filter.activity.join("") } className="border rounded m-4 p-2 w-fit" />
				<input type="datetime-local" placeholder="Time Start" value={ dateFormat(state.filter.start, "yyyy-mm-dd'T'HH:MM") } className="border rounded m-4 p-2 w-fit" />
				<input type="datetime-local" placeholder="Time End" value={ dateFormat(state.filter.end, "yyyy-mm-dd'T'HH:MM") } className="border rounded m-4 p-2 w-fit" />
			</div>

			<div className="flex flex-row">
				<div className="w-1/2">
					<FindMap className="border-4 rounded border-gray-700" markers={ state.games.map(game => [ game.lat, game.long ]) } position={ position } spotlight={ state.spotlight } />
				</div>
				<div className="w-1/2">
					<GameList games={ state.games } onSpotlight={ game => onSpotlight(game) } />
				</div>
			</div>
		</div>
	);
}

export default Find;
