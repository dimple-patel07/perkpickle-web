import React, { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenLoginModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import InputMask from "react-input-mask";
import { PASSWORD_REGEX, config, encryptStr, defaultMessageObj } from "../../../utils/config";
import { emailStoreSelectore } from "../../../redux/emailStore/emailStoreSlice";

import * as yup from "yup";
import { handleStartLoading, showMessage } from "../../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import TextInput from "../../TextInput";
import { FloatingLabel, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postCall } from "../../../services/apiCall";

const SignUpFormModal = () => {
	const ModalState = useSelector(modalSelector);
	const emailStore = useSelector(emailStoreSelectore);

	const signUpFormModalShow = ModalState?.SignUpForm;
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(handleCloseAllModal());
	const [passwordToggle, setPasswordToggle] = useState(false);

	const firstInputRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, [signUpFormModalShow]);

	const initialFormData = {
		first_name: "",
		last_name: "",
		password: "",
		zip_code: "",
		address: "",
		phone_number: "",
	};

	const signInFormValidation = () =>
		yup.object().shape({
			first_name: yup.string().required("Please Enter First Name"),
			last_name: yup.string().required("Please Enter Last Name"),
			zip_code: yup.string().required("Please Enter Zip Code"),
			password: yup.string().required("Please Enter Password").matches(PASSWORD_REGEX, "Password must contain more than 8 characters, 1 upper case letter, and 1 special character"),
		});

	const { handleChange, handleSubmit, handleBlur, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: signInFormValidation,
		onSubmit: async (data) => {
			const userData = {
				email: emailStore.signUpEmail,
				first_name: data.first_name,
				last_name: data.last_name,
				secret_key: encryptStr(data.password),
				zip_code: data.zip_code,
				address: data?.address,
				phone_number: data?.phone_number,
				is_signup_completed: true, // only update once on signup form completion
			};
			try {
				dispatch(handleStartLoading());
				const response = await postCall("completeUserSignup", userData, dispatch);
				if (response?.email) {
					closeModal();
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

	const togglePassword = () => {
		setPasswordToggle(!passwordToggle);
	};

	return (
		<>
			<Dialog open={signUpFormModalShow} onShow={() => resetForm()} onClose={() => dispatch(handleCloseAllModal())} dialogClass="signup-modal-main">
				<div className="container-fluid p-0">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5 pe-lg-0 pe-md-0">
							<div className="login-left">
								<h2>Sign Up</h2>
								<p className="order-1">
									JOIN WITH US TO UNLOCK <br /> MORE OFFERS
								</p>
								<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-7 ps-0">
							<div className="login-right">
								<Form noValidate autoComplete="off" onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-12 col-sm-12 col-md-12 col-lg-6">
											<TextInput controlId="first_name" value={values?.first_name} inputRef={firstInputRef} onChange={handleChange} onBlur={handleBlur} touched={touched?.first_name} errors={errors?.first_name} placeholder={"First Name*"} type="text" name="first_name" maxLength={50} restProps={{ "aria-describedby": "First Name" }} />
										</div>
										<div className="col-12 col-sm-12 col-md-12 col-lg-6">
											<TextInput controlId="last_name" value={values?.last_name} onChange={handleChange} onBlur={handleBlur} touched={touched?.last_name} errors={errors?.last_name} placeholder={"Last Name*"} type="text" name="last_name" maxLength={50} restProps={{ "aria-describedby": "Last Name" }} />
										</div>
										{/* password */}
										<div className="col-12 col-sm-12 position-relative cls-password">
											<TextInput
												controlId="passwordGroup"
												value={values?.password}
												onChange={handleChange}
												onBlur={handleBlur}
												touched={touched?.password}
												errors={errors?.password}
												autoComplete="new-password"
												// formGroupClassName="mb-4"
												placeholder={"Password*"}
												type={passwordToggle ? "text" : "password"}
												name="password"
												inputClassName="placeholder-no-fix input-password text-box single-line password"
												restProps={{ "aria-describedby": "Password field" }}
												errorClass={"signup-password"}
												rightIcon={{
													onRightIconPress: togglePassword,
													toggleOff: <FaEyeSlash />,
													toggleON: <FaEye />,
													state: passwordToggle,
												}}
											/>
										</div>
										<div className="col-12 col-sm-12">
											<TextInput
												controlId="zipcode"
												value={values?.zip_code}
												onChange={handleChange}
												onBlur={handleBlur}
												touched={touched?.zip_code}
												errors={errors?.zip_code}
												// formGroupClassName="mb-4 pt-3 pb-3"
												placeholder={"Zip Code*"}
												type="text"
												maxLength={5}
												name="zip_code"
												restProps={{ "aria-describedby": "zip code" }}
											/>
										</div>
										<div className="col-12">
											<TextInput controlId="address" value={values?.address} onChange={handleChange} onBlur={handleBlur} touched={touched?.address} errors={errors?.address} inputType="textarea" placeholder={"Address"} type="text" name="address" maxLength={200} restProps={{ "aria-describedby": "address" }} />
										</div>
										<div className="col-12">
											<FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
												<InputMask className="form-control" mask="(999) 999-9999" placeholder="" value={values?.phone_number} onChange={handleChange} onBlur={handleBlur} name="phone_number" />
											</FloatingLabel>
										</div>
										<div className="account d-flex justify-content-between align-items-center">
											<button type="submit" className="btn order-1 cls-btn signup-btn">
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
								</Form>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default SignUpFormModal;
