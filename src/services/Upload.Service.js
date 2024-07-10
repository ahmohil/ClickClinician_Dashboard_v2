import { HttpStatusCode } from "axios";
import { postFormDataRequest } from "../api";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/upload";

export async function uploadFileOnServer(file) {
	try {
		let formData = new FormData();
		formData.append("file", file);

		const result = await postFormDataRequest(`${MODEL_NAME}`, formData);

		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
