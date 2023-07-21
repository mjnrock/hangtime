import React, { useState } from "react";
import { BsPlus, BsDash, BsChevronDown, BsChevronRight, Bs2Circle, Bs3Circle, Bs5Circle, BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { EditableLabel } from "../../../components/EditableLabel.jsx";

export function TimePointsTable({ player, isExpanded, decColor, incColor }) {
	if(!isExpanded || !player.stats.pointsHistory.length) {
		return null;
	}

	const tareTime = new Date(player.stats.pointsHistory[ 0 ][ 0 ]).getTime();

	return (
		<table className="w-full text-center bg-white border-collapse select-none">
			<thead>
				<tr>
					<th>Time</th>
					<th>Points</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colSpan={ 2 } className="font-mono">{ (new Date(player.stats.pointsHistory[ 0 ][ 0 ])).toLocaleTimeString() }</td>
				</tr>

				{
					player.stats.pointsHistory.map(([ ts, points ], index) => {
						const deltaTime = new Date(ts).getTime() - tareTime;
						const deltaHours = Math.floor(deltaTime / 3600000);
						const deltaMinutes = Math.floor((deltaTime - (deltaHours * 3600000)) / 60000);
						const deltaSeconds = Math.floor((deltaTime - (deltaHours * 3600000) - (deltaMinutes * 60000)) / 1000);

						const timeDeltaFormatted = `${ deltaHours.toString().padStart(2, "0") }:${ deltaMinutes.toString().padStart(2, "0") }:${ deltaSeconds.toString().padStart(2, "0") }`;

						const textColorClass = points < 0 ? `text-${ decColor }-400` : `text-${ incColor }-400`;
						const CaretIcon = points < 0 ? BsCaretDownFill : BsCaretUpFill;

						return (
							<tr
								key={ index }
								className={ `border-t border-neutral-200 hover:bg-${ points < 0 ? decColor : incColor }-300 hover:text-white` }
							>
								<td className="font-mono">+{ timeDeltaFormatted }</td>
								<td className={ `font-bold ${ textColorClass } hover:bg-${ points < 0 ? decColor : incColor }-300 hover:text-white flex items-center justify-center` }>
									<CaretIcon className="mr-1" />
									<span className="font-mono font-bold">{ Math.abs(points) }</span>
								</td>
							</tr>
						);
					})
				}
			</tbody>
		</table>
	);
};

export function Player({ player, data, dispatch }) {
	const { scoreboardData } = data;
	const { scoreboardDispatch } = dispatch;

	const [ isExpanded, setIsExpanded ] = useState(false);
	const toggleExpand = () => setIsExpanded(!isExpanded);

	const incColor = "green";
	const decColor = "red";
	const pointAdjustments = [
		// [ -5, decColor, Bs5Circle ],
		[ -3, decColor, Bs3Circle ],
		// [ -2, decColor, Bs2Circle ],
		[ -1, decColor, BsDash ],
		[ 1, incColor, BsPlus ],
		[ 2, incColor, Bs2Circle ],
		[ 3, incColor, Bs3Circle ],
		[ 5, incColor, Bs5Circle ],
	];

	return (
		<>
			<div className="flex flex-row items-center justify-center w-full gap-2 p-2">
				<div className="flex flex-col flex-1">
					<EditableLabel
						inputClassName="w-full px-2 py-1 border border-solid rounded outline-none border-neutral-200 focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
						labelClassName="w-full px-2 py-1 border border-solid rounded border-transparent"
						initialValue={ player.info.name }
						onChange={ value => scoreboardDispatch({
							type: "editPlayerName",
							data: {
								playerId: player.id,
								name: value
							}
						}) }
						onBlur={ value => scoreboardDispatch({
							type: "editPlayerName",
							data: {
								playerId: player.id,
								name: value
							}
						}) }
					/>
					{/* 
					<div className="flex flex-col max-w-xl mt-2 text-sm text-gray-500">
						<div
							className="flex flex-row cursor-pointer"
							onClick={ toggleExpand }
						>
							{ isExpanded ? <BsChevronDown /> : <BsChevronRight /> }
							<span className="ml-2">Points History</span>
						</div>
						<TimePointsTable player={ player } isExpanded={ isExpanded } decColor={ decColor } incColor={ incColor } />
					</div> */}
				</div>

				<div className="flex flex-row items-center justify-center flex-1">
					<div className="text-4xl font-thin">{ player.stats.points }</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					{
						pointAdjustments.map(([ points, color, Icon ], index) => (
							<button
								key={ index }
								className={ `p-2 text-white bg-${ color }-400 rounded-full hover:bg-${ color }-500 active:bg-${ color }-600 focus:outline-none focus:ring-2 focus:ring-${ color }-400 focus:ring-offset-2` }
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
		</>
	);
};

export default Player;