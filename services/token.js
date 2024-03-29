import { handleStoreToken } from "../redux/emailStore/emailStoreSlice";
import { handleStopLoading, showMessage } from "../redux/loader/loaderSlice";
import { handleCloseAllModal } from "../redux/modal/modalSlice";
import { clearLocalStorage, defaultMessageObj } from "../utils/config";

export const getLocalRefreshToken = () => {
	const userData = localStorage.getItem("user");
	if (userData === undefined) return null;
	const user = userData;
	return user;
};

export const getLocalAccessToken = () => {
	const userData = localStorage.getItem("user");
	if (userData === undefined) return null;
	const user = userData;
	return user;
};

export const updateLocalAccessToken = (accessToken, refreshToken) => {
	const userData = localStorage.getItem("user");
	if (userData !== undefined) {
		const user = userData;
		localStorage.setItem("user", JSON.stringify(user));
	}
	return null;
};

export const getUser = () => {
	const userData = localStorage.getItem("user");
	if (userData === undefined) return null;
	const user = userData;
	return user;
};

export const setUser = (user) => {
	localStorage.setItem("user", user);
};

export const removeUser = () => {
	localStorage.removeItem("user");
};

export const tokenExpired = (dispatch, router) => {
	clearLocalStorage();
	dispatch(handleCloseAllModal());
	dispatch(handleStopLoading());
	dispatch(
		showMessage({
			...defaultMessageObj,
			type: "error",
			messageText: "session expired",
		})
	);
	dispatch(handleStoreToken(""));
	router.replace("/");
};
