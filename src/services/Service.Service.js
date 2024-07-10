import { deleteRequest, getRequest, postRequest, putRequest } from "../api";
import axios, { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/service";

export async function CreateService(payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function UpdateService(slug, payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/${slug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetServiceReview(slug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/review/${slug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetDraftService(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/draft`, queryParams);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}

export async function ClearDraftServices() {
	try {
		const result = await putRequest(`${MODEL_NAME}/clear-draft`);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}

export async function CountViewOnList(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/view/count/${payload.serviceSlug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CheckDeletedSlot(id) {
	try {
		const result = await getRequest(`${MODEL_NAME}/check-slot/${id}`);

		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetServices(queryParams, extraHeaders) {
	try {
		const result = await getRequest(`${MODEL_NAME}`, queryParams, extraHeaders);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}

export async function GetUserServices(queryParams, extraHeaders) {
	try {
		const result = await getRequest(`${MODEL_NAME}`, queryParams, extraHeaders);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}

export async function GetServiceRating(serviceSlug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/rating/${serviceSlug}`);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}

export async function GetServiceDetails(serviceSlug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/details/${serviceSlug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetPublicServiceDetails(serviceSlug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/public/details/${serviceSlug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function DeleteService(serviceSlug) {
	try {
		const result = await deleteRequest(`${MODEL_NAME}/${serviceSlug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function LockedSlotStatus(serviceSlug, payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/locked/${serviceSlug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function UnLockSlotStaus(serviceSlug, payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/un-locked/${serviceSlug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
