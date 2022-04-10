import { Outlet, Link } from "react-router-dom";

export function DefaultLayout() {	
	return (
		<div>
			<div className="p-2 font-mono text-2xl font-bold text-center">Hangtime</div>
			<div className="flex flex-row font-bold text-center">
				<Link className="flex-1 p-5 hover:bg-gray-700 hover:text-white" to="/">Home</Link>
				<Link className="flex-1 p-5 hover:bg-gray-700 hover:text-white" to="/host">Host</Link>
				<Link className="flex-1 p-5 hover:bg-gray-700 hover:text-white" to="/find">Find</Link>
			</div>

			<hr />

			<Outlet />
		</div>
	);
}

export default DefaultLayout;