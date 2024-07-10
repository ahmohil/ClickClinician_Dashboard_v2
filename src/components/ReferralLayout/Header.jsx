import { useState, Fragment } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { userStore } from "@store";
import { titleCase } from "@transformers";
import { DismissibleAlert } from "@components";
import { ResendVerificationEmail } from "@services";
import { failureToaster, isDataExists, successToaster } from "@utils";
import { useWindowScroll } from "@hooks";
import Notifications from "../common/Notifications";

const EMAIL_NOT_VERIFIED_TEXT =
	"Your email is not verified yet! You may verify your email by clicking on the link sent to your email address.";
const RESEND_EMAIL = "Email Sent To Your Email!";

export default function Header() {
	const navigate = useNavigate();

	const stickyClass = useWindowScroll();

	const UserStore = userStore((state) => state);

	const [isLoading, setIsLoading] = useState(false);

	const onLogout = () => {
		homeNav();
		UserStore.purgeAuth();
		navigate("/");
	};

	const homeNav = () => {
		if (document.body.classList.contains("home-sm")) {
			document.body.classList.remove("home-sm");
		} else {
			document.body.classList.add("home-sm");
		}
	};

	return (
		<div>
			<nav
				id="navBar"
				className={`navbar navbar-expand-lg transition-all  ${stickyClass} ${
					!!UserStore.loggedInUser && !UserStore.loggedInUser.isEmailVerified && stickyClass.length === 0
						? "position-static"
						: ""
				}`}>
				<div className="container py-2">
					<Link to="/" className="navbar-brand">
						<img src="/assets/images/logo.svg" alt="" />
					</Link>
					<div className="d-lg-none d-inline-flex gap-2 align-items-center"></div>
					<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
						<div className="d-lg-none d-flex justify-content-between text-end p-4">
							<Link to="/" className="navbar-brand">
								<img src="assets/images/logo.svg" alt="" />
							</Link>
							<div onClick={homeNav} className="cross-btn">
								<span className="iconify" data-icon="akar-icons:cross"></span>
							</div>
						</div>
						<div className="offcanva-div d-flex flex-column flex-lg-row justify-content-end ">
							{UserStore.loggedInUser && (
								<ul className="navbar-nav align-items-center gap-2 mx-0 mx-lg-auto">
									<li className="nav-item">
										<NavLink to={"/"} end className="nav-referral" onClick={homeNav}>
											<img src="assets/images/ref-message-circle.svg" alt="message" />
											<span className="nav-text"> Messages </span>{" "}
										</NavLink>
									</li>

									<li className="nav-item">
										<NavLink to={"/dashboard"} end className="nav-referral" onClick={homeNav}>
											<img src="assets/images/ref-List.svg" alt="list" />
											<span className="nav-text"> Manage listing </span>{" "}
										</NavLink>
									</li>

									<li className="nav-item">
										<NavLink to={"/services/search"} end className="nav-referral" onClick={homeNav}>
											<img src="assets/images/ref-calender.svg" alt="calender" />
											<span className="nav-text"> Calendar </span>{" "}
										</NavLink>
									</li>

									<li className="nav-item">
										<NavLink to={"/settings/favorites"} end className="nav-referral" onClick={homeNav}>
											<img src="assets/images/ref-Vector.svg" alt="vector" />
											<span className="nav-text"> Reservations </span>{" "}
										</NavLink>
									</li>
								</ul>
							)}
							<div className="d-flex align-items-center pt-lg-0 pt-5 px-4 px-lg-0">
								{!UserStore.loggedInUser && (
									<Link to={"/auth"} className="login-btn">
										Login/Sign Up{" "}
										<span className="fs-28">
											{" "}
											<span className="iconify" data-icon="prime:user"></span>
										</span>
									</Link>
								)}
								<div className="ref-burger ms-2">
									<iconify-icon icon="iconamoon:menu-burger-horizontal-thin"></iconify-icon>
									<img src="assets/images/user.png" alt="user" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
