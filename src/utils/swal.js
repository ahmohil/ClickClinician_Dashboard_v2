import Swal from "sweetalert2";

import { titleCase } from "@transformers";
import {
	BACKGROUND_COLOR,
	CANCEL_BUTTON_COLOR,
	CONFIRM_BUTTON_COLOR,
	CONFIRM_BUTTON_TEXT,
	MESSAGE_DISPLAY_TIME,
	TEXT_COLOR,
	ErrorMessages,
} from "@constants";

export const errorDisplay = (error = ErrorMessages.generalMessage) => {
	Swal.fire({
		background: BACKGROUND_COLOR,
		color: TEXT_COLOR,
		icon: "error",
		title: "Oops...",
		confirmButtonColor: BACKGROUND_COLOR,
		text: error,
	});
};

export const successDisplay = (msg = "Success!", position = null) => {
	let alertBody = {
		icon: "success",
		background: BACKGROUND_COLOR,
		color: TEXT_COLOR,
		title: "Success",
		text: msg,
		showConfirmButton: false,
		timer: MESSAGE_DISPLAY_TIME,
	};

	if (position) alertBody.position = position;

	Swal.fire(alertBody);
};

export const successToaster = (msg = "Success!") => {
	const Toast = Swal.mixin({
		toast: true,
		background: BACKGROUND_COLOR,
		color: TEXT_COLOR,
		position: "top-end",
		showConfirmButton: false,
		timer: MESSAGE_DISPLAY_TIME,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	Toast.fire({
		icon: "success",
		text: msg,
	});
};

export const failureToaster = (msg = ErrorMessages.generalMessage) => {
	const Toast = Swal.mixin({
		toast: true,
		background: BACKGROUND_COLOR,
		color: TEXT_COLOR,
		position: "top-end",
		showConfirmButton: false,
		timer: MESSAGE_DISPLAY_TIME,
		timerProgressBar: true,

		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	Toast.fire({
		icon: "error",
		text: msg,
	});
};

export const confirmationAlert = (onConfirmation, text) => {
	const alertConfig = {
		title: "Are you sure?",
		text: text,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: CONFIRM_BUTTON_COLOR,
		cancelButtonColor: CANCEL_BUTTON_COLOR,
		confirmButtonText: CONFIRM_BUTTON_TEXT,
	};

	return Swal.fire(alertConfig).then((result) => {
		if (result.isConfirmed) {
			return onConfirmation();
		} else {
			return Promise.reject("Confirmation rejected");
		}
	});
};

export const AuthAlert = async (onConfirmation, text) => {
	const alertConfig = {
		title: "You are not logged in",
		text: text,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: CONFIRM_BUTTON_COLOR,
		cancelButtonColor: CANCEL_BUTTON_COLOR,
		confirmButtonText: "Login",
	};

	return Swal.fire(alertConfig).then((result) => {
		if (result.isConfirmed) {
			return onConfirmation();
		} else {
			return Promise.reject("Confirmation rejected");
		}
	});
};
