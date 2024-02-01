import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { images } from "../../component/Images";
import Image from "next/image";
import { getLoggedEmail, config } from "../../utils/config";
import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import {
  handleStartLoading,
  handleStopLoading,
  showMessage,
} from "../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../component/TextInput";
import { FloatingLabel, Form } from "react-bootstrap";
import { defaultMessageObj } from "../../utils/config";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState();
  const firstInputRef = useRef(null);

  useEffect(() => {
    getUserByEmail();
    firstInputRef?.current?.focus();
  }, []);

  const getUserByEmail = async () => {
    try {
      // dispatch(handleStartLoading());
      const params = { email: getLoggedEmail() };
      const response = await axios.post(
        `${config.apiURL}/getUserByEmail`,
        params
        // { headers: authHeader }
      );
      dispatch(handleStopLoading());
      firstInputRef?.current?.focus();
      if (response?.data?.email) {
        // setCookie("userName", `${response?.data?.first_name}${response?.data?.last_name}`);
        setUserData(response.data);
      }
    } catch (errorObj) {
      dispatch(handleStopLoading());
      dispatch(
        showMessage({
          ...defaultMessageObj,
          type: "error",
          messageText:
            errorObj?.response?.data?.error || "Something went wrong",
        })
      );
    }
  };

  const initialFormData = {
    emailAddress: "",
    first_name: "",
    last_name: "",
    zip_code: "",
    address: "",
    phone_number: "",
  };

  const signInFormValidation = () =>
    yup.object().shape({
      first_name: yup.string().required("Please Enter First Name"),
      last_name: yup.string().required("Please Enter Last Name"),
      zip_code: yup.string().required("Please Enter Zip Code"),
    });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialFormData,
    validationSchema: signInFormValidation,
    onSubmit: async (data) => {
      const postData = {
        ...userData,
        email: data.emailAddress || userData?.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        zip_code: data.zip_code,
        address: data.address,
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
          getUserByEmail();
          dispatch(
            showMessage({
              ...defaultMessageObj,
              type: "success",
              messageText: response?.data?.message,
            })
          );
        } else {
          dispatch(
            showMessage({
              ...defaultMessageObj,
              type: "error",
              messageText: response?.data?.message,
            })
          );
        }
      } catch (errorObj) {
        dispatch(
          showMessage({
            ...defaultMessageObj,
            type: "error",
            messageText: "Something went wrong",
          })
        );
      }
    },
  });

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    if (userData) {
      setFieldValue("email", userData?.email);
      setFieldValue("first_name", userData?.first_name);
      setFieldValue("last_name", userData?.last_name);
      setFieldValue("phone_number", userData?.phone_number);
      setFieldValue("zip_code", userData?.zip_code);
      setFieldValue("address", userData?.address);
    }
  }, [userData]);

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
            <Form noValidate onSubmit={handleSubmit}>
              <div className="row gy-4 gy-sm-3 gy-md-4">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <TextInput
                    controlId="email-controler"
                    value={values?.email || ""}
                    disabled
                    placeholder="Email*"
                    type="email"
                    name="email"
                    restProps={{ "aria-describedby": "email-form" }}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <FloatingLabel
                    controlId="floatingPhoneNumber"
                    label="Phone Number"
                  >
                    <InputMask
                      className="form-control"
                      mask="(999) 999-9999"
                      placeholder="Phone Number"
                      value={values?.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone_number"
                    />
                  </FloatingLabel>
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <TextInput
                    controlId="firstname"
                    value={values?.first_name}
                    inputRef={firstInputRef}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched?.first_name}
                    errors={errors?.first_name}
                    placeholder="First Name*"
                    type="text"
                    name="first_name"
                    restProps={{ "aria-describedby": "First Name" }}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <TextInput
                    controlId="lastname"
                    value={values?.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched?.last_name}
                    errors={errors?.last_name}
                    placeholder="Last Name*"
                    type="text"
                    name="last_name"
                    restProps={{ "aria-describedby": "Last Name" }}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                  <TextInput
                    controlId="address"
                    value={values?.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched?.address}
                    errors={errors?.address}
                    inputType="textarea"
                    placeholder={"Address"}
                    type="text"
                    name="address"
                    restProps={{ "aria-describedby": "address" }}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                  <TextInput
                    controlId="zipcode"
                    value={values?.zip_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched?.zip_code}
                    errors={errors?.zip_code}
                    placeholder="Zip Code*"
                    type="text"
                    maxLength={5}
                    name="zip_code"
                    restProps={{ "aria-describedby": "zip code" }}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-sm-center text-md-start text-lg-start">
                  <button type="submit" className="btn">
                    Update Profile
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
