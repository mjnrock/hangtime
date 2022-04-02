import { Outlet, Link } from "react-router-dom";

export function DefaultLayout() {
	return (
		<div>
			<div className="text-2xl">Header</div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/host">Host</Link>
					</li>
					<li>
						<Link to="/find">Find</Link>
					</li>
				</ul>
			</nav>

			<hr />

			<Outlet />
		</div>
	);
}

export default DefaultLayout;