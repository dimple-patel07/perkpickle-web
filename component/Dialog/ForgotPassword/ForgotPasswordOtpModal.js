import React, { useState } from "react";
import { images } from "../../Images";
import Image from "next/image";
import Dialog from "../Dialog";
import { FaArrowLeft } from "react-icons/fa6";
import ResetPasswordOtpModal from "./ResetPasswordOtpModal";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenResetPasswordModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";

import axios from "axios";
import { config } from "../../../utils/config";
const ForgotPasswordOtpModal = () => {
	const modalState = useSelector(modalSelector);
	const forgotPasswordOtpModalShow = modalState?.forgotPasswordOtp;
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(handleCloseAllModal());

	const [userData, setUserData] = useState({
		email: "",
		otp: "",
	});

	const onInputChanged = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	// check otp / verify user
	const verifyUser = async () => {
		try {
			const response = await axios.post(`${config.apiURL}/verifyUser`, userData);
			if (response?.data?.email) {
				console.log("user verified successfully");
				closeModal();
				dispatch(handleOpenResetPasswordModal());
			}
		} catch (errorObj) {
			console.error(errorObj?.response?.data?.error); // error
		}
	};
	// resend otp
	const resendOtp = async () => {
		try {
			const response = await axios.post(`${config.apiURL}/resendOtp`, { email: userData.email });
			if (response?.data?.otp) {
				console.log("otp sent successfully");
			}
		} catch (errorObj) {
			console.error(errorObj?.response?.data?.error); // error
		}
	};
	return (
		<>
			<Dialog open={forgotPasswordOtpModalShow} onClose={closeModal}>
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-5 col-lg-5">
							<div className="login-left">
								<h2>FORGOT PASSWORD</h2>
								<p>
									Enter otp to Verify your <br /> email address
								</p>
								<Image src={images.LoginImg} className="img-fluid" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-7 col-lg-7">
							<div className="login-right">
								<div className="back-arrow text-start">
									<FaArrowLeft />
								</div>
								<form>
									<div class="mb-3">
										<input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Email Address" autoComplete="off" name="email" onChange={onInputChanged} />
									</div>
									<div class="otp-field">
										<input type="text" maxlength="1" />
										<input type="text" maxlength="1" />
										<input class="space" type="text" maxlength="1" />
										<input type="text" maxlength="1" />
										<input type="text" maxlength="1" />
										<input type="text" maxlength="1" />
									</div>

									<div class="mb-2 mt-2">
										<input type="text" class="form-control" placeholder="OTP" autoComplete="off" name="otp" onChange={onInputChanged} />
									</div>
									<div id="emailHelp" class="resend">
										Resend OTP
									</div>
									<button
										type="button"
										onClick={() => {
											verifyUser();
										}}
										className="btn">
										Reset Password
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
			<ResetPasswordOtpModal />
		</>
	);
};

export default ForgotPasswordOtpModal;
