import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	cards: "",
};

const dropdownSlice = createSlice({
	name: "dropdown",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {},
});

export const dropdownSelector = (state) => state?.Dropdown;

export default dropdownSlice.reducer;
