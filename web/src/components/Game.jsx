import React from "react";
import dateFormat from "dateformat";

export function Game({ onRequest, onReturn, game }) {
	return (
		<div className="border rounded p-5 mt-5 mx-5 hover:bg-gray-700 hover:text-white hover:bg-opacity-50">
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

			<div className="grid grid-flow-row auto-rows-max mt-5">
				<button className="border border-white rounded text-white bg-gray-700 bg-opacity-50 p-3 text-center hover:bg-white hover:border-gray-700 hover:text-gray-700" onClick={ e => onRequest(e) }>Request</button>
				<button className="border border-white rounded text-white bg-gray-700 bg-opacity-50 p-3 text-center hover:bg-white hover:border-gray-700 hover:text-gray-700" onClick={ e => onReturn(e) }>Return</button>
			</div>
		</div>
	);
}

export default Game;