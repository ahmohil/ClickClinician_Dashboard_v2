import { NavLink, useNavigate } from "react-router-dom";
import { userStore } from "@store";

const AdminSidebar = () => {
	const navigate = useNavigate();

	const UserStore = userStore((state) => state);

	const onLogout = () => {
		UserStore.purgeAuth();
		navigate("/");
	};

	const homeSidebarClose = () => {
		if (document.body.classList.contains("show-sidebar")) {
			document.body.classList.remove("show-sidebar");
		}
	};

	return (
		<>
			<div className="sidebar" id="sidebar">
				<div className="top-content">
					<ul>
						{/* <li>
							<NavLink to={"/admin"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="humbleicons:dashboard"></span>
								</span>
								<span className="side-link">Dashboard</span>
							</NavLink>
						</li> */}
						<li>
							<NavLink to={"/admin/agencies"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="majesticons:users-line"></span>
								</span>
								<span className="side-link">Agencies</span>
							</NavLink>
						</li>

						<li>
							<NavLink to={"/admin/clinicians"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="pixelarticons:contact"></span>
								</span>
								<span className="side-link">Clinicians</span>
							</NavLink>
						</li>

						<li>
							<NavLink to={"/admin/service-requests"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic fs-22">
									<iconify-icon icon="carbon:incomplete"></iconify-icon>
								</span>
								<span className="side-link">Service Requests</span>
							</NavLink>
						</li>
						{/* <li>
							<NavLink to={"/admin/all-bookings"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="pixelarticons:contact"></span>
								</span>
								<span className="side-link">Bookings Management</span>
							</NavLink>
						</li>
						<li>
							<NavLink to={"/admin/support-tickets"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="mdi:support"></span>
								</span>
								<span className="side-link">Support Tickets</span>
							</NavLink>
						</li>

						<li>
							<NavLink to={"/admin/transactions"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="mdi:support"></span>
								</span>
								<span className="side-link">Transactions</span>
							</NavLink>
						</li>

						<li>
							<NavLink to={"/admin/home-support-chats"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="fs-20">
										<iconify-icon icon="streamline:customer-support-1-solid"></iconify-icon>
									</span>
								</span>
								<span className="side-link">Support Chats</span>
							</NavLink>
						</li> 

						<li>
							<NavLink to={"/admin/categories"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic">
									<span className="iconify" data-icon="carbon:category"></span>
								</span>
								<span className="side-link">Categories</span>
							</NavLink>
						</li>
						<li>
							<NavLink to={"/admin/waitListUsers"} end onClick={() => homeSidebarClose()}>
								<span className="side-ic fs-24 ">
									<iconify-icon icon="medical-icon:i-waiting-area"></iconify-icon>
								</span>
								<span className="side-link mt-1">Pre-Launch List</span>
							</NavLink>
						</li>
					*/}

					</ul>
				</div>
				<div className="bottom-content">
					<ul>
						<li className="mb-0 ">
							<a
								className="pointer"
								onClick={() => {
									homeSidebarClose();
									onLogout();
								}}>
								<span className="side-ic">
									<span className="iconify" data-icon="material-symbols:logout"></span>{" "}
								</span>
								<span className="side-link">Logout</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default AdminSidebar;
