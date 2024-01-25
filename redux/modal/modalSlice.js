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
      login: state,
    }),
    handleOpenSignUpModal: (state) => ({
      ...state,
      SignUp: state,
    }),
    handleOpenForgotPasswordModal: (state) => ({
      ...state,
      forgotPassword: state,
    }),
    handleOpenForgotPasswordOtpModal: (state) => ({
      ...state,
      forgotPasswordOtp: state,
    }),
    handleOpenSignUpOtpModal: (state) => ({
      ...state,
      signUpOtp: state,
    }),
    handleOpenSignUpFormModal: (state) => ({
      ...state,
      SignUpForm: state,
    }),
    handleOpenResetPasswordModal: (state) => ({
      ...state,
      resetPassword: state,
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
  handleCloseAllModal,
  handleOpenLoginModal,
  handleOpenSignUpModal,
  handleOpenSignUpOtpModal,
  handleOpenSignUpFormModal,
  handleOpenForgotPasswordModal,
  handleOpenForgotPasswordOtpModal,
  handleOpenResetPasswordModal,
} = modalSlice.actions;

export default modalSlice.reducer;
