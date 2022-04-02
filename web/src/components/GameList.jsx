import React from "react";
import { useState } from "react";

import GameCard from "./GameCard";
import Game from "./Game";
import { useEffect } from "react";

export function GameList({ games, onSpotlight }) {
	const [ spotlight, setSpotlight ] = useState(false);

	useEffect(() => {
		if(typeof onSpotlight === "function") {
			onSpotlight(spotlight);
		}
	}, [ spotlight ]);

	function requestGame(game) {
		alert(`DEV: You've requested to join ${ game.subject }`)
	}

	if(spotlight) {
		return (
			<div className="border rounded p-5 mt-5 mx-5 hover:bg-gray-700 hover:text-white hover:bg-opacity-50">
				<Game game={ spotlight } onReturn={ () => setSpotlight(false) } onRequest={ () => requestGame(spotlight) } />
			</div>
		);
	}

	return (
		<div className="border rounded p-5 mt-5 mx-5 hover:bg-gray-700 hover:text-white hover:bg-opacity-50">
			<div className="grid grid-flow-row auto-rows-max">
				{
					games.map(game => <GameCard key={ game.id } game={ game } onSelect={ e => setSpotlight(game) } />)
				}
			</div>
		</div>
	);
}

export default GameList;