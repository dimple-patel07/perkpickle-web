import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

const INITIAL_STATE = {
  forgotPasswordEmail: "",
  signUpEmail: "",
  userName: "",
  token: "",
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
    handleStoreToken: (state, { payload }) => ({
      ...state,
      token: payload,
    }),
  },
});

export const emailStoreSelectore = (state) => state?.EmailStore;

export const {
  handleStoreForgotPasswordEmail,
  handleStoreSignUpEmail,
  handleStoreUserName,
  handleStoreToken,
} = emailStoreSlice.actions;

export default emailStoreSlice.reducer;
