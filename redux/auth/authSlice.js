import { createSlice } from "@reduxjs/toolkit";
import { logoutAction } from "./middleware";

const INITIAL_STATE = {
	token: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(logoutAction.fulfilled, (state) => ({
			...state,
			token: undefined,
		}));
	},
});

export const authSelector = (state) => state?.Auth;

export default authSlice.reducer;
