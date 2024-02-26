import { config, defaultMessageObj } from "../utils/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import { handleStopLoading, showMessage } from "../redux/loader/loaderSlice";
import { tokenExpired } from "./token";

export const postCall = async (apiName, requestBody = {}, dispatch, router, isStopLoader = true) => {
	try {
		let headers = {};
		const excludeUrls = ["login", "forgotPassword", "resetPassword", "verifyUser", "resendOtp", "contactMail", "initialSetup", "newUserSignup", "completeUserSignup"]; // no need to check token for these urls
		let isNotRequiredAuth = false;
		if (excludeUrls.includes(apiName)) {
			isNotRequiredAuth = true;
		} else {
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
	let isClientError = true;
	let errorMessage = "something went wrong";
	if (axios.isAxiosError(err)) {
		if (err?.response && err?.response?.data && err?.response?.data?.error) {
			if (err.response.status === 401) {
				isClientError = false;
				tokenExpired(dispatch, router);
			}
			errorMessage = err.response.data.error;
		}
	}

	if (isClientError) {
		dispatch(handleStopLoading());
		dispatch(
			showMessage({
				...defaultMessageObj,
				type: "error",
				messageText: errorMessage,
			})
		);
	}
};

const getHeaders = () => {
	const headers = {
		Authorization: getCookie("authorizationToken"),
	};
	return headers;
};
