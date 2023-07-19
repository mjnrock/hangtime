import React, { useState } from "react";
import { BsPlus, BsDash, BsChevronDown, BsChevronRight, Bs2Circle, Bs3Circle, Bs5Circle } from "react-icons/bs";

export function Player({ player, data, dispatch }) {
	const { scoreboardData } = data;
	const { scoreboardDispatch } = dispatch;

	const [ isExpanded, setIsExpanded ] = useState(false);
	const toggleExpand = () => setIsExpanded(!isExpanded);

	const incColor = "green";
	const decColor = "red";
	const pointAdjustments = [
		[ 5, incColor, Bs5Circle ],
		[ 3, incColor, Bs3Circle ],
		[ 2, incColor, Bs2Circle ],
		[ 1, incColor, BsPlus ],
		[ -1, decColor, BsDash ],
		[ -2, decColor, Bs2Circle ],
		[ -3, decColor, Bs3Circle ],
		[ -5, decColor, Bs5Circle ],
	];

	return (
		<div className="mt-5">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-medium leading-6 text-gray-900">{ player?.info?.name }</h2>
					<div className="max-w-xl mt-2 text-sm text-gray-500">Points: <span className="font-bold">{ player.stats.points }</span></div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					{
						pointAdjustments.map(([ points, color, Icon ], index) => (
							<button
								key={ index }
								className={ `p-2 text-white bg-${ color }-500 rounded-full hover:bg-${ color }-600 active:bg-${ color }-700 focus:outline-none focus:ring-2 focus:ring-${ color }-500 focus:ring-offset-2` }
								onClick={ () => scoreboardDispatch({
									type: "addPointsToPlayer",
									data: {
										playerId: player.id,
										points,
									},
								}) }
							>
								<Icon className="text-[2rem]" />
							</button>
						))
					}
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