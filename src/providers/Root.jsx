import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { convertQueryParamsStringToQueryParamsObject } from "../utils/queryParStringToQueryParObj";
import { errorDisplay } from "@utils";
import { useAuth } from "../hooks/useAuth";
import { userStore } from "@store";
import { getCurrentUser } from "../services/User.Service";
import { SocketContext } from "../socket";
import { Loader } from "../components";
const Root = () => {
	const socket = useContext(SocketContext);

	const navigate = useNavigate();
	const location = useLocation();
	const { search } = useLocation();
	const [isContextLoaded, setIsContextLoaded] = useState(false);
	const [componentToRender, setComponentToRender] = useState(<Loader />);

	const UserStore = userStore((state) => state);
	const { setIsPageLoading } = useAuth();

	const getContext = async () => {
		try {
			const result = await getCurrentUser();
			UserStore.setAuth(result);
			if (result?.role === "admin" && !location.pathname.includes("/admin")) {
				navigate("/admin");
			}
			if (location.pathname.includes("/auth")) {
				if (result?.role === "admin") {
					navigate("/admin");
				} else if (result?.role === "user") {
					navigate("/dashboard");
				}
			}
			setIsContextLoaded(true);
		} catch (error) {
			UserStore.purgeAuth();
			setIsContextLoaded(true);
		}
	};

	const onLogout = () => {
		UserStore.purgeAuth();
		navigate("/");
	};

	useEffect(() => {
		window.scrollTo(0, 0);

		if (!location.pathname.includes("waitList")) {
			localStorage.removeItem("waitList");
			localStorage.removeItem("stepper");
		}
	}, [location.pathname]);

	useEffect(() => {
		if (!!UserStore.loggedInUser) {
			socket.on(`${UserStore.loggedInUser?.email.toString()}-blocked`, () => onLogout());
		}

		return () => {
			socket.off(`${UserStore.loggedInUser?.email.toString()}-blocked`);
		};
	}, [UserStore.loggedInUser]);

	useEffect(() => {
		if (search) {
			const queryParams = convertQueryParamsStringToQueryParamsObject(search);
			if (queryParams.err) {
				errorDisplay("Your verification link has expired. Please resend verification email to get a new link.");
				navigate("/");
			}
		}

		if (localStorage.getItem("token")) getContext();
		else {
			setIsPageLoading(false);
			setIsContextLoaded(true);
		}
	}, []);

	useEffect(() => {
		setComponentToRender(isContextLoaded ? <Outlet /> : <Loader />);
	}, [isContextLoaded]);

	return componentToRender;
};

export default Root;
