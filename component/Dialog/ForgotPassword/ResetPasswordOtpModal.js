import React, { useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppDispatch } from "../../../redux/store";
import { handleCloseAllModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useSelector } from "react-redux";

import axios from "axios";
import { config } from "../../../utils/config";
const ResetPasswordOtpModal = () => {
	const resetPasswordModal = useSelector(modalSelector).resetPassword;
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(handleCloseAllModal());

	const [userData, setUserData] = useState({
		email: "",
		newPassword: "",
		confirmPassword: "",
	});

	const onInputChanged = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	// reset password
	const resetPassword = async () => {
		if (userData.newPassword === userData.confirmPassword) {
			try {
				const encodedKey = window.btoa(JSON.stringify({ email: userData.email, newPassword: userData.newPassword }));
				const response = await axios.post(`${config.apiURL}/resetPassword`, { key: encodedKey });
				if (response?.data?.email) {
					console.log("reset password successfully");
				}
			} catch (errorObj) {
				console.error(errorObj?.response?.data?.error); // error
			}
		}
	};
	return (
		<div>
			<Dialog open={resetPasswordModal} onClose={closeModal}>
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-12 col-lg-5 height">
							<div className="login-left">
								<h2>RESET PASSWORD</h2>
								<p>
									Enter new and confirm password <br /> to reset your password
								</p>
								<Image src={images.LoginImg} className="img-fluid" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-7 position-relative height">
							<div className="login-right">
								<div className="back-arrow text-start">
									<FaArrowLeft />
								</div>
								<form>
									{/* read only email */}
									<div class="mb-3">
										<input type="text" class="form-control" placeholder="New Password" autoComplete="off" name="email" onChange={onInputChanged} />
									</div>
									{/* new password */}
									<div class="mb-3">
										<input type="text" class="form-control" placeholder="New Password" autoComplete="off" name="newPassword" onChange={onInputChanged} />
									</div>
									{/* confirm password */}
									<div class="mb-3">
										<input type="text" class="form-control" placeholder="Confirm Password" autoComplete="off" name="confirmPassword" onChange={onInputChanged} />
									</div>
									<button type="button" className="btn" onClick={() => resetPassword()}>
										Change Password
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default ResetPasswordOtpModal;
