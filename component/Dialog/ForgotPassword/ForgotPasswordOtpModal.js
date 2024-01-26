import React, { useEffect, useRef, useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import ResetPasswordOtpModal from "./ResetPasswordOtpModal";
import { useSelector } from "react-redux";
import {
  handleCloseAllModal,
  handleOpenForgotPasswordModal,
  handleOpenResetPasswordModal,
  modalSelector,
} from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";

import axios from "axios";
import { config } from "../../../utils/config";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";

const ForgotPasswordOtpModal = () => {
  const modalState = useSelector(modalSelector);
  const emailStore = useSelector(emailStoreSelectore);
  const forgotPasswordOtpModalShow = modalState?.forgotPasswordOtp;
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(handleCloseAllModal());

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  useEffect(() => {
    setOtp(["", "", "", "", "", ""]);
  }, []);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const [userData, setUserData] = useState({
    email: "",
    otp: "",
  });

  // check otp / verify user

  const otpNumber = parseInt(otp.join(""), 10);
  const numberString = Math.abs(otpNumber).toString().length;

  const verifyUser = async () => {
    try {
      const response = await axios.post(`${config.apiURL}/verifyUser`, {
        email: emailStore?.forgotPasswordEmail,
        otp: otpNumber,
      });
      if (response?.data?.email) {
        closeModal();
        dispatch(handleOpenResetPasswordModal(true));
      }
    } catch (errorObj) {
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: errorObj?.response?.data?.error,
        })
      );
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(`${config.apiURL}/resendOtp`, {
        email: emailStore?.forgotPasswordEmail,
      });
      if (response?.data?.otp) {
        console.log("otp sent successfully", response?.data?.otp);
      }
    } catch (errorObj) {
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: errorObj?.response?.data?.error,
        })
      );
    }
  };

  return (
    <>
      <Dialog
        open={forgotPasswordOtpModalShow}
        onClose={() => dispatch(handleCloseAllModal())}
      >
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5">
              <div className="login-left">
                <h2>FORGOT PASSWORD</h2>
                <p>
                  Enter otp to Verify your <br /> email address
                </p>
                <Image src={images.ModalBannerImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7">
              <div className="login-right">
                <div
                  className="back-arrow text-start"
                  onClick={() => {
                    closeModal();
                    dispatch(handleOpenForgotPasswordModal(true));
                  }}
                >
                  <FaArrowLeft />
                </div>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email Address"
                      disabled
                      value={emailStore?.forgotPasswordEmail}
                      maxLength={250}
                    />
                  </div>
                  <div className="otp-field">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        maxLength="1"
                        onChange={(event) => handleInputChange(index, event)}
                        ref={inputRefs[index]}
                      />
                    ))}
                  </div>
                  <div className="text-end" onClick={resendOtp}>
                    <button type="button" className="resend">
                      Resend OTP
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={numberString > 6}
                    onClick={verifyUser}
                    className="btn cls-btn"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ForgotPasswordOtpModal;
