import { postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/review";

export async function CreateReview(serviceId, payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}/${serviceId}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
