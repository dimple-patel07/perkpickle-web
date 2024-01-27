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
import { PASSWORD_REGEX, config } from "../../../utils/config";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { IoEyeOff } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";

const LoginModal = () => {
  const ModalState = useSelector(modalSelector);
  const router = useRouter();
  const loginModal = ModalState?.login;
  const dispatch = useAppDispatch();
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, []);

  const handleFormSubmit = async (data) => {
    const loginCred = {
      email: data?.emailAddress,
      password: data?.password,
    };
    try {
      const encryptedKey = window.btoa(JSON.stringify(loginCred));
      const response = await axios.post(`${config.apiURL}/login`, {
        key: encryptedKey,
      });
      if (response?.data?.token) {
        setCookie("user", response?.data?.token);
        router.replace("/");
        dispatch(handleCloseAllModal());
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
    <Dialog open={loginModal} onShow={()=>reset()} onClose={() => dispatch(handleCloseAllModal())}>
      <div className="container-fluid ps-0 pe-0 pe-sm-0">
        <div className="row align-items-center">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <div className="login-left">
              <h2>LOGIN</h2>
              <p>
                JOIN WITH US TO UNLOCK <br /> MORE OFFERS
              </p>
              <Image src={images.ModalBannerImg} className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-7">
            <div className="login-right">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    {...register("emailAddress", {
                      required: "Please Enter Email Address",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Invalid Email Address",
                      },
                    })}
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
                    className="form-control"
                    placeholder="Password"
                    {...register("password", {
                      required: "Please Enter Password",
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
