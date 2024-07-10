import { deleteRequest, getRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "../constants/CustomMessages";
import { throwServerError } from ".";

const MODEL_NAME = "/notification";

export async function getNotifications() {
	try {
		const result = await getRequest(`${MODEL_NAME}/`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function readNotification(id) {
	try {
		const result = await getRequest(`${MODEL_NAME}/mark-as-read/${id}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function unreadNotification(id) {
	try {
		const result = await getRequest(`${MODEL_NAME}/mark-as-unread/${id}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function deleteNotification(id) {
	try {
		const result = await deleteRequest(`${MODEL_NAME}/delete/${id}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function markAllNotifications() {
	try {
		const result = await getRequest(`${MODEL_NAME}/mark-all`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
