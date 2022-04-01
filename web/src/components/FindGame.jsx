export function HostGame() {
	return (
		<div className="absolute left-0 top-0 w-[500px] h=[500px] p-[5rem] pt-2">
			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Radius [ km ]" />
			</div>

			<div className="grid grid-flow-row auto-rows-max mt-5 border border-white rounded bg-transparent p-5 text-white bg-gray-700 bg-opacity-50">
				<div className="grid grid-flow-row auto-rows-max">
					<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Tagline" />
					<textarea type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 pt-2 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Details"></textarea>
					<input type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Radius [ km ]" />
				</div>

				<div className="mt-5 grid grid-flow-row auto-rows-max">
					<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Tagline" />
					<textarea type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 pt-2 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Details"></textarea>
					<input type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Radius [ km ]" />
				</div>

				<div className="mt-5 grid grid-flow-row auto-rows-max">
					<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Tagline" />
					<textarea type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 pt-2 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Details"></textarea>
					<input type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Radius [ km ]" />
				</div>
			</div>
		</div>
	);
};

export default HostGame;