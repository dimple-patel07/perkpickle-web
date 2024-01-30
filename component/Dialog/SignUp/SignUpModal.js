import React, { useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import SignUpOtpModal from "./SignUpOtpModal";
import { handleCloseAllModal, handleOpenLoginModal, handleOpenSignUpModal, handleOpenSignUpOtpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";

import axios from "axios";
import { config } from "../../../utils/config";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { handleStoreSignUpEmail } from "../../../redux/emailStore/emailStoreSlice";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import { handleStartLoading, handleStopLoading } from "../../../redux/loader/loaderSlice";

const SignUpModal = () => {
	const ModalState = useSelector(modalSelector);
	const signUpModalShow = ModalState?.SignUp;
	const dispatch = useAppDispatch();
	const closeModel = () => dispatch(handleCloseAllModal(false));
	const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		trigger,
	} = useForm();

	const handleBlur = async (fieldName) => await trigger(fieldName);
	const handleOnChange = async (fieldName) => await trigger(fieldName);

	const handleFormSubmit = async (data) => {
		const signUpEmail = {
			email: data.emailAddress,
		};
		try {
			dispatch(handleStartLoading());
			const response = await axios.post(`${config.apiURL}/createUser`, signUpEmail);
			if (response?.data?.email) {
				dispatch(handleStopLoading());
				dispatch(handleStoreSignUpEmail(data.emailAddress));
				closeModel();
				dispatch(handleOpenSignUpOtpModal(true));
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
	return (
		<>
			<Dialog open={signUpModalShow} onShow={() => reset()} onClose={() => dispatch(handleCloseAllModal())}>
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
								<form onSubmit={handleSubmit(handleFormSubmit)}>
									<div className="mb-3">
										<input
											type="text"
											className={`form-control ${errors.emailAddress ? "error-input" : ""}`}
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
										<ErrorMessage className="error" errors={errors} name="emailAddress" as="p" />
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
								</form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default SignUpModal;
