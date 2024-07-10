import { deleteRequest, getRequest, putRequest, postRequest } from "../api";
import { HttpStatusCode } from "axios";
import { ErrorMessages } from "@constants";
import { throwServerError } from ".";


export async function getAllUserTypes() {
    try {
        const result = await getRequest(`api/UserType/GetAll`);
        return result;
    } catch (err) {
        return throwServerError(err);
    }
}

export async function getUserDevices(userId) {
    try {
        const result = await getRequest(`api/Device/GetForUser`, { userId });
        return result;
    } catch (err) {
        return throwServerError(err);
    }
}



export async function getCurrentUser() {
	try {
		const result = await getRequest(`${MODEL_NAME}/context`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function setPassword(userId, password) {
	try {
	  let url = `/api/User/SetPassword`;
	  
	  // Build query parameters
	  const params = new URLSearchParams();
	  if (userId !== undefined && userId !== null) {
		params.append("userId", userId);
	  }
	  if (password !== undefined && password !== null) {
		params.append("password", password);
	  }
  
	  // Append query string to URL if there are parameters
	  if (params.toString()) {
		url += `?${params.toString()}`;
	  }
  
	  const result = await postRequest(url);
	  console.log("Result of setPassword is ", result)
	  return result;
	} catch (err) {
	  return throwServerError(err);
	}
  }


  export async function updateClinician(clinicianId, body) {
	try {
	  let url = `/api/User/UpdateClinician`;
	  
	  // Add clinicianId as a query parameter if it's provided
	  if (clinicianId !== undefined && clinicianId !== null) {
		url += `?clinicianId=${encodeURIComponent(clinicianId)}`;
	  }
  
	  const result = await putRequest(url, body, {
		headers: {
		  "Content-Type": "application/json",
		  "Accept": "application/json"
		}
	  });
  
	  return result;
	} catch (err) {
	  return throwServerError(err);
	}
  }
  
  export async function deleteClinician(clinicianId) {
	try {
	  let url = `/api/User/Delete`;
	  
	  // Add clinicianId as a query parameter if it's provided
	  if (clinicianId !== undefined && clinicianId !== null) {
		url += `?userId=${encodeURIComponent(clinicianId)}`;
	  }
  
	  const result = await postRequest(url, {
		headers: {
		  "Content-Type": "application/json",
		  "Accept": "application/json"
		}
	  });
  
	  return result;
	} catch (err) {
	  return throwServerError(err);
	}
  }
  


export async function UpdateProfile(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/profile`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function ToggleFavService(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/service/fav-toggle`, payload);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetFavServices() {
	try {
		const result = await getRequest(`${MODEL_NAME}/fav/services`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function GetUserData(queryParams) {
	try {
		const result = await getRequest(`${MODEL_NAME}/profile-data`, queryParams);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function DeleteAccount() {
	try {
		const result = await deleteRequest(`${MODEL_NAME}/delete`);
		return result;
	} catch (err) {
		return throwServerError(err);
	}
}

export async function updateServicesStatus(payload) {
	try {
		const result = await putRequest(`${MODEL_NAME}/profile-ghost`, payload);
		return result;
	} catch (error) {
		throwServerError(error);
	}
}
