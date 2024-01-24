import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCardService } from "./service";

export const getAllCardAction = createAsyncThunk(
  "dropdown/getAllCardAction",
  async ({ rejectWithValue, dispatch }) => {
    console.log("FDhfgh")
    try {
      // const response = await getAllCardService(
      //   loginRequest
      // );
      const response = await getAllCardService();
      console.log(response,"response++")
      // if (response?.data?.status === 200) {        
      //   return response?.data;
      // }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
