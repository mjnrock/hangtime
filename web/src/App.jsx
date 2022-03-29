import { Routes as Router, Route } from "react-router-dom";

import Routes from "./routes/package";

export function App() {
	return (
		<>
			<Router>
				<Route path="/" element={<Routes.DefaultLayout />}>
					<Route index element={<Routes.Default />} />
				</Route>
			</Router>
		</>
	);
}

// fetch("https://nominatim.openstreetmap.org/search/opa%2C+48362?format=json").then(results => results.json()).then(json => console.log(json))

export default App;