import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Agent from "./@hive/lib/core/Agent";

import Routes from "./routes/package";

const agent = new Agent({
	state: {
		cats: 2,
	},
	triggers: [
		[ "test", [
			(args = [], { state }) => {
				return {
					cats: state.cats + 5,
				}
			}
		]]
	]
});
export const Context = React.createContext(agent);

export function App() {
	return (
		<Context.Provider value={ agent } >
			<Router>
				<Route path="/" element={ <Routes.DefaultLayout /> }>
					<Route index element={ <Routes.Default /> } />
					<Route path="test" element={ <Routes.Test /> } />
					
					<Route path="find" element={ <Routes.Find /> } />
					<Route path="host" element={ <Routes.Host /> } />
				</Route>
			</Router>
		</Context.Provider>
	);
}

// fetch("https://nominatim.openstreetmap.org/search/opa%2C+48362?format=json").then(results => results.json()).then(json => console.log(json))

export default App;
