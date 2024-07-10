import { getRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/message";

export async function SendMessage(payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function SendSellerMessage(payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}/send`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function SendSupportMessage(payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}/support-send`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllSupportMessage(chatId) {
	try {
		const result = await getRequest(`${MODEL_NAME}/get-all-support`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllMessage(chatId) {
	try {
		const result = await getRequest(`${MODEL_NAME}/get-all/${chatId}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function SendCancelMessage(payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}/notify-buyer`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
