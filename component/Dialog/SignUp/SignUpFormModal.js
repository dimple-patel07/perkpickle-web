import React, { useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenLoginModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import InputMask from "react-input-mask";
import axios from "axios";
import { PASSWORD_REGEX, PHONE_NUMBER_REGEX, config, encryptStr } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IoEyeOff } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { handleShowWarnModal } from "../../../redux/warnModel/warnModelSlice";
import { handleStartLoading, handleStopLoading } from "../../../redux/loader/loaderSlice";

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
		trigger,
	} = useForm();

	const handleFormSubmit = async (data) => {
		const userData = {
			email: emailStore.signUpEmail,
			first_name: data.first_name,
			last_name: data.last_name,
			secret_key: encryptStr(data.password),
			zip_code: data.zip_code,
			address: data?.address,
			phone_number: data?.phone_number,
		};

		try {
			dispatch(handleStartLoading());
			const response = await axios.post(`${config.apiURL}/updateUser`, userData);
			if (response?.data?.email) {
				dispatch(handleStopLoading());
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

	const handleBlur = async (fieldName) => await trigger(fieldName);
	const handleOnChange = async (fieldName) => await trigger(fieldName);

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
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-7">
							<div className="login-right signup-form">
								<form onSubmit={handleSubmit(handleFormSubmit)}>
									<div className="row">
										<div className="col-6 col-sm-6 col-md-6 col-lg-6">
											<input
												type="text"
												className={`form-control ${errors.first_name ? "error-input" : ""}`}
												placeholder="First Name*"
												{...register("first_name", {
													required: "Please Enter First Name",
													onChange: () => handleOnChange("first_name"),
													maxLength: {
														value: 30,
														message: "Last Name should not exceed 30 characters",
													},
													minLength: {
														value: 3,
														message: "Please enter more than 3 characters",
													},
												})}
												onBlur={() => handleBlur("first_name")}
											/>
											<ErrorMessage className="error" errors={errors} name="first_name" as="p" />
										</div>
										{/* last name */}
										<div className="col-6 col-sm-6 col-md-6 col-lg-6">
											<input
												type="text"
												className={`form-control ${errors.last_name ? "error-input" : ""}`}
												placeholder="Last Name*"
												{...register("last_name", {
													required: "Please Enter Last Name",
													onChange: () => handleOnChange("last_name"),
													maxLength: {
														value: 30,
														message: "Last Name should not exceed 30 characters",
													},
													minLength: {
														value: 3,
														message: "Please enter more than 3 characters",
													},
												})}
												onBlur={() => handleBlur("last_name")}
											/>
											<ErrorMessage className="error" errors={errors} name="last_name" as="p" />
										</div>
										{/* password */}
										<div className="col-12 mt-3 position-relative">
											<input
												type={showPassword ? "text" : "password"}
												className={`form-control ${errors.password ? "error-input" : ""}`}
												placeholder="Password*"
												{...register("password", {
													onChange: () => handleOnChange("password"),
													required: "Please Enter Password",
													pattern: {
														value: PASSWORD_REGEX,
														message: "Password should be at least 8 characters, with a symbol or letter.",
													},
												})}
												onBlur={() => handleBlur("password")}
												maxLength={30}
											/>
											<span className={`eye-icon ${showPassword ? "show" : "hide"}`} onClick={handleTogglePassword}>
												{showPassword ? <IoEyeOff /> : <TiEye />}
											</span>
										</div>
										<ErrorMessage errors={errors} name="password" className="error" as="p" />
										{/* zip code */}
										<div className="col-12 my-3">
											<input
												type="number"
												className={`form-control ${errors.zip_code ? "error-input" : ""}`}
												placeholder="Zip Code*"
												{...register("zip_code", {
													required: "Please Enter Zip Code.",
													onChange: () => handleOnChange("zip_code"),
													maxLength: {
														value: 5,
														message: "Please Enter Valid Zip code",
													},
													minLength: {
														value: 5,
														message: "Please Enter Valid Zip Code",
													},
												})}
												maxLength={5}
												onBlur={() => handleBlur("zip_code")}
											/>
											<ErrorMessage className="error" errors={errors} name="zip_code" as="p" />
										</div>
										{/* address */}
										<div className="col-12">
											<textarea className="form-control" placeholder="Address" name="address" onChange={onInputChanged}></textarea>
										</div>
										{/* phone number */}
										<div className="col-12 my-3">
											<InputMask
												className="form-control"
												mask="(999) 999-9999"
												placeholder="Phone Number"
												{...register("phone_number", {
													onChange: () => handleOnChange("phone_number"),
													// required: "",
													// pattern: {
													//   value: PHONE_NUMBER_REGEX,
													//   message: "",
													// },
												})}
												onBlur={() => handleBlur("phone_number")}
											/>
											<ErrorMessage className="error" errors={errors} name="phone_number" as="p" />
										</div>
										<div className="account d-flex justify-content-between align-items-center">
											<button type="submit" className="btn order-1 mt-3 mb-0 cls-btn">
												Continue
											</button>
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
