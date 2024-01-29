import React, { useEffect, useState } from "react";
import Dialog from "../../Dialog/Dialog";
import { images } from "../../Images";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSelector } from "react-redux";
import {
  handleCloseAllModal,
  handleOpenForgotPasswordModal,
  handleOpenSignUpModal,
  modalSelector,
} from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import axios from "axios";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  config,
  encryptStr,
} from "../../../utils/config";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { IoEyeOff } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import {
  handleStartLoading,
  handleStopLoading,
} from "../../../redux/loader/loaderSlice";

const LoginModal = () => {
  const ModalState = useSelector(modalSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginModal = ModalState?.login;

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
    getFieldState,
  } = useForm();

  useEffect(() => {
    reset();
  }, []);

  const handleBlur = async (fieldName) => await trigger(fieldName);
  const handleOnChange = async (fieldName) => await trigger(fieldName);

  const handleFormSubmit = async (data) => {
    const loginCred = {
      email: data?.emailAddress,
      password: data?.password,
    };
    try {
      dispatch(handleStartLoading());
      const encryptedKey = encryptStr(JSON.stringify(loginCred));
      const response = await axios.post(`${config.apiURL}/login`, {
        key: encryptedKey,
      });
      dispatch(handleStopLoading());
      if (response?.data?.token) {
        setCookie("user", response?.data?.token);
        setCookie("userName", response?.data?.userName);
        router.replace("/");
        dispatch(handleCloseAllModal());
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
    <Dialog
      open={loginModal}
      onShow={() => reset()}
      onClose={() => dispatch(handleCloseAllModal())}
    >
      <div className="container-fluid ps-0 pe-0 pe-sm-0">
        <div className="row align-items-center">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <div className="login-left">
              <h2>LOGIN</h2>
              <p>
                JOIN WITH US TO UNLOCK <br /> MORE OFFERS
              </p>
              <Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img"/>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-7">
            <div className="login-right">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.emailAddress ? "error-input" : ""
                    }`}
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
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.password ? "error-input" : ""
                    }`}
                    placeholder="Password*"
                    {...register("password", {
                      onChange: () => handleOnChange("password"),
                      required: "Please Enter Password",
                      //   pattern: {
                      //     value: PASSWORD_REGEX,
                      //     message: "Password not valid",
                      //   },
                    })}
                    onBlur={() => handleBlur("password")}
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
                  className="error"
                  errors={errors}
                  name="password"
                  as="p"
                />
                <button
                  type="button"
                  onClick={() => {
                    dispatch(handleCloseAllModal());
                    dispatch(handleOpenForgotPasswordModal(true));
                  }}
                  id="emailHelp"
                  className="forgot-password"
                >
                  Forgot Password?
                </button>
                <button type="submit" className="cls-btn btn">
                  Sign In
                </button>
                <div className="account">
                  <p>Don’t have an account? </p>

                  <button
                    className="signup"
                    type="button"
                    onClick={() => {
                      dispatch(handleCloseAllModal());
                      dispatch(handleOpenSignUpModal(true));
                    }}
                  >
                    &nbsp;Sign Up&nbsp;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
