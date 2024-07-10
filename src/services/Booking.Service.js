import { getRequest, postRequest, putRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";

const MODEL_NAME = "/booking";

export async function GetBookings(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetOwnBookings(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/own`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CreateNewBooking(serviceSlug, payload) {
	try {
		const result = await postRequest(`${MODEL_NAME}/create/${serviceSlug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetBookingsOnSpecificSlot(payload) {
	try {
		const result = await getRequest(`${MODEL_NAME}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CancelBookingStatus(bookingSlug, status, payable) {
	try {
		const result = await putRequest(`${MODEL_NAME}/cancel/${bookingSlug}`, { status, payable });
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CompleteBookingStatus(bookingSlug, status) {
	try {
		const result = await putRequest(`${MODEL_NAME}/complete/${bookingSlug}`, {
			status,
		});
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function JustRescheduleBooking(bookingSlug, data) {
	try {
		const result = await putRequest(`${MODEL_NAME}/reschedule/${bookingSlug}`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function UpdateBookingLink(bookingSlug, data) {
	try {
		const result = await putRequest(`${MODEL_NAME}/add-link/${bookingSlug}`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetBookingDetails(slug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/details/${slug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function VerifyBookingCompletion(bookingSlug) {
	try {
		const result = await putRequest(`${MODEL_NAME}/verify-completion/${bookingSlug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
