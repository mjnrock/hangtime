import React, { useState, useEffect } from "react";
import cn from "classnames";

import HostMap from "../components/HostMap";
import HostGame from "../components/HostGame";

const CSS = {
	Background: {
		Dark: cn("bg-gray-700 text-white border-white bg-opacity-70"),
	},
	Layer: cn("absolute h-screen w-screen"),
};

export function Find() {
	const [ coords, setCoords ] = useState({});
	const [ position, setPosition ] = useState([ 0, 0 ]);
	
	//TODO Invoke this by something other than component execution
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
			setPosition([ coords.latitude, coords.longitude ]);
		}, e => {}, {
			enableHighAccuracy: true,
		});
	}

	const [ ws, setWs ] = useState();

	useEffect(() => {
		const ws = new WebSocket(`wss://kiszka.com:3001`);
		setWs(ws);

		return () => {
			ws.close();
		};
	}, []);

	function onSubmit(obj) {
		// console.log(JSON.stringify({
		// 	type: "host",
		// 	payload: obj,
		// }));
		ws.send(JSON.stringify({
			type: "host",
			payload: {
				...obj,
				lat: coords[ 0 ],
				long: coords[ 1 ],
			}
		}));
	}

	if(position[ 0 ] === 0 || position[ 1 ] === 0) {
		return (
			<div className="font-bold">Acquiring GPS Position...</div>
		);
	}

	return (
		<div className={ cn(CSS.Layer, "flex flex-col mt-5") }>
			<HostMap onPosition={ pos => setCoords(pos) } className={ cn(CSS.Layer) } />

			<div className={ cn(CSS.Layer, "flex flex-row items-center justify-center") }>
				<div className={ cn("w-1/2 rounded p-5",  CSS.Background.Dark) }>
					<HostGame onSubmit={ obj => onSubmit(obj) } className={ cn("w-full") } />
				</div>
			</div>
		</div>
	);
}

export default Find;
