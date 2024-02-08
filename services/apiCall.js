import { config, defaultMessageObj } from "../utils/config";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { handleStopLoading, showMessage } from "../redux/loader/loaderSlice";

export const postCall = async (apiName, requestBody = {}, dispatch, router, isStopLoader = true) => {
	try {
		let headers = {};
		const excludeUrls = ["login", "forgotPassword", "resetPassword", "verifyUser", "resendOtp", "contactMail", "initialSetup", "newUserSignup", "completeUserSignup"]; // no need to check token for these urls
		if (!excludeUrls.includes(apiName)) {
			// required auth headers
			headers = getHeaders();
		}
		const response = await axios.post(`${config.apiURL}/${apiName}`, requestBody, { headers });
		if (isStopLoader) {
			dispatch(handleStopLoading());
		}
		return response.data;
	} catch (errorResponse) {
		return handleAxiosError(errorResponse, dispatch, router);
	}
};

// handle axios error
const handleAxiosError = (err, dispatch, router) => {
	let errorMessage = "something went wrong";
	if (axios.isAxiosError(err)) {
		if (err?.response && err?.response?.data && err?.response?.data?.error) {
			if (err.response.status === 401) {
				deleteCookie("authorizationToken");
				deleteCookie("userName");
				deleteCookie("loggedEmail");
				router.replace("/");
			}
			errorMessage = err.response.data.error;
		}
	}
	dispatch(handleStopLoading());
	dispatch(
		showMessage({
			...defaultMessageObj,
			type: "error",
			messageText: errorMessage,
		})
	);
};

const getHeaders = () => {
	const headers = {
		Authorization: getCookie("authorizationToken"),
	};
	return headers;
};
