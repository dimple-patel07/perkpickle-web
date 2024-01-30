import React, { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import {
  handleCloseAllModal,
  handleOpenLoginModal,
  handleOpenSignUpFormModal,
  modalSelector,
} from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import {
  handleStartLoading,
  handleStopLoading,
} from "../../../redux/loader/loaderSlice";
const SignUpOtpModal = () => {
  const ModalState = useSelector(modalSelector);
  const emailStore = useSelector(emailStoreSelectore);
  const signUpOtpShow = ModalState?.signUpOtp;
  const dispatch = useAppDispatch();
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
    inputRefs[0]?.current?.focus();
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

  const onInputChanged = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const otpNumber = parseInt(otp.join(""), 10);
  const numberString = Math.abs(otpNumber).toString().length;

  const resendOtp = async () => {
    try {
      dispatch(handleStartLoading());
      const response = await axios.post(`${config.apiURL}/resendOtp`, {
        email: emailStore?.signUpEmail,
      });
      if (response?.data?.email) {
        dispatch(handleStopLoading());
        setOtp(["", "", "", "", "", ""]);
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

  const verifyUser = async () => {
    try {
      dispatch(handleStartLoading());
      const response = await axios.post(`${config.apiURL}/verifyUser`, {
        email: emailStore?.signUpEmail,
        otp: otpNumber,
      });
      if (response?.data?.email) {
        dispatch(handleStopLoading());
        dispatch(handleCloseAllModal());
        dispatch(handleOpenSignUpFormModal(true));
      }
    } catch (errorObj) {
		console.log(errorObj);
      dispatch(handleStopLoading());
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: "Something went wrong",
        })
      );
    }
  };

  return (
    <>
      <Dialog
        open={signUpOtpShow}
        onShow={() => setOtp(["", "", "", "", "", ""])}
        onClose={() => dispatch(handleCloseAllModal())}
      >
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 height">
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-7 position-relative height">
              <div className="login-right">
                <form>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Email Address*"
                      autoComplete="off"
                      name="email"
                      disabled
                      value={emailStore?.signUpEmail}
                      onChange={onInputChanged}
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
                  <div id="emailHelp" className="text-end">
                    <button
                      type="button"
                      className="resend"
                      onClick={resendOtp}
                    >
                      Resend OTP
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={numberString < 6}
                    onClick={() => {
                      verifyUser();
                    }}
                    className="btn cls-btn"
                  >
                    Continue
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SignUpOtpModal;
