import React, { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import SignUpOtpModal from "./SignUpOtpModal";
import {
  handleCloseAllModal,
  handleOpenLoginModal,
  handleOpenSignUpFormModal,
  handleOpenSignUpModal,
  handleOpenSignUpOtpModal,
  modalSelector,
} from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import * as yup from "yup";
import axios from "axios";
import { config } from "../../../utils/config";

import { handleStoreSignUpEmail } from "../../../redux/emailStore/emailStoreSlice";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import {
  handleStartLoading,
  handleStopLoading,
} from "../../../redux/loader/loaderSlice";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";
import { useFormik } from "formik";

const SignUpModal = () => {
  const ModalState = useSelector(modalSelector);
  const signUpModalShow = ModalState?.SignUp;
  const dispatch = useAppDispatch();
  const closeModel = () => dispatch(handleCloseAllModal());

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (signUpModalShow) {
      firstInputRef?.current?.focus();
    }
  }, [signUpModalShow]);

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
      const signUpEmail = {
        email: val.email,
      };
      try {
        dispatch(handleStartLoading());
        const response = await axios.post(
          `${config.apiURL}/createUser`,
          signUpEmail
        );
        dispatch(handleStopLoading());
        if (response && response?.data) {
          if (response?.data?.email) {
            dispatch(handleStoreSignUpEmail(val.email));
            closeModel();
            dispatch(handleOpenSignUpOtpModal(true));
            // dispatch(
            //   handleShowWarnModal({
            //     isShow: true,
            //     modelType: "success",
            //     modelMessage: response.data.message,
            //   })
            // );
          } else if (
            response?.data?.is_signup_completed === false &&
            response?.data?.is_verified
          ) {
            // email exist & verified but signup process pending
            dispatch(handleStopLoading());
            dispatch(handleStoreSignUpEmail(val.email));
            closeModel();
            dispatch(handleOpenSignUpFormModal(true));
            // dispatch(
            //   handleShowWarnModal({
            //     isShow: true,
            //     modelType: "success",
            //     modelMessage: response.data.message,
            //   })
            // );
          } else if (response?.data?.is_signup_completed === false) {
            // email exist but not verified & signup process pending
            dispatch(handleStopLoading());
            dispatch(handleStoreSignUpEmail(val.email));
            closeModel();
            dispatch(handleOpenSignUpOtpModal(true));
            // dispatch(
            //   handleShowWarnModal({
            //     isShow: true,
            //     modelType: "success",
            //     modelMessage: response.data.message,
            //   })
            // );
          }
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
    },
  });

  return (
    <>
      <Dialog
        open={signUpModalShow}
        onShow={() => resetForm()}
        onClose={() => dispatch(handleCloseAllModal())}
      >
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 height">
              <div className="login-left">
                <h2>Sign Up</h2>
                <p>
                  JOIN WITH US TO UNLOCK <br /> MORE OFFERS
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
                  <div className="mb-4 mb-sm-5 mb-md-0 mb-lg-0">
                    <TextInput
                      controlId="emailGroup"
                      value={values?.email}
                      inputRef={firstInputRef}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched?.email}
                      errors={errors?.email}
                      formGroupClassName="pt-3"
                      placeholder={"Email Address*"}
                      type="email"
                      name="email"
                      restProps={{ "aria-describedby": "E-mail address" }}
                    />
                  </div>
                  <button type="submit" className="btn cls-btn">
                    Send OTP
                  </button>
                  <div className="account">
                    <p>
                      Already have an account?
                      <button
                        type="button"
                        className="btn signup"
                        onClick={() => {
                          dispatch(handleCloseAllModal());
                          dispatch(handleOpenLoginModal(true));
                        }}
                      >
                        &nbsp;Signin
                      </button>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SignUpModal;
