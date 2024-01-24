import React, { useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import ForgotPasswordOtpModal from "./ForgotPasswordOtpModal";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenForgotPasswordOtpModal, modalSelector } from "../../../redux/modal/modalSlice";
import {useAppDispatch} from "../../../redux/store"

const ForgotPasswordModal = () => {
  const modalState = useSelector(modalSelector)
  const forgotPasswordModalShow = modalState?.forgotPassword
  const dispatch = useAppDispatch()
  
  const closeModal = () => dispatch(handleCloseAllModal())
  return (
    <>
      <Dialog isOpen={forgotPasswordModalShow} onClose={closeModal}>
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 height">
              <div className="login-left">
                <h2>Forgot Password</h2>
                <p>
                  Enter your registered email <br /> to get OTP
                </p>
                <Image src={images.LoginImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 position-relative height">
              <div className="login-right">
                <div className="back-arrow text-start">
                  <FaArrowLeft />
                </div>
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="FpInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeModal()
                     dispatch(handleOpenForgotPasswordOtpModal());
                    }}
                    className="btn"
                  >
                    Send OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <ForgotPasswordOtpModal/>
    </>
  );
};

export default ForgotPasswordModal;
