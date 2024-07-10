import { useEffect, useState } from "react";

export const useWindowScroll = () => {
	const [stickyClass, setStickyClass] = useState("");

	const stickNavbar = () => {
		if (window !== undefined) {
			let windowHeight = window.scrollY;
			windowHeight > 50 ? setStickyClass("bg-pink") : setStickyClass("");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", stickNavbar);

		return () => {
			window.removeEventListener("scroll", stickNavbar);
		};
	}, []);

	return stickyClass;
};
