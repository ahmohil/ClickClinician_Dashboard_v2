import { getRequest, postRequest, putRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/support";

export async function CreateSupport(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/create/${data.orderId}`, data);

		return result.contact;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllSupports() {
	try {
		const result = await getRequest(`${MODEL_NAME}/all`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllUserSupports() {
	try {
		const result = await getRequest(`${MODEL_NAME}/all/user-tickers`);
return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ChangeSupportStatus(status, id) {
	try {
		const result = await putRequest(`${MODEL_NAME}/status/${id}`, { status });
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

// export async function DeleteContactsByAdmin(id) {
// 	try {
// 		const result = await deleteRequest(`${MODEL_NAME}/delete/${id}`);

// 		if (result.status === HttpStatusCode.Ok) return result.data.data;
// 		else throw new Error(ErrorMessages.generalMessage);
// 	} catch (err) {
// 		return throwServerError(err);
// 	}
// }
