import React, { useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppDispatch } from "../../../redux/store";
import {
  handleCloseAllModal,
  handleOpenForgotPasswordOtpModal,
  modalSelector,
} from "../../../redux/modal/modalSlice";
import { useSelector } from "react-redux";

import axios from "axios";
import {
  PASSWORD_REGEX,
  config,
  encryptStr,
  getLoggedEmail,
} from "../../../utils/config";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { IoEyeOff } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import { handleStartLoading, handleStopLoading } from "../../../redux/loader/loaderSlice";

const ResetPasswordOtpModal = () => {
  const Token = getLoggedEmail();
  const resetPasswordModal = useSelector(modalSelector).resetPassword;
  const emailStore = useSelector(emailStoreSelectore);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    
  const closeModal = () => dispatch(handleCloseAllModal());

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setError,
    reset,
	trigger
  } = useForm();

  const watchNewPassword = watch("newPassword", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  const handleBlur = async (fieldName) => await trigger(fieldName);
  const handleOnChange = async (fieldName) => await trigger(fieldName);

  const validatePasswordMatch = () => {
    if (watchNewPassword !== watchConfirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    }
  };

  const handleFormSubmit = async (data) => {
    console.log(data);
    try {
      dispatch(handleStartLoading());
      const encodedKey = encryptStr(
        JSON.stringify({
          email: emailStore?.forgotPasswordEmail,
          newPassword: data?.confirmPassword,
        })
      );

      const response = await axios.post(`${config.apiURL}/resetPassword`, {
        key: encodedKey,
      });
      if (response?.data?.email) {
        dispatch(handleStopLoading());
        closeModal();
        dispatch(
          handleShowWarnModal({
            isShow: true,
            modelType: "success",
            modelMessage: response.data.message,
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
    <div>
      <Dialog
        open={resetPasswordModal}
        onShow={() => reset()}
        onClose={() => dispatch(handleCloseAllModal())}
      >
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-5 height">
              <div className="login-left">
                <h2>RESET PASSWORD</h2>
                <p>
                  Enter new and confirm password <br /> to reset your password
                </p>
                <Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img"/>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 position-relative height">
              <div className="login-right">
                {!Token && (
                  <div
                    className="back-arrow text-start"
                    onClick={() => {
                      closeModal();
                      dispatch(handleOpenForgotPasswordOtpModal(true));
                    }}
                  >
                    <FaArrowLeft />
                  </div>
                )}
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.newPassword
                         ? "error-input"
                         : ""
                     }`}
                      placeholder="Password*"
                      {...register("newPassword", {
                        onChange: () => handleOnChange("newPassword"),
                        required: "Please Enter New Password",
                        pattern: {
                          value: PASSWORD_REGEX,
                          message:
                            "Password should be at least 8 characters, with a symbol or letter",
                        },
                      })}
                      onBlur={() => handleBlur("newPassword")}
                      maxLength={250}
                    />
                    <span
                      className={`eye-icon ${showPassword ? "show" : "hide"}`}
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <IoEyeOff /> : <TiEye />}
                    </span>
                  </div>
                  <ErrorMessage
                    className="error mb-3"
                    errors={errors}
                    name="newPassword"
                    as="p"
                  />
                  {/* new password */}
                  <div className="mt-3 position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.confirmPassword
                         ? "error-input"
                         : ""
                     }`}
                      placeholder="Confirm Password*"
                      {...register("confirmPassword", {
                        required: "Please Enter Confirm Password",
                        onChange: () => handleOnChange("confirmPassword"),
                        pattern: {
                          value: PASSWORD_REGEX,
                          message: "Confirm Password not valid",
                        },
                      })}
                      maxLength={250}
                      onBlur={() => {
                        validatePasswordMatch();
                        handleBlur("confirmPassword");
                      }}
                    />
                    <span
                      className={`eye-icon ${
                        showConfirmPassword ? "show" : "hide"
                      }`}
                      onClick={handleToggleConfirmPassword}
                    >
                      {showConfirmPassword ? <IoEyeOff /> : <TiEye />}
                    </span>
                  </div>
                  <ErrorMessage
                    className="error"
                    errors={errors}
                    name="confirmPassword"
                    as="p"
                  />
                  <button type="submit" className="btn cls-btn">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ResetPasswordOtpModal;
