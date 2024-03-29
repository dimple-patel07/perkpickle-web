"use client";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenForgotPasswordOtpModal, handleOpenLoginModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { EMAIL_REGEX, defaultMessageObj } from "../../../utils/config";
import { handleStoreForgotPasswordEmail } from "../../../redux/emailStore/emailStoreSlice";
import { handleStartLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";
import { postCall } from "../../../services/apiCall";

const ForgotPasswordModal = () => {
	const modalState = useSelector(modalSelector);
	const forgotPasswordModalShow = modalState?.forgotPassword;
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(handleCloseAllModal());
	const firstInputRef = useRef(null);

	useEffect(() => {
		if (forgotPasswordModalShow) {
			setTimeout(() => {
				firstInputRef?.current?.focus();
			}, 500);
		}
	}, [forgotPasswordModalShow]);

	const initialFormData = {
		email: "",
	};

	const loginEmailValidation = () =>
		yup.object().shape({
			email: yup.string().required("Please Enter Email").matches(EMAIL_REGEX, "Please Enter Valid Email"),
		});

	const { handleChange, handleSubmit, handleBlur, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: loginEmailValidation,
		onSubmit: async (val) => {
			try {
				dispatch(handleStartLoading());
				const response = await postCall("forgotPassword", { email: val.email }, dispatch);
				if (response?.email) {
					dispatch(handleStoreForgotPasswordEmail(response.email));
					closeModal();
					dispatch(handleOpenForgotPasswordOtpModal(true));
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
		},
	});

	return (
		<>
			<Dialog open={forgotPasswordModalShow} onShow={() => resetForm()} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-5 col-lg-5 height">
							<div className="login-left">
								<h2>Forgot Password?</h2>
								<p>
									Enter your registered email <br /> to get OTP
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-7 col-lg-7 position-relative height">
							<div className="login-right">
								<Form className="row" noValidate onSubmit={handleSubmit}>
									<div
										className="back-arrow text-start"
										onClick={() => {
											closeModal();
											dispatch(handleOpenLoginModal(true));
										}}>
										<FaArrowLeft />
									</div>
									<div className="mb-3">
										<TextInput controlId="forgot-email-Group" inputRef={firstInputRef} value={values?.email} onChange={handleChange} onBlur={handleBlur} touched={touched?.email} errors={errors?.email} formGroupClassName="mb-4" placeholder={"Email Address*"} type="text" name="email" restProps={{ "aria-describedby": "forgot-email-address" }} />
									</div>
									<button type="submit" className="btn cls-btn mb-5">
										Send OTP
									</button>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ForgotPasswordModal;
