import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { userStore } from "../../store/user";

export default function Layout() {
	const [isPositionStatic, setIsPositionStatic] = useState(true);
	const UserStore = userStore((state) => state);

	const checkNavbarClass = () => {
		const navbar = document.querySelector(".navbar");
		if (navbar.classList.contains("position-static")) {
			setIsPositionStatic(true);
		} else {
			setIsPositionStatic(false);
		}
	};

	useEffect(() => {
		const navbar = document.querySelector(".navbar");
		const observer = new MutationObserver(checkNavbarClass);

		observer.observe(navbar, { attributes: true, attributeFilter: ["class"] });

		return () => observer.disconnect();
	}, []);

	return (
		<Fragment>
			<Header />

			<div className={`${!!UserStore.loggedInUser && !UserStore.loggedInUser.isEmailVerified ? "pt-40" : "pt-130"}`}>
				<Outlet />
			</div>
			<Footer />
		</Fragment>
	);
}
