import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { loginWithEmailAsync } from "./service";

export const logoutAction = createAsyncThunk(
  "auth/logout",
  () => {
    return true;
  }
);

export const loginUserByEmailAction = createAsyncThunk(
  "auth/loginByEmail",
  async (loginRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginWithEmailAsync(
        loginRequest
      );
      if (response?.data?.status === 200) {        
        return response?.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
