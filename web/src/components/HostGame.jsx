import { useState } from "react";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";

export function HostGame({ onSubmit }) {
	const [ state, setState ] = useState({
		id: uuid(),
		category: `Sports`,
		activity: `Basketball`,
		subject: ``,
		comment: ``,
		radius: 10,
		start: Date.now(),
		end: Date.now() + 3600000,
	});

	function update(key, value) {
		setState({
			...state,
			[ key ]: value,
		});
	}

	return (
		<div className="absolute left-0 top-[50px] w-[500px] h=[500px] p-[3rem]">
			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Category" value={ state.category } onChange={ e => update("category", e.target.value) } />
				<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Activity" value={ state.activity } onChange={ e => update("activity", e.target.value) } />
			</div>

			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value={ state.subject } onChange={ e => update("subject", e.target.value) } />
				<textarea type="text" className="mt-1 border border-white rounded bg-transparent h-[120px] p-5 pt-2 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Game Details" value={ state.comment } onChange={ e => update("comment", e.target.value) }></textarea>
				<input type="text" className="mt-1 border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" placeholder="Tagline" value={ state.radius } onChange={ e => update("radius", e.target.value) } />
			</div>

			<div className="grid grid-flow-row auto-rows-max">
				<input type="datetime-local" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" value={ dateFormat(state.start, "yyyy-mm-dd'T'HH:MM:ss") } onChange={ e => update("start", new Date(e.target.value)) } />
				<input type="datetime-local" className="border border-white rounded bg-transparent h-10 p-5 text-white bg-gray-700 bg-opacity-50 hover:bg-white hover:border-gray-700 hover:text-gray-700" value={ dateFormat(state.end, "yyyy-mm-dd'T'HH:MM:ss") } onChange={ e => update("end", new Date(e.target.value)) } />
			</div>

			<div className="grid grid-flow-row auto-rows-max mt-5">
				<button className="border border-white rounded text-white bg-gray-700 bg-opacity-50 p-3 text-center hover:bg-white hover:border-gray-700 hover:text-gray-700" onClick={ e => onSubmit(state) }>Create</button>
			</div>
		</div>
	);
};

export default HostGame;