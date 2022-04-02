import React, { useState, useEffect } from "react";
import cn from "classnames";

import GameCard from "./GameCard";
import Game from "./Game";

const CSS = {
	Input: cn('border', 'rounded', 'm-1', 'p-2', 'flex-1', 'bg-gray-700', 'text-white', 'border-white'),
	Background: {
		Dark: cn("bg-gray-700 text-white border-white bg-opacity-70"),
	}
};

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
		<div className={ cn("m-2 mt-0 bg-white text-gray-700 h-[750px]") }>
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