import { Routes as Router, Route } from "react-router-dom";

import Routes from "./routes/package";

export function App() {
	return (
		<Router>
			<Route
				path="/"
				element={ <Routes.DefaultLayout /> }
			>
				<Route
					index
					element={ <Routes.Default /> }
				/>
			</Route>
		</Router>
	);
}

export default App;