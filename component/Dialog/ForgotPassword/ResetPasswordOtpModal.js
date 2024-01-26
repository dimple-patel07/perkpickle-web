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
import { PASSWORD_REGEX, config } from "../../../utils/config";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { IoEyeOff } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";

const ResetPasswordOtpModal = () => {
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
  } = useForm();

  const watchNewPassword = watch("newpassword", "");
  const watchConfirmPassword = watch("confirmpassword", "");

  const validatePasswordMatch = () => {
    if (watchNewPassword !== watchConfirmPassword) {
      setError("confirmpassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    }
  };

  const handleFormSubmit = async (data) => {
    console.log(data);
    try {
      const encodedKey = window.btoa(
        JSON.stringify({
          email: emailStore?.forgotPasswordEmail,
          newPassword: data?.confirmpassword,
        })
      );
      const response = await axios.post(`${config.apiURL}/resetPassword`, {
        key: encodedKey,
      });
      if (response?.data?.email) {
        closeModal();
        dispatch(
          handleShowWarnModal({
            isShow: true,
            modelType: "success",
            modelMessage: "Password has been updated!",
          })
        );
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
    <div>
      <Dialog
        open={resetPasswordModal}
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
                <Image src={images.ModalBannerImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 position-relative height">
              <div className="login-right">
                <div
                  className="back-arrow text-start"
                  onClick={() => {
                    closeModal();
                    dispatch(handleOpenForgotPasswordOtpModal(true));
                  }}
                >
                  <FaArrowLeft />
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div class="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="New Password"
                      {...register("newpassword", {
                        required: "Please Enter New Password",
                        pattern: {
                          value: PASSWORD_REGEX,
                          message: "Password not valid",
                        },
                      })}
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
                    name="newpassword"
                    as="p"
                  />
                  {/* new password */}
                  <div class="mt-3 position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm Password"
                      {...register("confirmpassword", {
                        required: "Please Enter Confirm Password",
                        pattern: {
                          value: PASSWORD_REGEX,
                          message: "Password not valid",
                        },
                      })}
                      maxLength={250}
                      onBlur={validatePasswordMatch}
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
                    name="confirmpassword"
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
