"use client";
import React, { useEffect, useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  handleCloseAllModal,
  handleOpenForgotPasswordOtpModal,
  handleOpenLoginModal,
  modalSelector,
} from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";

import axios from "axios";
import { config } from "../../../utils/config";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { handleStoreForgotPasswordEmail } from "../../../redux/emailStore/emailStoreSlice";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import { handleStartLoading, handleStopLoading } from "../../../redux/loader/loaderSlice";

const ForgotPasswordModal = () => {
  const modalState = useSelector(modalSelector);
  const forgotPasswordModalShow = modalState?.forgotPassword;
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(handleCloseAllModal());

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
	trigger
  } = useForm();

  useEffect(() => {
    reset();
  }, []);

  const handleBlur = async (fieldName) => await trigger(fieldName);
  const handleOnChange = async (fieldName) => await trigger(fieldName);

  const handleFormSubmit = async (data) => {
    const emailAddress = {
      email: data.emailAddress,
    };
    try {
      dispatch(handleStartLoading());
      const response = await axios.post(
        `${config.apiURL}/forgotPassword`,
        emailAddress
      );
      if (response?.data?.email) {
        dispatch(handleStopLoading());
        dispatch(handleStoreForgotPasswordEmail(response.data.email));
        closeModal();
        dispatch(handleOpenForgotPasswordOtpModal(true));
        dispatch(
          handleShowWarnModal({
            isShow: true,
            modelType: "success",
            modelMessage: "otp sent on the email",
          })
        );
      }
    } catch (errorObj) {
      dispatch(handleStopLoading());
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
        open={forgotPasswordModalShow}
        onShow={() => reset()}
        onClose={() => dispatch(handleCloseAllModal())}
      >
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 height">
              <div className="login-left">
                <h2>Forgot Password</h2>
                <p>
                  Enter your registered email <br /> to get OTP
                </p>
                <Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img"/>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 position-relative height">
              <div className="login-right">
                <div
                  className="back-arrow text-start"
                  onClick={() => {
                    closeModal();
                    dispatch(handleOpenLoginModal(true));
                  }}
                >
                  <FaArrowLeft />
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.emailAddress
                         ? "error-input"
                         : ""
                     }`}
                      autoComplete="off"
                      placeholder="Email Address*"
                      {...register("emailAddress", {
                        required: "Please Enter Email Address",
                        onChange: () => handleOnChange("emailAddress"),
                        pattern: {
                          value: EMAIL_REGEX,
                          message: "Invalid Email Address",
                        },
                      })}
                      onBlur={() => handleBlur("emailAddress")}
                      maxLength={250}
                    />
                    <ErrorMessage
                      className="error"
                      errors={errors}
                      name="emailAddress"
                      as="p"
                    />
                  </div>
                  <button type="submit" className="btn cls-btn">
                    Send OTP
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

export default ForgotPasswordModal;
