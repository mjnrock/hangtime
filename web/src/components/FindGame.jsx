export function FindGame() {
	return (
		<div className="absolute left-0 top-[100px] w-[500px] h=[500px]">
			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className="border border-black rounded bg-transparent h-10 p-5 text-black" placeholder="Tagline" value="Game Tagline" />
				<input type="text" className="border border-black rounded bg-transparent h-10 p-5 text-black" placeholder="Details" value="Game Details" />
				<input type="text" className="border border-black rounded bg-transparent h-10 p-5 text-black" placeholder="Radius" value="Game Radius" />
				<input type="datetime-local" className="border border-black rounded bg-transparent h-10 p-5 text-black" />
				<input type="datetime-local" className="border border-black rounded bg-transparent h-10 p-5 text-black" />
				<button>Search</button>
			</div>
		</div>
	);
};

export default FindGame;