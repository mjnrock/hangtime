import {
	Routes,
	Route,
	Link
} from "react-router-dom";

import { Default } from "./routes/Default.jsx";
import { Scoreboard } from "./routes/Scoreboard.jsx";

function NavBar({ children, ...props }) {
	return (
		<nav className="flex flex-row items-stretch border-b rounded shadow-sm bg-neutral-50 border-b-neutral-200" { ...props }>
			{ children }
		</nav>
	);
};

function NavButton({ to, label, children, ...props }) {
	return (
		<Link
			className="block h-full px-2 py-4 hover:bg-neutral-200 active:bg-neutral-300"
			to={ to }
			{ ...props }
		>
			{ label || children }
		</Link>
	);
};

export function App() {
	return (
		<>
			<NavBar>
				<NavButton to="/" label="Home" />
				<NavButton to="/scoreboard" label="Scoreboard" />
			</NavBar>

			<div className="m-2 border border-solid rounded border-neutral-200">
				<Routes>
					<Route path="/" element={ <Default /> } />
					<Route path="/scoreboard" element={ <Scoreboard /> } />
				</Routes>
			</div>
		</>
	);
}

export default App;