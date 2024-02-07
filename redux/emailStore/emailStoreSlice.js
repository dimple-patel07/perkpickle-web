import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

const INITIAL_STATE = {
  forgotPasswordEmail: "",
  signUpEmail: "",
  userName: "",
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
    handleStoreUserName: (state, { payload }) => ({
      ...state,
      userName: payload,
    }),
  },
});

export const emailStoreSelectore = (state) => state?.EmailStore;

export const { handleStoreForgotPasswordEmail, handleStoreSignUpEmail, handleStoreUserName } =
  emailStoreSlice.actions;

export default emailStoreSlice.reducer;
