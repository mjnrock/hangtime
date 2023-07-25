import {
	Routes,
	Route,
	Link
} from "react-router-dom";

import { Default } from "./routes/Default.jsx";
import { Scoreboard } from "./routes/Scoreboard.jsx";
import { Form } from "./routes/Form.jsx";


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
				<NavButton to="/form" label="Form" />
			</NavBar>

			{/* <div className="flex flex-row items-center justify-center p-4">
				<div className="w-1/2 h-1/4">
					<IconSelector onSelect={ (iconName, Icon) => console.log(iconName, Icon) } />
				</div>
			</div> */}

			<div className="m-2 border border-solid rounded border-neutral-200">
				<Routes>
					<Route path="/" element={ <Default /> } />
					<Route path="/scoreboard" element={ <Scoreboard /> } />
					<Route path="/form" element={ <Form /> } />
				</Routes>
			</div>
		</>
	);
}

export default App;