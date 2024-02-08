import React, { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { FaArrowLeft, FaEye, FaEyeSlash, FaTruckFieldUn } from "react-icons/fa6";
import { useAppDispatch } from "../../../redux/store";
import { handleCloseAllModal, handleOpenForgotPasswordOtpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useSelector } from "react-redux";

import { PASSWORD_REGEX, encryptStr, getLoggedEmail, defaultMessageObj } from "../../../utils/config";
// import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleStartLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";
import { postCall } from "../../../services/apiCall";
import { useRouter } from "next/router";

const ChangePasswordOtpModal = () => {
	const Token = getLoggedEmail();
	const changePasswordModal = useSelector(modalSelector).ChangePassword;
	// const emailStore = useSelector(emailStoreSelectore);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [currentPasswordToggle, setCurrentPasswordToggle] = useState(false);
	const [newPasswordToggle, setNewPasswordToggle] = useState(false);
	const [repeatPasswordToggle, setRepeatPasswordToggle] = useState(false);

	const firstInputRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, [changePasswordModal]);

	const initialFormData = {
		currentPassword: "",
		newPassword: "",
		repeatPassword: "",
	};

	const closeModal = () => dispatch(handleCloseAllModal());
	const changePasswordValidation = useMemo(
		() =>
			yup.object().shape({
				currentPassword: yup.string().required("Please Enter Current Password"),
				newPassword: yup
					.string()
					.required("Please Enter New Password")
					.matches(PASSWORD_REGEX, "Password must contain more than 8 characters, 1 upper case letter, and 1 special character")
					.notOneOf([yup.ref("currentPassword"), null], "Current password and new password should be different."),
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
						email: getLoggedEmail(),
						password: value.currentPassword,
						newPassword: value.newPassword,
					})
				);
				const response = await postCall("changePassword", { key: encodedKey }, dispatch, router);
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

	const toggleViewCurrentPassword = () => {
		setCurrentPasswordToggle(!currentPasswordToggle);
	};

	const newTogglePassword = () => {
		setNewPasswordToggle(!newPasswordToggle);
	};

	const repeatTogglePassword = () => {
		setRepeatPasswordToggle(!repeatPasswordToggle);
	};

	return (
		<div>
			<Dialog open={changePasswordModal} onShow={() => resetForm()} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5">
							<div className="login-left">
								<h2>CHANGE PASSWORD</h2>
								<p>
									Enter new and confirm password <br /> to reset your password
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
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
											}}>
											<FaArrowLeft />
										</div>
									)}
									<div className="position-relative">
										<TextInput
											controlId="currentPassword"
											value={values?.currentPassword}
											inputRef={firstInputRef}
											onChange={handleChange}
											onBlur={handleBlur}
											touched={touched?.currentPassword}
											errors={errors?.currentPassword}
											placeholder={"Change Password*"}
											type={currentPasswordToggle ? "text" : "password"}
											name="currentPassword"
											inputClassName="placeholder-no-fix input-password text-box single-line password"
											restProps={{
												"aria-describedby": "currentPassword field",
											}}
											rightIcon={{
												onRightIconPress: toggleViewCurrentPassword,
												toggleOff: <FaEyeSlash />,
												toggleON: <FaEye />,
												state: currentPasswordToggle,
											}}
										/>
									</div>
									<div className="my-0 my-sm-1 my-md-1 my-lg-3 position-relative">
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
									<div className="mb-4 mb-sm-4 mb-md-0 mb-lg-0 position-relative">
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
