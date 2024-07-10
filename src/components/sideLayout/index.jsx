import { Outlet } from "react-router-dom";
import Sidebar from "../sideLayout/Sidebar";

export default function SideLayout() {
	return (
		<div className="container">
			<div className="row pt-4">
				<div className="col-lg-3 col-0 ">
					<Sidebar />
				</div>
				<div className="col-lg-9 col-12">
					<div className="main">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
