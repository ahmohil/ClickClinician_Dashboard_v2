import { deleteRequest, getRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/contact";

export async function CreateContact(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/create`, data);

		return result?.contact;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllContacts() {
	try {
		const result = await getRequest(`${MODEL_NAME}/all`);

		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function DeleteContactsByAdmin(id) {
	try {
		const result = await deleteRequest(`${MODEL_NAME}/delete/${id}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
