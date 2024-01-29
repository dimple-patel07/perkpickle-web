import React, { useEffect } from "react";
import LoginModal from "./LogIn/LogInModal";
import SignUpModal from "./SignUp/SignUpModal";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
import SignUpOtpModal from "./SignUp/SignUpOtpModal";
import SignUpFormModal from "./SignUp/SignUpFormModal";
import ForgotPasswordOtpModal from "./ForgotPassword/ForgotPasswordOtpModal";
import ResetPasswordOtpModal from "./ForgotPassword/ResetPasswordOtpModal";
import { useAppDispatch } from "../../redux/store";
import { handleCloseAllModal } from "../../redux/modal/modalSlice";

const CommonDialog = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleCloseAllModal());
  }, []);
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
