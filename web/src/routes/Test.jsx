import React from "react";

const ws = new WebSocket(`wss://kiszka.com:3001`);
ws.addEventListener('open', function open() {
	ws.send('something');
});

ws.addEventListener('message', function message(msg) {
	console.log(JSON.parse(msg.data));
});

export function Host() {
	return (
		<div>
			Tests
		</div>
	);
}

export default Host;
