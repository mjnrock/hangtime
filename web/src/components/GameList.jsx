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

	return (
		<div className="border border-gray-200 rounded p-2 mx-2 bg-white text-gray-800 h-[750px]">
			{
				spotlight ? (
					<Game game={ spotlight } onReturn={ () => setSpotlight(false) } onRequest={ () => requestGame(spotlight) } />
				) : (
					<div className="grid grid-flow-row auto-rows-max">
						{
							games.map(game => <GameCard key={ game.id } game={ game } onSelect={ e => setSpotlight(game) } />)
						}
					</div>
				)
			}
		</div>
	);
}

export default GameList;