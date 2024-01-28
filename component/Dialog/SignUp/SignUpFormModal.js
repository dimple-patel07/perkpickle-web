import React, { useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import ChooseCardModal from "./ChooseCardModal";
import { useSelector } from "react-redux";
import { handleCloseAllModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import axios from "axios";
import { PASSWORD_REGEX, config } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IoEyeOff } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";

const SignUpFormModal = () => {
	const [chooseCardModalShow, setChooseCardModalShow] = useState(false);
	const ModalState = useSelector(modalSelector);
	const emailStore = useSelector(emailStoreSelectore);

	const signUpFormModalShow = ModalState?.SignUpForm;
	const dispatch = useAppDispatch();

	const [userData, setUserData] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		zip_code: "",
		address: "",
		phone_number: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const onInputChanged = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleFormSubmit = async (data) => {
		const userData = {
			email: emailStore?.signUpEmail,
			first_name: data?.first_name,
			last_name: data?.last_name,
			password: data?.password,
			zip_code: data?.zip_code,
			address: data?.address,
			phone_number: data?.phone_number,
		};

		try {
			const response = await axios.post(`${config.apiURL}/updateUser`, userData);
			if (response?.data?.email) {
				closeModal();
				setChooseCardModalShow(true);
				dispatch(
					handleShowWarnModal({
						isShow: true,
						modelType: "success",
						modelMessage: "account created successfully",
					})
				);
			}
		} catch (errorObj) {
			dispatch(
				handleShowWarnModal({
					isShow: true,
					modelType: "error",
					modelMessage: errorObj?.response?.data?.error,
				})
			);
		}
	};

	const closeModal = () => dispatch(handleCloseAllModal());
	return (
		<>
			<Dialog open={signUpFormModalShow} onClose={() => dispatch(handleCloseAllModal())}>
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5">
							<div className="login-left">
								<h2>Sign Up</h2>
								<p>
									JOIN WITH US TO UNLOCK <br /> MORE OFFERS
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-7">
							<div className="login-right signup-form">
								<form onSubmit={handleSubmit(handleFormSubmit)}>
									<div className="row">
										<div className="col-6 col-sm-6 col-md-6 col-lg-6">
											<input type="text" className="form-control" placeholder="First name" maxLength={250} />
											<ErrorMessage className="error" errors={errors} name="first_name" as="p" />
										</div>
										{/* last name */}
										<div className="col-6 col-sm-6 col-md-6 col-lg-6">
											<input type="text" className="form-control" placeholder="Last name" maxLength={250} />
											<ErrorMessage className="error" errors={errors} name="last_name" as="p" />
										</div>
										{/* password */}
										<div className="col-12 mt-3 position-relative">
											<input
												type={showPassword ? "text" : "password"}
												className="form-control"
												placeholder="Password should be at least 8 characters, with a symbol or letter"
												{...register("password", {
													required: "Please Enter Password",
													pattern: {
														value: PASSWORD_REGEX,
														message: "Password should be at least 8 characters, with a symbol or letter",
													},
												})}
												maxLength={250}
											/>
											<span className={`eye-icon ${showPassword ? "show" : "hide"}`} onClick={handleTogglePassword}>
												{showPassword ? <IoEyeOff /> : <TiEye />}
											</span>
										</div>
										<ErrorMessage errors={errors} name="password" className="error" as="p" />
										{/* zip code */}
										<div className="col-12 my-3">
											<input
												type="text"
												className="form-control"
												placeholder="zip Code"
												{...register("zip_code", {
													required: "Please Enter zip Code",
												})}
												maxLength={250}
											/>
											<ErrorMessage className="error" errors={errors} name="zip_code" as="p" />
										</div>
										{/* address */}
										<div className="col-12">
											<textarea className="form-control" placeholder="Address" name="address" onChange={onInputChanged}></textarea>
										</div>
										{/* phone number */}
										<div className="col-12 my-3">
											<input type="text" className="form-control" placeholder="Phone Number" maxLength={250} />
											<ErrorMessage className="error" errors={errors} name="phone_number" as="p" />
										</div>
										<div className="account d-flex justify-content-between align-items-center">
											<button type="submit" className="btn order-1 mt-3 mb-0 cls-btn">
												Continue
											</button>
											<p>
												Already have an account? <span>Signin</span>
											</p>
										</div>
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

export default SignUpFormModal;
