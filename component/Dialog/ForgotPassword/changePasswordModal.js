import React, { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
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
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import {
  handleStartLoading,
  handleStopLoading,
} from "../../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";

const ChangePasswordOtpModal = () => {
  const Token = getLoggedEmail();
  const changePasswordModal = useSelector(modalSelector).ChangePassword;
  const emailStore = useSelector(emailStoreSelectore);
  const dispatch = useAppDispatch();
  const [oldPasswordToggle, setOldPasswordToggle] = useState(false);
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [repeatPasswordToggle, setRepeatPasswordToggle] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (changePasswordModal) {
      firstInputRef?.current?.focus();
    }
  }, [changePasswordModal]);

  const initialFormData = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const closeModal = () => dispatch(handleCloseAllModal());
  const changePasswordValidation = useMemo(
    () =>
      yup.object().shape({
        oldPassword: yup.string().required("Please Enter Old Password"),
        newPassword: yup
          .string()
          .required("Please Enter New Password")
          .matches(
            PASSWORD_REGEX,
            "Password should be at least 8 characters, with a symbol or one capital letter"
          )
          .notOneOf(
            [yup.ref("oldPassword"), null],
            "Current password and new password should be different."
          ),
        repeatPassword: yup
          .string()
          .required("Please Corfirm New Password")
          .oneOf([yup.ref("newPassword")], "Passwords must match"),
      }),
    []
  );

  const {
    resetForm,
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: initialFormData,
    validationSchema: changePasswordValidation,
    onSubmit: async (value) => {
      try {
        dispatch(handleStartLoading());
        const encodedKey = encryptStr(
          JSON.stringify({
            email: emailStore?.forgotPasswordEmail,
            newPassword: value.repeatPassword,
          })
        );
        const response = await axios.post(`${config.apiURL}/resetPassword`, {
          key: encodedKey,
        });
        dispatch(handleStopLoading());
        if (response?.data?.email) {
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
      resetForm();
      onClose();
    },
  });

  const oldTogglePassword = () => {
    setOldPasswordToggle(!oldPasswordToggle);
  };

  const newTogglePassword = () => {
    setNewPasswordToggle(!newPasswordToggle);
  };

  const repeatTogglePassword = () => {
    setRepeatPasswordToggle(!repeatPasswordToggle);
  };

  return (
    <div>
      <Dialog
        open={changePasswordModal}
        onShow={() => resetForm()}
        onClose={() => dispatch(handleCloseAllModal())}
      >
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
              <div className="login-left">
                <h2>CHANGE PASSWORD</h2>
                <p>
                  Enter new and confirm password <br /> to reset your password
                </p>
                <Image
                  src={images.ModalBannerImg}
                  className="img-fluid"
                  alt="banner-img"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-7 position-relative">
              <div className="login-right">
                <Form className="row" noValidate onSubmit={handleSubmit}>
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
                  <div className="position-relative mb-3">
                    <TextInput
                      controlId="oldPassword"
                      value={values?.oldPassword}
                      inputRef={firstInputRef}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched?.oldPassword}
                      errors={errors?.oldPassword}
                      placeholder={"Old Password*"}
                      type={oldPasswordToggle ? "text" : "password"}
                      name="oldPassword"
                      inputClassName="placeholder-no-fix input-password text-box single-line password"
                      restProps={{ "aria-describedby": "oldPassword field" }}
                      rightIcon={{
                        onRightIconPress: oldTogglePassword,
                        toggleOff: <FaEyeSlash />,
                        toggleON: <FaEye />,
                        state: oldPasswordToggle,
                      }}
                    />
                  </div>
                  <div className="my-4 position-relative">
                    <TextInput
                      controlId="newPassword"
                      value={values?.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched?.newPassword}
                      errors={errors?.newPassword}
                      placeholder={"New Password*"}
                      type={newPasswordToggle ? "text" : "password"}
                      name="newPassword"
                      inputClassName="placeholder-no-fix input-password text-box single-line password"
                      restProps={{ "aria-describedby": "NewPassword field" }}
                      rightIcon={{
                        onRightIconPress: newTogglePassword,
                        toggleOff: <FaEyeSlash />,
                        toggleON: <FaEye />,
                        state: newPasswordToggle,
                      }}
                    />
                  </div>
                  <div className="mt-3 position-relative ">
                    <TextInput
                      controlId="repeatPassword"
                      value={values?.repeatPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched?.repeatPassword}
                      errors={errors?.repeatPassword}
                      placeholder={"Confirm Password*"}
                      type={repeatPasswordToggle ? "text" : "password"}
                      name="repeatPassword"
                      inputClassName="placeholder-no-fix input-password text-box single-line password"
                      restProps={{ "aria-describedby": "RepeatPassword field" }}
                      rightIcon={{
                        onRightIconPress: repeatTogglePassword,
                        toggleOff: <FaEyeSlash />,
                        toggleON: <FaEye />,
                        state: repeatPasswordToggle,
                      }}
                    />
                  </div>
                  <button type="submit" className="btn cls-btn mb-3">
                    Change Password
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ChangePasswordOtpModal;
