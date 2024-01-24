import { createSlice } from "@reduxjs/toolkit";
import {getAllCardAction} from "./middleware"
 
const INITIAL_STATE = {
  cards: "",
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCardAction.fulfilled, (state, { payload }) => ({
      ...state,
      cards: payload?.token,
    }));
  },
});

export const dropdownSelector = (state) => state?.Dropdown;

export default dropdownSlice.reducer;
