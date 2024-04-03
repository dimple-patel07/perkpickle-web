import React, { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import { handleCloseAllModal, handleOpenLoginModal, handleOpenSignUpFormModal, handleOpenSignUpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { defaultMessageObj } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { handleStartLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { FaArrowLeft } from "react-icons/fa6";
import { postCall } from "../../../services/apiCall";

const SignUpOtpModal = () => {
	const ModalState = useSelector(modalSelector);
	const emailStore = useSelector(emailStoreSelectore);
	const signUpOtpShow = ModalState?.signUpOtp;
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(handleCloseAllModal());
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

	useEffect(() => {
		setOtp(["", "", "", "", "", ""]);
		setTimeout(() => {
			inputRefs[0]?.current?.focus();
		}, 500);
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
				inputRefs[index - 1]?.current?.focus();
			}
		}
	};

	const [userData, setUserData] = useState({
		email: "",
		otp: "",
	});

	const onInputChanged = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const otpNumber = parseInt(otp.join(""), 10);
	const numberString = Math.abs(otpNumber).toString().length;

	const resendOtp = async () => {
		try {
			dispatch(handleStartLoading());
			const response = await postCall("resendOtp", { email: emailStore?.signUpEmail, isUserCreation: true }, dispatch);
			if (response?.email) {
				setOtp(["", "", "", "", "", ""]);
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

	const verifyUser = async () => {
		try {
			dispatch(handleStartLoading());
			const response = await postCall(
				"verifyUser",
				{
					email: emailStore?.signUpEmail,
					otp: otpNumber,
				},
				dispatch
			);

			if (response?.email) {
				dispatch(handleCloseAllModal());
				dispatch(handleOpenSignUpFormModal(true));
			}
		} catch (error) {
			setOtp(["", "", "", "", "", ""]);
			inputRefs[0]?.current?.focus();
			console.error(error);
		}
	};

	return (
		<>
			<Dialog open={signUpOtpShow} onShow={() => setOtp(["", "", "", "", "", ""])} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5 height">
							<div className="login-left">
								<h2>Sign Up</h2>
								<p>
									Join us to save more on <br /> your spending
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-7 position-relative height">
							<div className="login-right">
								<form>
									<div
										className="back-arrow text-start"
										onClick={() => {
											closeModal();
											dispatch(handleOpenSignUpModal(true));
										}}>
										<FaArrowLeft />
									</div>
									<div className="mb-3">
										<input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email Address*" autoComplete="off" name="email" disabled value={emailStore?.signUpEmail} onChange={onInputChanged} />
									</div>
									<div className="otp-field">
										{otp.map((digit, index) => (
											<input key={index} type="number" placeholder="#" value={digit} maxLength="1" onChange={(event) => handleInputChange(index, event)} ref={inputRefs[index]} autoFocus={index === 0} />
										))}
									</div>
									<div id="emailHelp" className="text-end">
										<button type="button" className="resend" onClick={resendOtp}>
											Resend OTP
										</button>
									</div>
									<button
										type="button"
										disabled={numberString < 6}
										onClick={() => {
											verifyUser();
										}}
										className="btn cls-btn">
										Continue
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
												&nbsp;Login
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

export default SignUpOtpModal;
