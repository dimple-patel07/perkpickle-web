import React, { useEffect, useRef, useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenForgotPasswordModal, handleOpenResetPasswordModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";

import axios from "axios";
import { config, defaultMessageObj } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleStartLoading, handleStopLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { postCall } from "../../../services/apiCall";

const ForgotPasswordOtpModal = () => {
	const modalState = useSelector(modalSelector);
	const emailStore = useSelector(emailStoreSelectore);
	const forgotPasswordOtpModalShow = modalState?.forgotPasswordOtp;
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(handleCloseAllModal());

	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

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

	const otpNumber = parseInt(otp.join(""), 10);
	const numberString = Math.abs(otpNumber).toString().length;

	// check otp / verify user
	const verifyUser = async () => {
		try {
			dispatch(handleStartLoading());
			const response = await postCall(
				"verifyUser",
				{
					email: emailStore?.forgotPasswordEmail,
					otp: otpNumber,
				},
				dispatch
			);
			dispatch(handleStopLoading());
			if (response?.email) {
				closeModal();
				dispatch(handleOpenResetPasswordModal(true));
			}
		} catch (error) {
			console.error(error);
		}
	};
	// resend otp
	const resendOtp = async () => {
		try {
			dispatch(handleStartLoading());
			const response = await postCall(
				"resendOtp",
				{
					email: emailStore?.forgotPasswordEmail,
				},
				dispatch
			);
			dispatch(handleStopLoading());
			if (response?.data?.email) {
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
	};

	return (
		<>
			<Dialog open={forgotPasswordOtpModalShow} onShow={() => setOtp(["", "", "", "", "", ""])} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-5 col-lg-5">
							<div className="login-left">
								<h2>FORGOT PASSWORD</h2>
								<p>
									Enter otp to Verify your <br /> email address
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-7 col-lg-7">
							<div className="login-right">
								<form>
									<div
										className="back-arrow text-start"
										onClick={() => {
											closeModal();
											dispatch(handleOpenForgotPasswordModal(true));
										}}>
										<FaArrowLeft />
									</div>
									<div className="mb-3">
										<input type="text" className="form-control" placeholder="Email Address" disabled value={emailStore?.forgotPasswordEmail} maxLength={250} />
									</div>
									<div className="otp-field">
										{otp.map((digit, index) => (
											<input key={index} type="text" placeholder="#" value={digit} maxLength="1" onChange={(event) => handleInputChange(index, event)} ref={inputRefs[index]} autoFocus={index === 0} />
										))}
									</div>
									<div className="text-end">
										<button type="button" className="resend" onClick={resendOtp}>
											Resend OTP
										</button>
									</div>
									<button type="button" disabled={numberString < 6} onClick={verifyUser} className="btn cls-btn mb-5">
										Reset Password
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ForgotPasswordOtpModal;
