import { images } from "../component/Images";

export const config = {
	apiURL: process.env.REACT_APP_API_URL,
};

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
export const PASSWORD_ERROR_MSG = "Password must be between 8 to 16 characters with 1 upper case letter and 1 special character";

export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const NAME_REGEX = /^[A-Za-z ]*$/;

export const DIGIT_REGEX = /^[0-9]+$/;

export const MAX_LENGTH_VALUE = 250;

export const defaultMessageObj = {
	type: "info",
	messageText: "",
	duration: 3000,
	position: "top-right",
	theme: "colored",
};

export const encryptStr = (str) => {
	if (str) {
		return window.btoa(str);
	}
};

export const decryptStr = (encryptedStr) => {
	if (encryptedStr) {
		return window.atob(encryptedStr);
	}
};

export const getLoggedEmail = () => {
	return getSessionStorage("loggedEmail");
};

export const getLoggedUserName = () => {
	return getSessionStorage("userName");
};

export const getCardImage = (card) => {
	return card && card.card_image_url && card.card_image_url !== "undefined" && card.card_image_url !== "null" ? card.card_image_url : images.NoImageAvailable;
};

export const formatCardCurrency = (amount, currency) => {
	let result = "-";
	if (amount && currency) {
		currency = currency.toLowerCase();
		if (currency === "miles" || currency === "points") {
			result = `X ${amount} ${currency}`;
		} else if (currency === "cashback" || currency === "cash") {
			result = `${amount} %`;
		} else {
			result = `${amount} ${currency}`;
		}
	}
	return result;
};
// set key-value in local storage
export const setSessionStorage = (key, val, isStr = true) => {
	sessionStorage.setItem(key, val);
};
// get key from the local storage
export const getSessionStorage = (key, isStr = true) => {
	return sessionStorage.getItem(key);
};
// remove key from the local storage
export const removeSessionStorage = (key) => {
	return sessionStorage.removeItem(key);
};
// clear local storage
export const clearSessionStorage = () => {
	return sessionStorage.clear();
};
