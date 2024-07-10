import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function ReferralLayout() {
	return (
		<div className="page-wrapper gap-0">
			<Header />
			<div className="main">
				<Outlet />
			</div>
		</div>
	);
}
