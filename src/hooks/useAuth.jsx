import { userStore } from "@store";
import { useState } from "react";

export const useAuth = () => {
	const UserStore = userStore((state) => state);

	const [isPageLoading, setIsPageLoading] = useState(false);

	const loggedInUser = UserStore.loggedInUser;

	return {
		isPageLoading,
		setIsPageLoading,
		loggedInUser,
	};
};
