import { Outlet } from "react-router-dom";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";

export default function AdminLayout() {
	return (
		<div className="admin-wrapper">
			<AdminHeader />
			<div className="admin-aside">
				<AdminSidebar />
				<div className="main">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
