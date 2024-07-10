import { ErrorMessages } from "@constants";

export const throwServerError = (error) => {
	const serverError = error.response?.data;

	if (serverError) throw new Error(serverError.message ?? ErrorMessages.generalMessage);
	else throw new Error(error.message ?? ErrorMessages.generalMessage);
};

export * from "./Admin.Service";
export * from "./Auth.Service";
export * from "./User.Service";
