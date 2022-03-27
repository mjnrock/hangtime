import { Outlet, Link } from "react-router-dom";

export function Header() {
	return (
		<div>
			{/* <div className="text-2xl">Header</div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
				</ul>
			</nav>

			<hr /> */}

			<Outlet />
		</div>
	);
}

export default Header;