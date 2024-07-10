import { getRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "../constants/CustomMessages";
import { throwServerError } from ".";

const MODEL_NAME = "/stripe";

export async function CreatePayment(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/create-payment`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CreatePaymentIntent(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/create-payment-intent`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CreateReschedulePaymentIntent(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/reschedule/create-payment-intent`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function PaymentSuccess(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/success`, data);

		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function RetrievePaymentIntent(data, queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/v1/payment_intents/${data}`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function RetrieveReschedulePaymentIntent(data, queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/reschedule/v1/payment_intents/${data}`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
