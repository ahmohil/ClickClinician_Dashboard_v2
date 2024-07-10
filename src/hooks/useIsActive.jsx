import { useLocation } from "react-router-dom";

export function useIsActive(targetPath) {
	const location = useLocation();
	return location.pathname === targetPath;
}
