import React, { useState, useEffect } from "react";

import HostMap from "../components/HostMap";
import HostGame from "../components/HostGame";

export function Find() {
	const [ coords, setCoords ] = useState({});
	const [ position, setPosition ] = useState([ 0, 0 ]);
	
	//TODO Invoke this by something other than component execution
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
			setPosition([ coords.latitude, coords.longitude ]);
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
		<div className="mt-5 flex flex-col h-screen">
			<HostMap onPosition={ pos => setCoords(pos) }>
				<HostGame onSubmit={ obj => onSubmit(obj) } />
			</HostMap>
		</div>
	);
}

export default Find;
