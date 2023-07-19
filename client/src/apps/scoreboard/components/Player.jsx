import React, { useState } from 'react';
import { BsPlus, BsDash, BsChevronDown, BsChevronRight } from "react-icons/bs";

export function Player({ player, data, dispatch }) {
	const { scoreboardData } = data;
	const { scoreboardDispatch } = dispatch;

	const [ isExpanded, setIsExpanded ] = useState(false);
	const toggleExpand = () => setIsExpanded(!isExpanded);

	return (
		<div className="mt-5">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">{ player?.info?.name }</h2>
					<div className="max-w-xl mt-2 text-sm text-gray-500">Points: { player.stats.points }</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<button
						className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						onClick={ () => scoreboardDispatch({
							type: "Scoreboard.addPointsToPlayer",
							data: {
								playerId: player.id,
								points: 1,
							},
						}) }
					>
						<BsPlus />
					</button>
					<button
						className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						onClick={ () => scoreboardDispatch({
							type: "Scoreboard.addPointsToPlayer",
							data: {
								playerId: player.id,
								points: -1,
							},
						}) }
					>
						<BsDash />
					</button>
				</div>
			</div>

			<div className="flex flex-col max-w-xl mt-2 text-sm text-gray-500">
				<div
					className="flex flex-row cursor-pointer"
					onClick={ toggleExpand }
				>
					{ isExpanded ? <BsChevronDown /> : <BsChevronRight /> }
					<span className="ml-2">Points History</span>
				</div>
				<div className="flex-grow">
					{
						isExpanded &&
						player.stats.pointsHistory.map(([ ts, points ], index) => (
							<div key={ index }>{ ts }: { points }</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default Player;