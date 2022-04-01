import React from "react";
import { DateTime, Interval } from "luxon";

export function GameCard({ detail }) {
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
					<div>{ DateTime.fromMillis(detail.timestamp.start).toFormat(`ff`) }</div>
				</div>
				&nbsp;
				<div>
					End
					<div>{ DateTime.fromMillis(detail.timestamp.end).toFormat(`ff`) }</div>
				</div>
				&nbsp;
				<div className="font-bold">
					Duration
					<div>{ ~~Interval.fromDateTimes(DateTime.fromMillis(detail.timestamp.start), DateTime.fromMillis(detail.timestamp.end)).length(`minutes`) } min</div>
				</div>
			</div>
		</div>
	);
}

export default GameCard;