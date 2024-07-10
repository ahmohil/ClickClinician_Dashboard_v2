import { getRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/chat";

export async function CreateChat(serviceSlug, data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/${serviceSlug}`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
export async function CreateSupportChat(supportId) {
	try {
		const result = await postRequest(`${MODEL_NAME}/create/support-chat/${supportId}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllChat(query = {}) {
	try {
		const result = await getRequest(`${MODEL_NAME}`, query);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllSupportChat(query = {}) {
	try {
		const result = await getRequest(`${MODEL_NAME}/home-support`, query);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function AcceptFriendRequest(slug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/accept-friend-request/${slug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
