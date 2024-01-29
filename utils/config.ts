import { getCookie } from "cookies-next";

export const config = {
    apiURL: process.env.REACT_APP_API_URL,
}

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const encryptStr = (str) => {
    return window.btoa(str);
}

export const decryptStr = (encryptedStr) => {
    return window.atob(encryptedStr);
}

export const getLoggedEmail = () => {
    const strData: any = decryptStr(getCookie("user"));
    const data = JSON.parse(strData);
    return data.email;
}
