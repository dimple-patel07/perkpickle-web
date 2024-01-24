import React, { useState } from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import SignUpFormModal from "./SignUpFormModal";
import { handleCloseAllModal, handleOpenSignUpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../utils/config";
const SignUpOtpModal = ({ isOpen, onClose }) => {
	const ModalState = useSelector(modalSelector);
	const dispatch = useAppDispatch();

	const [userData, setUserData] = useState({
		email: "",
		otp: "",
	});

	const onInputChanged = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const verifyUser = async () => {
		try {
			const response = await axios.post(`${config.apiURL}/verifyUser`, userData);
			if (response?.data?.email) {
				console.log("user verified successfully : ", response.data.email);
				onClose();
				dispatch(handleOpenSignUpModal());
			}
		} catch (errorObj) {
			console.error(errorObj?.response?.data?.error); // error
		}
	};

	return (
		<>
			<Dialog open={isOpen} onClose={onClose}>
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-12 col-lg-5 height">
							<div className="login-left">
								<h2>Sign Up</h2>
								<p>
									JOIN WITH US TO UNLOCK <br /> MORE OFFERS
								</p>
								<Image src={images.LoginImg} className="img-fluid" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-7 position-relative height">
							<div className="login-right">
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
										Continue
									</button>
									<div className="account">
										<p>
											Already have an account? <span>Signin</span>
										</p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
			<SignUpFormModal />
		</>
	);
};

export default SignUpOtpModal;
