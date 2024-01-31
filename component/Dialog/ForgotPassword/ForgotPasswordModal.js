"use client";
import React, { useEffect, useRef, useState } from "react";
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
import {
  handleStartLoading,
  handleStopLoading,
} from "../../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";

const ForgotPasswordModal = () => {
  const modalState = useSelector(modalSelector);
  const forgotPasswordModalShow = modalState?.forgotPassword;
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(handleCloseAllModal());
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (forgotPasswordModalShow) {
      setTimeout(() => {
        firstInputRef?.current?.focus();
      }, 500);
    }
  }, [forgotPasswordModalShow]);

  const initialFormData = {
    email: "",
  };

  const loginEmailValidation = () =>
    yup.object().shape({
      email: yup
        .string()
        .required("Please Enter Email")
        .email("Please Enter Valid Email"),
    });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialFormData,
    validationSchema: loginEmailValidation,
    onSubmit: async (val) => {
      const emailAddress = {
        email: val.email,
      };
      try {
        dispatch(handleStartLoading());
        const response = await axios.post(
          `${config.apiURL}/forgotPassword`,
          emailAddress
        );
        dispatch(handleStopLoading());
        if (response?.data?.email) {
          dispatch(handleStoreForgotPasswordEmail(response.data.email));
          closeModal();
          dispatch(handleOpenForgotPasswordOtpModal(true));
          // dispatch(
          //   handleShowWarnModal({
          //     isShow: true,
          //     modelType: "success",
          //     modelMessage: response.data.message,
          //   })
          // );
        }
      } catch (errorObj) {
        dispatch(handleStopLoading());
        // dispatch(
        //   handleShowWarnModal({
        //     isShow: true,
        //     modelType: "error",
        //     modelMessage: errorObj?.response?.data?.error,
        //   })
        // );
      }
    },
  });

  return (
    <>
      <Dialog
        open={forgotPasswordModalShow}
        onShow={() => resetForm()}
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
                <Image
                  src={images.ModalBannerImg}
                  className="img-fluid"
                  alt="banner-img"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 position-relative height">
              <div className="login-right">
                <Form className="row" noValidate onSubmit={handleSubmit}>
                  <div
                    className="back-arrow text-start"
                    onClick={() => {
                      closeModal();
                      dispatch(handleOpenLoginModal(true));
                    }}
                  >
                    <FaArrowLeft />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      controlId="forgot-email-Group"
                      inputRef={firstInputRef}
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched?.email}
                      errors={errors?.email}
                      formGroupClassName="mb-4"
                      placeholder={"Email Address*"}
                      type="text"
                      name="email"
                      restProps={{ "aria-describedby": "forgot-email-address" }}
                    />
                  </div>
                  <button type="submit" className="btn cls-btn">
                    Send OTP
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ForgotPasswordModal;
