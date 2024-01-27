import axiosInstance, { isAxiosError } from "../../services/api";
import { config } from "../../utils/config";

export const loginWithEmailAsync = async (loginRequest) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/getAllCards`,
      loginRequest
    );
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};
