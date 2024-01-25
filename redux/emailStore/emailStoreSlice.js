import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

const INITIAL_STATE = {
  forgotPasswordEmail: "",
  signUpEmail: "",
};

const emailStoreSlice = createSlice({
  name: "emailstore",
  initialState: INITIAL_STATE,
  reducers: {
    handleStoreForgotPasswordEmail: (state, { payload }) => ({
      ...state,
      forgotPasswordEmail: payload,
    }),
    handleStoreSignUpEmail: (state, { payload }) => ({
      ...state,
      signUpEmail: payload,
    }),
  },
});

export const emailStoreSelectore = (state) => state?.EmailStore;

export const { handleStoreForgotPasswordEmail, handleStoreSignUpEmail } =
  emailStoreSlice.actions;

export default emailStoreSlice.reducer;
