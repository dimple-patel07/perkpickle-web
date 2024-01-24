import axiosInstance, { isAxiosError } from "../../services/api";
import { config } from "../../utils/config";

// export const getAllCardService = async (loginRequest) => {
export const getAllCardService = async () => {
  try {
    const response = await axiosInstance.get(
      `${config.apiURL}/getAllCards`
    );
    console.log(response)
    // const response = await axiosInstance.get(
    //   `${config.apiURL}/getAllCards`,
    //   loginRequest
    // );
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};
