import React from "react";
import LoginModal from "./LogIn/LogInModal";
import SignUpModal from "./SignUp/SignUpModal";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
import SignUpOtpModal from "./SignUp/SignUpOtpModal";
import SignUpFormModal from "./SignUp/SignUpFormModal";
import ForgotPasswordOtpModal from "./ForgotPassword/ForgotPasswordOtpModal";
import ResetPasswordOtpModal from "./ForgotPassword/ResetPasswordOtpModal";

const CommonDialog = () => {
  return (
    <>
      <LoginModal />
      
      <SignUpModal />
      <SignUpOtpModal />
      <SignUpFormModal />

      <ForgotPasswordModal />
      <ForgotPasswordOtpModal />
      <ResetPasswordOtpModal />
    </>
  );
};

export default CommonDialog;
