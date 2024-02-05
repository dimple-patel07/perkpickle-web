import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutAction = createAsyncThunk("auth/logout", () => {
	return true;
});
