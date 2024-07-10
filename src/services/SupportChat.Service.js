import { getRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/support-chat";

export async function SendSupportChatMessage(payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}/send`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
