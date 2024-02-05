import React, { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import SignUpOtpModal from "./SignUpOtpModal";
import { handleCloseAllModal, handleOpenLoginModal, handleOpenSignUpFormModal, handleOpenSignUpModal, handleOpenSignUpOtpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import * as yup from "yup";
import axios from "axios";
import { config, defaultMessageObj } from "../../../utils/config";

import { handleStoreSignUpEmail } from "../../../redux/emailStore/emailStoreSlice";
import { handleStartLoading, handleStopLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { Form } from "react-bootstrap";
import TextInput from "../../TextInput";
import { useFormik } from "formik";
import { postCall } from "../../../services/apiCall";

const SignUpModal = () => {
	const ModalState = useSelector(modalSelector);
	const signUpModalShow = ModalState?.SignUp;
	const dispatch = useAppDispatch();
	const closeModel = () => dispatch(handleCloseAllModal());

	const firstInputRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, [signUpModalShow]);

	const initialFormData = {
		email: "",
	};

	const loginEmailValidation = () =>
		yup.object().shape({
			email: yup.string().required("Please Enter Email").email("Please Enter Valid Email"),
		});

	const { handleChange, handleSubmit, handleBlur, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: loginEmailValidation,
		onSubmit: async (val) => {
			try {
				dispatch(handleStartLoading());
				const response = await postCall("newUserSignup", { email: val.email });
				dispatch(handleStopLoading());
				if (response.email) {
					dispatch(
						showMessage({
							...defaultMessageObj,
							type: "success",
							messageText: response.data.message,
						})
					);
					dispatch(handleStoreSignUpEmail(val.email));
					closeModel();
					dispatch(handleOpenSignUpOtpModal(true));
				} else if (response.is_signup_completed === false && response.is_verified) {
					// email exist & verified but signup process pending
					dispatch(handleStopLoading());
					dispatch(handleStoreSignUpEmail(val.email));
					closeModel();
					dispatch(handleOpenSignUpFormModal(true));
				} else if (response.is_signup_completed === false) {
					// email exist but not verified & signup process pending
					dispatch(
						showMessage({
							...defaultMessageObj,
							type: "success",
							messageText: response.data.message,
						})
					);
					dispatch(handleStopLoading());
					dispatch(handleStoreSignUpEmail(val.email));
					closeModel();
					dispatch(handleOpenSignUpOtpModal(true));
				}
			} catch (error) {
				console.error(error);
			}
		},
	});

	return (
		<>
			<Dialog open={signUpModalShow} onShow={() => resetForm()} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-5 col-lg-5 height">
							<div className="login-left">
								<h2>Sign Up</h2>
								<p>
									JOIN WITH US TO UNLOCK <br /> MORE OFFERS
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-7 col-lg-7 position-relative height">
							<div className="login-right">
								<Form className="row" noValidate onSubmit={handleSubmit}>
									<div className="mb-4 mb-sm-5 mb-md-0 mb-lg-0">
										<TextInput controlId="emailGroup" value={values?.email} inputRef={firstInputRef} onChange={handleChange} onBlur={handleBlur} touched={touched?.email} errors={errors?.email} formGroupClassName="pt-3" placeholder={"Email Address*"} type="email" name="email" restProps={{ "aria-describedby": "E-mail address" }} />
									</div>
									<button type="submit" className="btn cls-btn">
										Send OTP
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
												}}>
												&nbsp;Signin
											</button>
										</p>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default SignUpModal;
