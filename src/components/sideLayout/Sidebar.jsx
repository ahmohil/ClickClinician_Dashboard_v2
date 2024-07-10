import { NavLink, useNavigate } from "react-router-dom";
import { userStore } from "@store";

const Sidebar = () => {
	const navigate = useNavigate();

	const UserStore = userStore((state) => state);

	const homeSidebarClose = () => {
		if (document.body.classList.contains("show-sidebar")) {
			document.body.classList.remove("show-sidebar");
		}
	};

	const onLogout = () => {
		UserStore.purgeAuth();
		UserStore.purgeAuth();

		navigate("/");
	};

	return (
		<div className="sidebar" id="sidebar">
			<div className="top-content">
				<ul>
					<li>
						<NavLink to={"/settings"} end onClick={() => homeSidebarClose()}>
							<span className="side-ic">
								<span className="iconify" data-icon="prime:user"></span>
							</span>
							<span className="side-link">Profile</span>
						</NavLink>
					</li>
					<li>
						<NavLink to={"/settings/favorites"} end onClick={() => homeSidebarClose()}>
							<span className="side-ic">
								<span className="iconify" data-icon="iconoir:star"></span>
							</span>
							<span className="side-link">Favorites</span>
						</NavLink>
					</li>
					<li>
						<NavLink to={"/settings/support-center"} end onClick={() => homeSidebarClose()}>
							<span className="side-ic">
								<span className="iconify" data-icon="majesticons:scroll-text-line"></span>
							</span>
							<span className="side-link">Support Center</span>
						</NavLink>
					</li>
					{/* <li>
						<NavLink to={"/settings/earnings"} end onClick={() => homeSidebarClose()}>
							<span className="me-2 fs-22">
								<iconify-icon icon="tdesign:money"></iconify-icon>
							</span>
							<span className="side-link">Earnings</span>
						</NavLink>
					</li> */}
					<li>
						<NavLink to={"/settings/terms"} end onClick={() => homeSidebarClose()}>
							<span className="side-ic">
								<span className="iconify" data-icon="majesticons:scroll-text-line"></span>
							</span>
							<span className="side-link">Terms of use</span>
						</NavLink>
					</li>

					{/* <li>
						<NavLink to={"/referral"} end onClick={() => homeSidebarClose()}>
							<span className="side-ic">
								<span className="iconify" data-icon="majesticons:scroll-text-line"></span>
							</span>
							<span className="side-link">Referral</span>
						</NavLink>
					</li> */}

					<li>
						<NavLink to={"/settings/privacy"} end onClick={() => homeSidebarClose()}>
							<span className="side-ic">
								<span className="iconify" data-icon="gala:secure"></span>
							</span>
							<span className="side-link">Privacy Policy</span>
						</NavLink>
					</li>
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
							{" "}
							<span className="side-ic">
								<span className="iconify" data-icon="material-symbols:logout"></span>{" "}
							</span>
							<span className="side-link">Logout</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
