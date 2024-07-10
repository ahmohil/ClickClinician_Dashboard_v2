import { useState, Fragment, useContext, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { userStore } from "@store";
import { titleCase } from "@transformers";
import { DismissibleAlert } from "@components";
import { ResendVerificationEmail } from "@services";
import { failureToaster, isDataExists, successToaster } from "@utils";
import { useWindowScroll } from "@hooks";
import Notifications from "../common/Notifications";
import { SocketContext } from "../../socket";
import Offcanvas from "react-bootstrap/Offcanvas";
import AdminHeader from "../adminLayout/adminHeader";
import { useIsActive } from "../../hooks/useIsActive";

const EMAIL_NOT_VERIFIED_TEXT =
	"Your email is not verified yet! You may verify your email by clicking on the link sent to your email address.";
const RESEND_EMAIL = "Email Sent To Your Email!";

export default function Header() {
	const location = useLocation();
	const socket = useContext(SocketContext);
	const navigate = useNavigate();
	const stickyClass = useWindowScroll();
	const UserStore = userStore((state) => state);
	const [isLoading, setIsLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [active, setActive] = useState("list");

	const isActive = useIsActive;

	const onLogout = () => {
		homeNav();
		UserStore.purgeAuth();
		UserStore.resetMsgCount();
		navigate("/");
	};

	// const onSmallLogout = () => {
	// 	UserStore.purgeAuth();
	// 	UserStore.resetMsgCount();
	// 	setShow(false);
	// 	navigate("/");
	// };
	// const isActive = (path) => location.pathname === path;

	const onCreateService = () => {
		if (!UserStore.loggedInUser.isEmailVerified) {
			navigate("/settings/edit-profile");
			failureToaster("Please verify your email first!");
			return;
		}
		const mandatoryFields = ["dob", "email", "phone", "address", "username", "timeZone"];
		let fieldsWithNoData = mandatoryFields.filter((field) => !UserStore.loggedInUser[field]);
		if (!UserStore.loggedInUser.identityImages || UserStore.loggedInUser.identityImages.length === 0) {
			fieldsWithNoData.push("identityImages");
		}
		if (fieldsWithNoData.length > 0) {
			navigate("/settings/edit-profile", { state: { fieldsWithNoData } });
			failureToaster("Please complete your profile to start listing");
		} else {
			navigate("/services/create");
		}
	};

	const onSmallLogout = () => {
		UserStore.purgeAuth();
		UserStore.resetMsgCount();
		setShow(false);
		navigate("/");
	};

	const onResendVerificationEmail = async () => {
		setIsLoading(true);
		try {
			await ResendVerificationEmail(UserStore.loggedInUser.phone);
			successToaster(RESEND_EMAIL);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			failureToaster(error.message);
		}
	};

	// const onCreateService = () => {
	// 	const mandatoryFields = ["dob", "email", "phone", "address", "username", "timeZone"];
	// 	const fieldsWithNoData = [];

	// 	if (!UserStore.loggedInUser.isEmailVerified) {
	// 		navigate("/settings/edit-profile");
	// 		failureToaster(`Please verify your email first!`);
	// 		return;
	// 	} else {
	// 		for (const field of mandatoryFields) {
	// 			if (!UserStore.loggedInUser[field] || !isDataExists(UserStore.loggedInUser[field])) {
	// 				fieldsWithNoData.push(field);
	// 			}
	// 		}

	// 		if (!UserStore.loggedInUser.identityImages || UserStore.loggedInUser.identityImages.length == 0) {
	// 			fieldsWithNoData.push("identityImages");
	// 		}
	// 		if (fieldsWithNoData.length > 0) {
	// 			navigate("/settings/edit-profile", { state: { fieldsWithNoData } });
	// 			failureToaster(`Please complete your profile to start listing`);
	// 		} else navigate("/services/create");
	// 	}
	// };

	const homeNav = () => {
		if (document.body.classList.contains("home-sm")) {
			document.body.classList.remove("home-sm");
		} else {
			document.body.classList.add("home-sm");
		}
	};

	useEffect(() => {
		socket.on(`${UserStore.loggedInUser?._id}-count-message`, (e) => {
			if (!window.location.pathname.includes("/chat")) {
				UserStore.readCountMsg();
			}
		});
		return () => {
			socket.off(`${UserStore.loggedInUser?._id}-count-message`);
		};
	}, [UserStore.loggedInUser]);

	return (
		<Fragment>
			{UserStore?.loggedInUser?.role !== "admin" && (
				<>
					<nav
						id="navBar"
						className={`navbar navbar-expand-lg  ${stickyClass} ${
							!!UserStore.loggedInUser && stickyClass.length === 0 ? "position-static" : ""
						}`}>
						<div className="container py-2">
							<Link to="/" className="navbar-brand">
								<img src="/assets/images/logo.svg" alt="" />
							</Link>

							{!!UserStore.loggedInUser && (
								<div className="d-block d-lg-none ms-auto me-4">
									<Notifications />
								</div>
							)}

							{!UserStore.loggedInUser && (
								<div className="d-block d-lg-none containers-mid">
									<Link to={"/auth"} className="login-btn">
										Login/Sign Up{" "}
										<span className="fs-24">
											{" "}
											<span className="iconify" data-icon="prime:user"></span>
										</span>
									</Link>
								</div>
							)}

							<div className="d-lg-none d-inline-flex gap-2 align-items-center" onClick={() => setShow(true)}>
								{UserStore.loggedInUser && (
									<button className="loggedIn-btn border-0">
										<img src="/assets/images/Menu-right.svg" alt="" />{" "}
										<span className="user-ic ms-2">
											<img src={UserStore.loggedInUser.profileImage} alt="" />
										</span>
									</button>
								)}
							</div>

							<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
								<div className="d-lg-none d-flex justify-content-between text-end p-4">
									<Link to="/" className="navbar-brand ">
										<img src="/assets/images/logo.svg" alt="" />
									</Link>
									<div onClick={homeNav} className="cross-btn">
										<span className="iconify" data-icon="akar-icons:cross"></span>
									</div>
								</div>
								<div className="offcanva-div  d-flex flex-column flex-lg-row justify-content-end  flex-1">
									{UserStore.loggedInUser && (
										<ul className="navbar-nav align-items-center mx-0 mx-lg-auto">
											<li className="nav-item order-0">
												<Link to={"/"} className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={homeNav}>
													<span className="iconify" data-icon="octicon:home-16"></span>{" "}
													<span className="nav-text"> Home</span>
												</Link>
											</li>

											<li className="nav-item order-10">
												<Link
													to={"/dashboard"}
													className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
													onClick={homeNav}>
													<span className="iconify" data-icon="humbleicons:dashboard"></span>{" "}
													<span className="nav-text"> Dashboard </span>
												</Link>
											</li>

											<li className="nav-item order-1 order-lg-2">
												<Link
													to={"/services/search"}
													className={`nav-link ${isActive("/services/search") ? "active" : ""}`}
													onClick={homeNav}>
													<span className="iconify" data-icon="uil:search"></span>{" "}
													<span className="nav-text"> Search </span>
												</Link>
											</li>

											<li className="nav-item order-4 order-lg-3">
												<Link
													to={"/settings/favorites"}
													className={`nav-link ${isActive("/settings/favorites") ? "active" : ""}`}
													onClick={homeNav}>
													<span className="iconify" data-icon="mdi:heart-outline"></span>{" "}
													<span className="nav-text"> Favorites </span>
												</Link>
											</li>

											<li className="nav-item order-3 order-lg-4">
												<Link
													to={"/chat"}
													className={`nav-link ${isActive("/chat") ? "active" : ""}`}
													onClick={() => {
														homeNav();
														UserStore.resetMsgCount();
													}}>
													<span className="iconify" data-icon="mdi:envelope-outline"></span>{" "}
													<span className="nav-text"> Inbox </span>
													{isDataExists(UserStore.msgCount) && (
														<div className="notification-number">{`${
															UserStore.msgCount > 9 ? `9+` : UserStore.msgCount
														}`}</div>
													)}
												</Link>
											</li>

											<li className="nav-item order-2 order-lg-5">
												<Link
													to={"/bookings"}
													className={`nav-link ${isActive("/bookings") ? "active" : ""}`}
													onClick={homeNav}>
													<span className="iconify" data-icon="majesticons:calendar-line"></span>{" "}
													<span className="nav-text">My Bookings </span>
												</Link>
											</li>

											<li className="nav-item order-6">
												<Link
													to={"/services"}
													state={{ isMyServices: true }}
													className={`nav-link ${isActive("/services") ? "active" : ""}`}
													onClick={homeNav}>
													<iconify-icon icon="eos-icons:service-outlined"></iconify-icon>{" "}
													<span className="nav-text">My Listings </span>
												</Link>
											</li>
											<li className="nav-item order-7 d-block d-lg-none">
												<Link
													to={"/settings"}
													className={`nav-link ${isActive("/settings") ? "active" : ""}`}
													onClick={homeNav}>
													<iconify-icon icon="ant-design:setting-twotone"></iconify-icon>
													<span className="nav-text"> Settings </span>
												</Link>
											</li>
											<li className="nav-item order-8 d-block d-lg-none">
												<Link
													to={"/earnings"}
													className={`nav-link ${isActive("/earnings") ? "active" : ""}`}
													onClick={homeNav}>
													<iconify-icon icon="tdesign:money"></iconify-icon>
													<span className="nav-text"> Earnings</span>
												</Link>
											</li>
											<li className="nav-item order-9 d-block d-lg-none">
												<Link
													to={"/support"}
													className={`nav-link ${isActive("/support") ? "active" : ""}`}
													onClick={homeNav}>
													<span className="iconify" data-icon="mdi:support"></span>
													<span className="nav-text">Support Center</span>
												</Link>
											</li>
											<li
												className={`nav-item order-5 d-block d-lg-none ${
													isActive("/services/create") ? "active" : ""
												}`}>
												<button className="nav-link" onClick={onCreateService}>
													<span className="iconify" data-icon="uil:plus"></span>
													<span className="nav-text">List Service</span>
												</button>
											</li>
											<li className={`nav-item order-12 d-block d-lg-none ${isActive("/") ? "active" : ""}`}>
												<button className="nav-link text-danger" onClick={onSmallLogout}>
													<span className="iconify" data-icon="material-symbols:logout"></span>
													<span className="nav-text">Logout</span>
												</button>
											</li>
										</ul>
									)}

									<div className=" d-flex align-items-center pt-lg-0 pt-5 px-4 px-lg-0">
										{!UserStore.loggedInUser && (
											<Link to={"/auth"} className={`login-btn ${isActive("/auth") ? "active" : ""}`}>
												Login/Sign Up{" "}
												<span className="fs-28">
													{" "}
													<span className="iconify" data-icon="prime:user"></span>
												</span>
											</Link>
										)}

										{UserStore.loggedInUser && (
											<div className="d-none d-lg-flex flex-md-row align-items-center flex-column gap-3 position-relative">
												<div className="d-none d-md-block ">
													<Notifications />
												</div>
												<div className="d-flex align-items-center gap-3">
													<button
														onClick={onCreateService}
														className={`login-btn ${active == "list" ? "primary-bg text-white border-0" : ""} `}>
														List
														<span className="fs-28">
															{" "}
															<span className="iconify" data-icon="uil:plus"></span>
														</span>
													</button>

													<div className="dropdown ">
														<button
															className="loggedIn-btn pointer"
															role="button"
															id="dropdownMenuLink"
															data-bs-toggle="dropdown"
															aria-expanded="false">
															<div className="text-truncate w-50px">{titleCase(UserStore.loggedInUser.username)}</div>
															<span className="user-ic ms-1">
																<img src={UserStore.loggedInUser.profileImage} alt="" />
															</span>
														</button>

														<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
															{UserStore.loggedInUser.role === "admin" && (
																<>
																	<li>
																		<Link
																			className={` ${
																				window.location.pathname == "admin" ? "active" : ""
																			} dropdown-item`}
																			to={"/admin"}>
																			<span className="me-2 fs-22">
																				<span className="iconify" data-icon="lucide:settings"></span>
																			</span>
																			<span className="side-link">Dashboard</span>
																		</Link>
																	</li>
																</>
															)}
															<li>
																<Link to={"/settings"} className={`dropdown-item `}>
																	<span className="me-2 fs-22">
																		<span className="iconify" data-icon="lucide:settings"></span>
																	</span>
																	<span className="side-link">Settings</span>
																</Link>
															</li>

															<li>
																<Link to={"/earnings"} className={`dropdown-item `}>
																	<span className="me-2 fs-22">
																		<iconify-icon icon="tdesign:money"></iconify-icon>
																	</span>
																	<span className="side-link">Earnings</span>
																</Link>
															</li>
															<li>
																<Link to={"/support"} className={`dropdown-item   `}>
																	<span className="me-2 fs-22">
																		<span className="iconify" data-icon="mdi:support"></span>
																	</span>
																	<span className="side-link">Support Center</span>
																</Link>
															</li>

															<li>
																<button className="dropdown-item" onClick={onLogout}>
																	<span className="me-2 fs-22">
																		<span className="iconify" data-icon="material-symbols:logout"></span>
																	</span>
																	<span className="side-link">Logout</span>
																</button>
															</li>
														</ul>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</nav>

					{!!UserStore.loggedInUser && !UserStore.loggedInUser.isEmailVerified && (
						<DismissibleAlert
							isCloseAble={false}
							message={EMAIL_NOT_VERIFIED_TEXT}
							btnMessage={"Resend Now?"}
							onBtnClick={onResendVerificationEmail}
							isLoading={isLoading}
						/>
					)}

					<Offcanvas className="header-canves" show={show} onHide={() => setShow(false)}>
						<Offcanvas.Header className="ps-1 pe-4" closeButton>
							<Offcanvas.Title>
								<Link to="/" className="navbar-brand">
									<img src="/assets/images/logo.svg" alt="" />
								</Link>
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<ul className="d-flex flex-column gap-1">
								<li className="nav-item order-0">
									<Link to={"/"} className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setShow(false)}>
										<span className="iconify" data-icon="octicon:home-16"></span>{" "}
										<span className="nav-text"> Home</span>
									</Link>
								</li>

								<li className="nav-item order-10">
									<Link
										to={"/dashboard"}
										className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<span className="iconify" data-icon="humbleicons:dashboard"></span>{" "}
										<span className="nav-text"> Dashboard </span>
									</Link>
								</li>

								<li className="nav-item order-1 order-lg-2">
									<Link
										to={"/services/search"}
										className={`nav-link ${isActive("/services/search") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<span className="iconify" data-icon="uil:search"></span> <span className="nav-text"> Search </span>
									</Link>
								</li>

								<li className="nav-item order-4 order-lg-3">
									<Link
										to={"/settings/favorites"}
										className={`nav-link ${isActive("/settings/favorites") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<span className="iconify" data-icon="mdi:heart-outline"></span>{" "}
										<span className="nav-text"> Favorites </span>
									</Link>
								</li>

								<li className="nav-item order-3 order-lg-4">
									<Link
										to={"/chat"}
										className={`nav-link ${isActive("/chat") ? "active" : ""}`}
										onClick={() => {
											setShow(false);
											UserStore.resetMsgCount();
										}}>
										<span className="iconify" data-icon="mdi:envelope-outline"></span>{" "}
										<span className="nav-text"> Inbox </span>
										{isDataExists(UserStore.msgCount) && (
											<div className="notification-number">{`${
												UserStore.msgCount > 9 ? `9+` : UserStore.msgCount
											}`}</div>
										)}
									</Link>
								</li>

								<li className="nav-item order-2 order-lg-5">
									<Link
										to={"/bookings"}
										className={`nav-link ${isActive("/bookings") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<span className="iconify" data-icon="majesticons:calendar-line"></span>{" "}
										<span className="nav-text">My Bookings </span>
									</Link>
								</li>

								<li className="nav-item order-6">
									<Link
										to={"/services"}
										state={{ isMyServices: true }}
										className={`nav-link ${isActive("/services") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<iconify-icon icon="eos-icons:service-outlined"></iconify-icon>{" "}
										<span className="nav-text">My Listings </span>
									</Link>
								</li>
								<li className="nav-item order-7 d-block d-lg-none">
									<Link
										to={"/settings"}
										className={`nav-link ${isActive("/settings") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<iconify-icon icon="ant-design:setting-twotone"></iconify-icon>
										<span className="nav-text"> Settings </span>
									</Link>
								</li>
								<li className="nav-item order-8 d-block d-lg-none">
									<Link
										to={"/earnings"}
										className={`nav-link ${isActive("/earnings") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<iconify-icon icon="tdesign:money"></iconify-icon>
										<span className="nav-text"> Earnings</span>
									</Link>
								</li>
								<li className="nav-item order-9 d-block d-lg-none">
									<Link
										to={"/support"}
										className={`nav-link ${isActive("/support") ? "active" : ""}`}
										onClick={() => setShow(false)}>
										<span className="iconify" data-icon="mdi:support"></span>
										<span className="nav-text">Support Center</span>
									</Link>
								</li>

								<li className={`nav-item order-5 d-block d-lg-none ${isActive("/services/create") ? "active" : ""}`}>
									<button
										className={`nav-link ${active === "list" ? "textPrimary" : ""}`}
										onClick={() => {
											onCreateService();
											setShow(false);
										}}>
										<span className="iconify textPrimary" data-icon="uil:plus"></span>
										<span className="nav-text textPrimary">List Service</span>
									</button>
								</li>
								<li className={`nav-item order-12 d-block d-lg-none ${isActive("/") ? "active" : ""}`}>
									<button
										className="nav-link text-danger"
										onClick={() => {
											setShow(false);
											onSmallLogout();
										}}>
										<span className="iconify" data-icon="material-symbols:logout"></span>
										<span className="nav-text">Logout</span>
									</button>
								</li>
							</ul>
						</Offcanvas.Body>
					</Offcanvas>
				</>
			)}

			{UserStore?.loggedInUser?.role == "admin" && (
				<>
					<AdminHeader />
				</>
			)}
		</Fragment>
	);
}
