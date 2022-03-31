import React from "react";
import { Link } from "react-router-dom";

export function Default() {
	return (
		<>
			<div>Home page</div>
			<Link to={ "/map" }>Map</Link>
		</>
	);
}

export default Default;