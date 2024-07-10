import axios, { HttpStatusCode } from "axios";
import { getRequest } from "../api";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/public";

export async function getPublicHospitals() {
	try {
		const result = await getRequest(`${MODEL_NAME}/hospitals`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function getPublicServices(queryParams, extraHeaders) {
	try {
		const result = await getRequest(`${MODEL_NAME}/services`, queryParams, extraHeaders);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}
