import { getCookie } from "cookies-next";

export const config = {
	apiURL: process.env.NEXT_PUBLIC_API_URL,
};

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const PHONE_NUMBER_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
	const strData = decryptStr(getCookie("user"));
	if (strData) {
		const data = JSON.parse(strData);
		return data.email;
	}
	return null;
};
