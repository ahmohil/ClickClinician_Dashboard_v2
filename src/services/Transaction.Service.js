import { getRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "../constants/CustomMessages";
import { throwServerError } from ".";

const MODEL_NAME = "/transaction";

export async function RetrievePayments(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/find-transactions`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function RetrieveTransactionFromPaymentIntent(id) {
	try {
		const result = await getRequest(`${MODEL_NAME}/find/${id}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
