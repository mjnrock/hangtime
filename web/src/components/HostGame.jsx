export function HostGame() {
	return (
		<div className="absolute left-0 top-[50px] w-[500px] h=[500px] p-[3rem]">
			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Activity" />
				<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game" />
			</div>

			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Tagline" />
				<textarea type="text" className="mt-1 border border-white rounded bg-transparent h-[120px] p-5 pt-2 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Details"></textarea>
				<input type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value="Game Radius [ km ]" />
			</div>

			<div className="flex flex-row mt-5">
				<input type="datetime-local" className="mr-2 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" />
				<input type="number" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700 placeholder:text-white" placeholder="Hours" />
			</div>

			<div className="grid grid-flow-row auto-rows-max mt-5">
				<button className="border border-white rounded text-white bg-gray-700 bg-opacity-50 p-3 text-center hover:bg-white hover:border-gray-700 hover:text-gray-700">Search</button>
			</div>
		</div>
	);
};

export default HostGame;