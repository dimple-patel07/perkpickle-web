import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { images } from "../../component/Images";
import Image from "next/image";
import {
  EMAIL_REGEX,
  PHONE_NUMBER_REGEX,
  getLoggedEmail,
  config,
  authHeader,
} from "../../utils/config";
import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import { handleShowWarnModal } from "../../redux/warnModel/warnModelSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"; 
import { handleStartLoading, handleStopLoading } from "../../redux/loader/loaderSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState();
  const phoneInputRef = useRef();
  useEffect(() => {
    getUserByEmail();
  }, []);

  const getUserByEmail = async () => {
    try {
      dispatch(handleStartLoading());
      const params = { email: getLoggedEmail() };
      const response = await axios.post(
        `${config.apiURL}/getUserByEmail`,
        params
        // { headers: authHeader }
      );
      dispatch(handleStopLoading());
      if (response?.data?.email) {
        // setCookie("userName", `${response?.data?.first_name}${response?.data?.last_name}`);
        setUserData(response.data);
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("emailAddress", userData?.email);
    setValue("first_name", userData?.first_name);
    setValue("last_name", userData?.last_name);
    setValue("phone_number", userData?.phone_number);
    setValue("zip_code", userData?.zip_code);
    if (phoneInputRef.current) {
      phoneInputRef.current.value = userData?.phone_number || "";
    }
  }, [userData, setValue]);

  const handleBlur = async (fieldName) => await trigger(fieldName);
  const handleOnChange = async (fieldName) => await trigger(fieldName);

  const handleFormSubmit = async (data) => {
    const postData = {
      ...userData,
      email: data?.emailAddress,
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number,
      zip_code: data?.zip_code,
    };

    try {
      dispatch(handleStartLoading());
      const response = await axios.post(
        `${config.apiURL}/updateUser`,
        postData
        // { headers: authHeader }
      );
      dispatch(handleStopLoading());
      if (response?.data?.email) {
        dispatch(
          handleShowWarnModal({
            isShow: true,
            modelType: "success",
            modelMessage: "profile updated successfully",
          })
        );
      } else {
        dispatch(
          handleShowWarnModal({
            isShow: true,
            modelType: "error",
            modelMessage: "profile updated failed",
          })
        );
      }
    } catch (errorObj) {
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: "profile updated failed",
        })
      );
    }
  };
  return (
    <>
      {/* Banner Start */}
      <section className="banner-section">
        <div className="container">
          <div className="banner-main">
            <div className="row align-items-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
                <div className="banner-text">
                  <h1>
                    Edit Your <br /> Profile Details
                  </h1>
                  <p>
                    lorem ipsum getiing dummy data lorem ipsum getiing dummy
                    datalorem ipsum getiing dummy datalorem ipsum getiing dummy
                    datalorem
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <Image
                  src={images.profileBannerImg}
                  width={544}
                  height={544}
                  className="img-fluid"
                  alt="profileBannerImg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Banner End */}

      {/* ScreenBanner Form Start */}
      <section className="screenbanner-form">
        <div className="container">
          <div className="banner-form">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="row gy-4 gy-sm-3 gy-md-4 gy-lg-5">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.emailAddress ? "error-input" : ""
                    }`}
                    disabled
                    placeholder="Email Address*"
                    {...register("emailAddress", {
                      onChange: () => handleOnChange("emailAddress"),
                      required: "Please Enter Email Address",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Invalid Email Address",
                      },
                    })}
                    maxLength={250}
                    onBlur={() => handleBlur("emailAddress")}
                  />
                  <ErrorMessage
                    className="error"
                    errors={errors}
                    name="emailAddress"
                    as="p"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputMask
                    className="form-control"
                    mask="(999) 999-9999"
                    placeholder="Phone Number"
                    defaultValue={
                      userData?.phone_number && userData?.phone_number
                    }
                    {...register("phone_number", {
                      onChange: () => handleOnChange("phone_number"),
                      // required: "Please Enter Phone Number",
                      // pattern: {
                      //   value: PHONE_NUMBER_REGEX,
                      //   message: "",
                      // },
                    })}
                    ref={phoneInputRef}
                    onBlur={() => handleBlur("phone_number")}
                  />
                  <ErrorMessage
                    className="error"
                    errors={errors}
                    name="phone_number"
                    as="p"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.first_name ? "error-input" : ""
                    }`}
                    placeholder="First Name*"
                    {...register("first_name", {
                      onChange: () => handleOnChange("first_name"),
                      required: "Please Enter First Name",
                      maxLength: {
                        value: 30,
                        message: "Last Name should not exceed 30 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Please enter more than 3 characters",
                      },
                    })}
                    onBlur={() => handleBlur("first_name")}
                  />
                  <ErrorMessage
                    className="error"
                    errors={errors}
                    name="first_name"
                    as="p"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.last_name ? "error-input" : ""
                    }`}
                    placeholder="Last Name*"
                    {...register("last_name", {
                      required: "Please Enter Last Name",
                      onChange: () => handleOnChange("last_name"),
                      maxLength: {
                        value: 30,
                        message: "Last Name should not exceed 30 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Please enter more than 3 characters",
                      },
                    })}
                    onBlur={() => handleBlur("last_name")}
                  />
                  <ErrorMessage
                    className="error"
                    errors={errors}
                    name="last_name"
                    as="p"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <textarea
                    type="text"
                    defaultValue={userData?.address}
                    placeholder="Address"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="number"
                    className={`form-control ${
                      errors.zip_code ? "error-input" : ""
                    }`}
                    placeholder="Zip Code*"
                    {...register("zip_code", {
                      required: "Please Enter Zip Code.",
                      onChange: () => handleOnChange("zip_code"),
                      maxLength: {
                        value: 5,
                        message: "Please Enter Valid Zip Code",
                      },
                      minLength: {
                        value: 5,
                        message: "Please Enter Valid Zip Code",
                      },
                    })}
                    onBlur={() => handleBlur("zip_code")}
                  />
                  <ErrorMessage
                    className="error"
                    errors={errors}
                    name="zip_code"
                    as="p"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-sm-center text-md-start text-lg-start">
                  <button
                    type="submit"
                    className="btn"
                    // onClick={() => updateUser()}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
