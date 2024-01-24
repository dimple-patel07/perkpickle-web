import { isAxiosError } from "./api";
import axiosInstance from "./api";

export const getData = async (url, headers, params) => {
  try {
    const response = await axiosInstance.get(url, { headers, params });
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postData = async (url, headers, params, requestBody) => {
  try {
    const response = await axiosInstance.post(url, requestBody, {
      headers,
      params,
    });
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};
