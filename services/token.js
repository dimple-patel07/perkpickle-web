import { handleStoreToken } from "../redux/emailStore/emailStoreSlice";
import { handleStopLoading, showMessage } from "../redux/loader/loaderSlice";
import { handleCloseAllModal } from "../redux/modal/modalSlice";
import { clearSessionStorage, defaultMessageObj } from "../utils/config";

export const getLocalRefreshToken = () => {
	const userData = sessionStorage.getItem("user");
	if (userData === undefined) return null;
	const user = userData;
	return user;
};

export const getLocalAccessToken = () => {
	const userData = sessionStorage.getItem("user");
	if (userData === undefined) return null;
	const user = userData;
	return user;
};

export const updateLocalAccessToken = (accessToken, refreshToken) => {
	const userData = sessionStorage.getItem("user");
	if (userData !== undefined) {
		const user = userData;
		sessionStorage.setItem("user", JSON.stringify(user));
	}
	return null;
};

export const getUser = () => {
	const userData = sessionStorage.getItem("user");
	if (userData === undefined) return null;
	const user = userData;
	return user;
};

export const setUser = (user) => {
	sessionStorage.setItem("user", user);
};

export const removeUser = () => {
	sessionStorage.removeItem("user");
};

export const tokenExpired = (dispatch, router) => {
	clearSessionStorage();
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
