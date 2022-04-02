import { useState } from "react";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";
import cn from "classnames";

const CSS = {
	Input: cn("border rounded m-1 p-2 flex-1 bg-gray-700 text-white border-white hover:bg-white hover:text-gray-700 hover:border-gray-700"),
	Background: {
		Dark: cn("bg-gray-700 text-white border-white bg-opacity-70"),
	}
};

export function HostGame({ onSubmit, className }) {
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
		<div className={ cn(className) }>
			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className={ cn(CSS.Input) } placeholder="Category" value={ state.category } onChange={ e => update("category", e.target.value) } />
				<input type="text" className={ cn(CSS.Input) } placeholder="Activity" value={ state.activity } onChange={ e => update("activity", e.target.value) } />
			</div>

			<div className="grid grid-flow-row auto-rows-max">
				<input type="text" className={ cn(CSS.Input) } placeholder="Tagline" value={ state.subject } onChange={ e => update("subject", e.target.value) } />
				<textarea type="text" className={ cn(CSS.Input, "h-[120px]") } placeholder="Game Details" value={ state.comment } onChange={ e => update("comment", e.target.value) }></textarea>
				<input type="text" className={ cn(CSS.Input) } placeholder="Tagline" value={ state.radius } onChange={ e => update("radius", ~~e.target.value) } />
			</div>

			<div className="grid grid-flow-row auto-rows-max">
				<input type="datetime-local" className={ cn(CSS.Input) } value={ dateFormat(state.start, "yyyy-mm-dd'T'HH:MM:ss") } onChange={ e => update("start", new Date(e.target.value)) } />
				<input type="datetime-local" className={ cn(CSS.Input) } value={ dateFormat(state.end, "yyyy-mm-dd'T'HH:MM:ss") } onChange={ e => update("end", new Date(e.target.value)) } />
			</div>

			<div className="grid grid-flow-row auto-rows-max mt-5">
				<button className={ cn(CSS.Input) } onClick={ e => onSubmit(state) }>Create</button>
			</div>
		</div>
	);
};

export default HostGame;