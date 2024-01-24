import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

const INITIAL_STATE = {
  login: false,
  SignUp: false,
  forgotPassword: false,
  signUpOtp: false,
  SignUpForm: false,
  forgotPasswordOtp: false,
  resetPassword: false,
};

// const closeModal ={
//   login: false,
//   SignUp: false,
//   forgotPassword: false,
//   signUpOtp: false,
//   SignUpForm: false
// }

const modalSlice = createSlice({
  name: "modal",
  initialState: INITIAL_STATE,
  reducers: {
    handleOpenLoginModal: (state) => ({
      ...state,
      login: true,
    }),
    handleOpenSignUpModal: (state) => ({
      ...state,
      SignUp: true,
    }),
    handleOpenForgotPasswordModal: (state) => ({
      ...state,
      forgotPassword: true,
    }),
    handleOpenForgotPasswordOtpModal: (state) => ({
      ...state,
      forgotPasswordOtp: true,
    }),
    handleOpenSignUpOtpModal: (state) => ({
      ...state,
      signUpOtp: true,
    }),
    handleOpenSignUpFormModal: (state) => ({
      ...state,
      signUpOtp: true,
    }),
    handleOpenResetPasswordModal: (state) => ({
      ...state,
      resetPassword: true,
    }),
    handleCloseAllModal: (state) => ({
      ...state,
      login: false,
  SignUp: false,
  forgotPassword: false,
  signUpOtp: false,
  SignUpForm: false,
  forgotPasswordOtp: false,
  resetPassword: false,
    }),
  },
});

export const modalSelector = (state) => state?.Modal;

export const {
  handleOpenLoginModal,
  handleCloseAllModal,
  handleOpenSignUpModal,
  handleOpenForgotPasswordModal,
  handleOpenSignUpOtpModal,
  handleOpenForgotPasswordOtpModal,
  handleOpenResetPasswordModal
} = modalSlice.actions;

export default modalSlice.reducer;
