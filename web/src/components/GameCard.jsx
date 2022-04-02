import React from "react";
import dateFormat from "dateformat";

export function GameCard({ onSelect, game }) {
	return (
		<div className="border rounded p-5 mt-1 mx-1 hover:bg-gray-500 hover:text-white cursor-pointer" onClick={ e => onSelect(e) }>
			<div className="grid grid-flow-row auto-rows-max">
				<div className="font-bold">{ game.subject }</div>
				<div className="italic">{ game.comment }</div>
			</div>

			<div className="mt-5 flex flex-row font-mono">
				<div>
					Start
					<div>{ dateFormat(game.start, "yyyy-mm-dd HH:MM:ss") }</div>
				</div>
				&nbsp;
				<div>
					End
					<div>{ dateFormat(game.end, "yyyy-mm-dd HH:MM:ss") }</div>
				</div>
			</div>
		</div>
	);
}

export default GameCard;