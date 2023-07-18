import React from "react";
import { Link } from "react-router-dom";

export function Default() {
	return (
		<>
			<div>Home page</div>
			<Link to={ "/test" }>Test</Link>

			<Link to={ "/find" }>Find</Link>
			<Link to={ "/host" }>Host</Link>
		</>
	);
}

export default Default;