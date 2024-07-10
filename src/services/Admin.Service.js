import { deleteRequest, getRequest, putRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";


export async function getAllAgencies(queryParams) {
	try {
		const result = await getRequest(`api/Agency/GetAll`, queryParams);

		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function getAllClinicians(queryParams) {
	try {
		const result = await getRequest(`api/Users/GetClinicians`, queryParams);

		return result;
	} catch (err) {
		return throwServerError(err);
	}
}


export async function getServiceRequests(queryParams){
	try{
		const result = await getRequest(`api/ServiceRequests/GetAll`, queryParams)
		return result;
	}catch(err){
		return throwServerError(err);
	}
}

export async function deleteUserByAdmin(phone) {
	try {
		const result = await deleteRequest(`${MODEL_NAME}/user/${phone}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAdminDraftService(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/draft-services`, queryParams);
		return result;
	} catch (err) {
		if (axios.isCancel(err)) return;
		else return throwServerError(err);
	}
}

export async function GetAllBookings(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/all-bookings`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAllTransactions(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/transactions`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function changeUserStatusByAdmin(status, phone) {
	try {
		const result = await putRequest(`${MODEL_NAME}/user/status/${phone}`, { status });
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function HoldPayment(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/booking/hold-payment/${payload.booking?.slug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ReleasePayment(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/booking/release-payment/${payload.booking?.slug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function BookingRefund(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/booking/refund/${payload.booking?.slug}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetAdminBookingDetails(bookingSlug) {
	try {
		const result = await getRequest(`${MODEL_NAME}/booking/${bookingSlug}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
