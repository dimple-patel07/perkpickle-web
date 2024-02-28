import { getCookie } from "cookies-next";
import { images } from "../component/Images";

export const config = {
	apiURL: process.env.REACT_APP_API_URL,
};

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
	return getCookie("loggedEmail");
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
