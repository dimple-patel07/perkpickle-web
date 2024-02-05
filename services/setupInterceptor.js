import { getCookie } from "cookies-next";
// NOT IN USED
const onRequest = (config) => {
	const token = getCookie("authorizationToken");
	if (config.headers && token) {
		config.headers.Authorization = token;
	}
	return config;
};

const onRequestError = (error) => Promise.reject(error);

const onResponse = (response) => response;

const onResponseError = async (error) => Promise.reject(error);

export const setupInterceptorsTo = (axiosObj) => {
	axiosObj?.interceptors?.request?.use(onRequest, onRequestError);
	axiosObj?.interceptors?.response?.use(onResponse, onResponseError);
	return axiosObj;
};
