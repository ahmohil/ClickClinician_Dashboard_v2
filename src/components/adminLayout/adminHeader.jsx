import { Fragment, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { userStore } from "@store";
import { titleCase } from "@transformers";
import { useWindowScroll } from "@hooks";
import { Offcanvas } from "react-bootstrap";

export default function AdminHeader() {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const stickyClass = useWindowScroll();

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

	const homeNav = () => {
		if (document.body.classList.contains("home-sm")) {
			document.body.classList.remove("home-sm");
		} else {
			document.body.classList.add("home-sm");
		}
	};

	return (
		<>
			<nav className={`navbar navbar-expand-lg transition-all  ${stickyClass}`}>
				<div className="container">
					<Link to="/admin/agencies" className="navbar-brand">
						<img src="/assets/images/logo.png" alt="" height={50}/>
						{/* <h3 
							className="logo-text"
							style={{ 
								fontFamily: "'Pacifico', cursive", 
								fontSize: "2rem", 
								color: "#00a7e5", 
								textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
								letterSpacing: "1px",
								transition: "transform 0.3s ease, margin-top 0.3s ease"
							}}
						>
							Click Clinician
						</h3> */}
					</Link>
					<div className="d-lg-none d-inline-flex gap-2 align-items-center">
						{!UserStore?.loggedInUser && (
							<Link className="loggedIn-btn border-0">
								<img
									src="/assets/images/Menu-right.svg"
									onClick={() => {
										homeNav();
									}}
									alt=""
								/>{" "}
								<span className="user-ic ms-2">
									<img src="/assets/images/user.png" alt="" />
								</span>
							</Link>
						)}
					</div>
					<div className="d-none d-lg-block flex-md-row flex-column gap-3">
						<div className="dropdown">
							<a
								className="loggedIn-btn pointer"
								role="button"
								id="dropdownMenuLink"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								<Fragment>{titleCase(UserStore?.loggedInUser?.username)}</Fragment>
								{/* <span className="user-ic ms-1"> */}
								<span>
									{/* <img src={UserStore?.loggedInUser?.profileImage} alt="" /> */}
									Dan Android
								</span>
							</a>

							<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
								<li>
									<Link className="dropdown-item" to={"/admin"}>
										<span className="me-2 fs-22">
											<span className="iconify" data-icon="lucide:settings"></span>
										</span>
										<span className="side-link">Dashboard</span>
									</Link>
								</li>

								<li>
									<a className="dropdown-item pointer" onClick={onLogout}>
										<span className="me-2 fs-22">
											<span className="iconify" data-icon="material-symbols:logout"></span>
										</span>
										<span className="side-link">Logout</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="d-inline-flex d-lg-none  gap-2 align-items-center" onClick={() => setShow(true)}>
						{UserStore.loggedInUser && (
							<button className="loggedIn-btn">
								Admin
								<span className="user-ic ms-1">
									{/* <img src={UserStore?.loggedInUser?.profileImage} alt="" /> */}
									Dan Android
								</span>
							</button>
						)}
					</div>
					<Offcanvas className="header-canves" show={show} onHide={() => setShow(false)}>
						<Offcanvas.Header className="ps-1 pe-4" closeButton>
							<Offcanvas.Title>
								<Link to="/" className="navbar-brand">
									<img src="/assets/images/logo.svg" alt="" />
								</Link>
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className="admin-sidebars">
							<ul>
								<li>
									<NavLink to={"/admin"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="humbleicons:dashboard"></span>
										</span>
										<span className="side-link">Dashboard</span>
									</NavLink>
								</li>
								<li>
									<NavLink to={"/admin/users"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="majesticons:users-line"></span>
										</span>
										<span className="side-link">Users</span>
									</NavLink>
								</li>

								<li>
									<NavLink to={"/admin/contacts"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="pixelarticons:contact"></span>
										</span>
										<span className="side-link">Contacts</span>
									</NavLink>
								</li>

								<li>
									<NavLink to={"/admin/draft-services"} end onClick={() => setShow(false)}>
										<span className="side-ic fs-22">
											<iconify-icon icon="carbon:incomplete"></iconify-icon>
										</span>
										<span className="side-link">InComplete Services</span>
									</NavLink>
								</li>

								<li>
									<NavLink to={"/admin/all-bookings"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="pixelarticons:contact"></span>
										</span>
										<span className="side-link">Bookings Management</span>
									</NavLink>
								</li>
								<li>
									<NavLink to={"/admin/support-tickets"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="mdi:support"></span>
										</span>
										<span className="side-link">Support Tickets</span>
									</NavLink>
								</li>

								<li>
									<NavLink to={"/admin/support-chats"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="mdi:support"></span>
										</span>
										<span className="side-link">Support Chats</span>
									</NavLink>
								</li>

								<li>
									<NavLink to={"/admin/categories"} end onClick={() => setShow(false)}>
										<span className="side-ic">
											<span className="iconify" data-icon="carbon:category"></span>
										</span>
										<span className="side-link">Categories</span>
									</NavLink>
								</li>
								<li>
									<NavLink to={"/admin/waitListUsers"} end onClick={() => setShow(false)}>
										<span className="side-ic fs-24 ">
											<iconify-icon icon="medical-icon:i-waiting-area"></iconify-icon>
										</span>
										<span className="side-link mt-1">Pre-Launch List</span>
									</NavLink>
								</li>
							</ul>
							<ul>
								<li className="mb-0 ">
									<a
										className="pointer"
										onClick={() => {
											setShow(false);
											onLogout();
										}}>
										<span className="side-ic">
											<span className="iconify" data-icon="material-symbols:logout"></span>{" "}
										</span>
										<span className="side-link">Logout</span>
									</a>
								</li>
							</ul>
						</Offcanvas.Body>
					</Offcanvas>
				</div>
			</nav>
		</>
	);
}
