import React, { useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import SignUpOtpModal from "./SignUpOtpModal";
import { handleCloseAllModal, handleOpenLoginModal, handleOpenSignUpOtpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";

const SignUpModal = ({ isOpen, onClose }) => {
  const ModalState = useSelector(modalSelector)
  const signUpOtpModalShow = ModalState?.signUpOtp
  const dispatch = useAppDispatch()
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-5 height">
              <div className="login-left">
                <h2>Sign Up</h2>
                <p>
                  JOIN WITH US TO UNLOCK <br /> MORE OFFERS
                </p>
                <Image src={images.LoginImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 position-relative height">
              <div className="login-right">
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="signupInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      autoComplete="off"
                    />
                  </div>
                  <button type="button" onClick={() => { onClose(); dispatch(handleOpenSignUpOtpModal())}} className="btn cls-btn" >Send OTP</button>
                  <div className="account">
                    <p>
                      Already have an account?<button type="button" className="btn signup" onClick={() => {onClose();  dispatch(handleOpenLoginModal()) } }>Signin</button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <SignUpOtpModal
        isOpen={signUpOtpModalShow}
        onClose={() => dispatch(handleCloseAllModal())}
      />
    </>
  );
};

export default SignUpModal;
