import { Outlet, Link } from "react-router-dom";

export function DefaultLayout() {
	return (
		<div>
			<div className="text-2xl font-bold font-mono p-2 text-center">Hangtime</div>
			<div className="flex flex-row text-center font-bold">
				<Link className="flex-1 hover:bg-gray-700 hover:text-white p-5" to="/">Home</Link>
				<Link className="flex-1 hover:bg-gray-700 hover:text-white p-5" to="/host">Host</Link>
				<Link className="flex-1 hover:bg-gray-700 hover:text-white p-5" to="/find">Find</Link>
			</div>

			<hr />

			<Outlet />
		</div>
	);
}

export default DefaultLayout;