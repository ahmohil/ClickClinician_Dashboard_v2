import { getRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "../constants/CustomMessages";
import { throwServerError } from ".";

const MODEL_NAME = "/wallet";

export async function ConnectWallet() {
	try {
		const result = await getRequest(`${MODEL_NAME}/stripe`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetWallet() {
	try {
		const result = await getRequest(`${MODEL_NAME}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CallBackStripe(data) {
	try {
		const result = await getRequest(`${MODEL_NAME}/stripe/callback`, { code: data });
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function WithDrawOneTransactionAmount(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/withdraw/one-transaction`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function WithDrawRefundAmount() {
	try {
		const result = await postRequest(`${MODEL_NAME}/withdraw/refund`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function DeductChargeAmount(body) {
	try {
		const result = await postRequest(`${MODEL_NAME}/deduct-charge`, body);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function WithDrawAllAmount(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/withdraw/all-amount`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
