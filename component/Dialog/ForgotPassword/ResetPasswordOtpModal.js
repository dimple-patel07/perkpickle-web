import React, { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAppDispatch } from "../../../redux/store";
import { handleCloseAllModal, handleOpenForgotPasswordOtpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useSelector } from "react-redux";

import axios from "axios";
import { PASSWORD_REGEX, config, encryptStr, defaultMessageObj, PASSWORD_ERROR_MSG } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleStartLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";
import { postCall } from "../../../services/apiCall";

const ResetPasswordOtpModal = () => {
	const resetPasswordModal = useSelector(modalSelector).resetPassword;
	const emailStore = useSelector(emailStoreSelectore);
	const dispatch = useAppDispatch();
	const [newPasswordToggle, setNewPasswordToggle] = useState(false);
	const [repeatPasswordToggle, setRepeatPasswordToggle] = useState(false);

	const firstInputRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, [resetPasswordModal]);

	const initialFormData = {
		newPassword: "",
		repeatPassword: "",
	};

	const closeModal = () => dispatch(handleCloseAllModal());
	const changePasswordValidation = useMemo(
		() =>
			yup.object().shape({
				newPassword: yup.string().required("Please Enter New Password").matches(PASSWORD_REGEX, PASSWORD_ERROR_MSG),
				repeatPassword: yup
					.string()
					.required("Please Corfirm New Password")
					.oneOf([yup.ref("newPassword")], "Passwords must match"),
			}),
		[]
	);

	const { resetForm, handleChange, handleSubmit, handleBlur, values, touched, errors } = useFormik({
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
				const response = await postCall("resetPassword", { key: encodedKey }, dispatch);
				if (response?.email) {
					closeModal();
					dispatch(
						showMessage({
							...defaultMessageObj,
							type: "success",
							messageText: response.message,
						})
					);
				}
			} catch (error) {
				console.error(error);
			}
			resetForm();
			onClose();
		},
	});

	const newTogglePassword = () => {
		setNewPasswordToggle(!newPasswordToggle);
	};

	const repeatTogglePassword = () => {
		setRepeatPasswordToggle(!repeatPasswordToggle);
	};

	return (
		<div>
			<Dialog open={resetPasswordModal} onShow={() => resetForm()} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5">
							<div className="login-left">
								<h2>Reset Password</h2>
								<p>Enter new password</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-7 position-relative">
							<div className="login-right">
								<Form className="row" noValidate onSubmit={handleSubmit}>
									<div
										className="back-arrow text-start"
										onClick={() => {
											closeModal();
											dispatch(handleOpenForgotPasswordOtpModal(true));
										}}>
										<FaArrowLeft />
									</div>
									<div className="position-relative">
										<TextInput
											controlId="newPassword"
											value={values?.newPassword}
											inputRef={firstInputRef}
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
									<div className="my-3 mb-4 position-relative ">
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
									<button type="submit" className="btn cls-btn mb-5">
										Reset Password
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

export default ResetPasswordOtpModal;
