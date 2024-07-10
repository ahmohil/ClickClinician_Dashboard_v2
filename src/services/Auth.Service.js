import { HttpStatusCode } from "axios";
import { postRequest, putRequest } from "../api";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";
import qs from 'qs';  

const MODEL_NAME = "/api";

// export async function SignIn(username, password) {
// 	try {
// 		let payload = { username, password};

// 		const result = await postRequest(`connect/token`, payload);
// 		return result?.user || result;
// 	} catch (err) {
// 		return throwServerError(err);
// 	}
// }



export async function SignIn(username, password) {
	try {
	  const payload = {
		username: username,
		password: password,
		grant_type: 'password',
		client_id: 'owner',
		scope: 'api openid profile email roles offline_access extended_profile'
	  };
  
	  const encodedPayload = qs.stringify(payload);
  
	  const result = await postRequest('connect/token', encodedPayload, {
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded'
		}
	  });
  
	  console.log(result)
	  return result;

	} catch (err) {
	  return throwServerError(err);
	}
  }

export async function SignUp(data) {
	try {
		const result = await postRequest(`${MODEL_NAME}/signup`, data);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function CompleteProfile(body, user) {
	let payload = { body, user };

	try {
		const result = await putRequest(`${MODEL_NAME}/complete-profile`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ForgotPassword(phone) {
	let payload = { phone };

	try {
		const result = await postRequest(`${MODEL_NAME}/forgot`, payload);
	} catch (err) {
		return throwServerError(err);
	}
}

export async function VerifyOtp(otp, phone, type) {
	let payload = { otp, type };

	try {
		const result = await postRequest(`${MODEL_NAME}/verify-otp/${phone}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ResendOtp(phone) {
	try {
		const result = await postRequest(`${MODEL_NAME}/otp/resend/${phone}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ResetPassword(password, resetPasswordToken, phone) {
	let payload = { password, resetPasswordToken };

	try {
		const result = await postRequest(`${MODEL_NAME}/set-new-password/${phone}`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ResendVerificationEmail(phone) {
	try {
		const result = await postRequest(`${MODEL_NAME}/resend/email/${phone}`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}
