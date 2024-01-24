import React, { useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import ResetPasswordOtpModal from "./ResetPasswordOtpModal";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenResetPasswordModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";

const ForgotPasswordOtpModal = () => {
  const modalState = useSelector(modalSelector)
  const forgotPasswordOtpModalShow = modalState?.forgotPasswordOtp
  const dispatch = useAppDispatch()
  const closeModal = () => dispatch(handleCloseAllModal())
  return (
    <>
      <Dialog open={forgotPasswordOtpModalShow} onClose={closeModal}>
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5">
              <div className="login-left">
                <h2>FORGOT PASSWORD</h2>
                <p>
                  Enter otp to Verify your <br /> email address
                </p>
                <Image src={images.LoginImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7">
              <div className="login-right">
                <div className="back-arrow text-start">
                  <FaArrowLeft />
                </div>
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="FpoInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      autoComplete="off"
                    />
                  </div>
                  <div class="otp-field">
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input class="space" type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                  </div>
                  <div id="emailHelp" class="resend">
                    Resend OTP
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                     closeModal()
                      dispatch(handleOpenResetPasswordModal());
                    }}
                    className="btn"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <ResetPasswordOtpModal/>
    </>
  );
};

export default ForgotPasswordOtpModal;
