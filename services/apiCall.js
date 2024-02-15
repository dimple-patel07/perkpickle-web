import { config, defaultMessageObj } from "../utils/config";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { handleStopLoading, showMessage } from "../redux/loader/loaderSlice";
import { handleStoreToken } from "../redux/emailStore/emailStoreSlice";
import { tokenExpired } from "./token";

export const postCall = async (apiName, requestBody = {}, dispatch, router, isStopLoader = true) => {
	const IDLE_SESSION_TIME = 15; // MINUTES
	try {
		let headers = {};
		const excludeUrls = ["login", "forgotPassword", "resetPassword", "verifyUser", "resendOtp", "contactMail", "initialSetup", "newUserSignup", "completeUserSignup"]; // no need to check token for these urls
		let isNotRequiredAuth = false;
		let minutes = 0;
		if (excludeUrls.includes(apiName)) {
			isNotRequiredAuth = true;
		} else {
			// required auth headers
			headers = getHeaders();
			if (getCookie("loggedTime")) {
				const diff = Date.now() - getCookie("loggedTime");
				minutes = Math.floor(diff / 1000 / 60) % 60;
			}
		}

		if (isNotRequiredAuth || minutes <= IDLE_SESSION_TIME) {
			// is not required auth (or) max 15 minute idle session allow
			const response = await axios.post(`${config.apiURL}/${apiName}`, requestBody, { headers });
			setCookie("loggedTime", Date.now()); // set time to check idle time
			if (isStopLoader) {
				dispatch(handleStopLoading());
			}

			return response.data;
		} else {
			// idle time limit over
			tokenExpired(dispatch, router);
		}
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
				tokenExpired(dispatch, router);
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
