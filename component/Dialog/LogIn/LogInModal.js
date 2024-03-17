import React, { useEffect, useRef, useState } from "react";
import Dialog from "../../Dialog/Dialog";
import { images } from "../../Images";
import Image from "next/image";
import { useSelector } from "react-redux";
import { handleCloseAllModal, handleOpenForgotPasswordModal, handleOpenSignUpModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import { encryptStr, setLocalStorage } from "../../../utils/config";
import { useRouter } from "next/router";
import { handleStartLoading } from "../../../redux/loader/loaderSlice";

import { Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../TextInput";
import { postCall } from "../../../services/apiCall";
import { handleStoreToken, handleStoreUserName } from "../../../redux/emailStore/emailStoreSlice";

const LoginModal = () => {
	const ModalState = useSelector(modalSelector);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const loginModal = ModalState?.login;
	const [passwordToggle, setPasswordToggle] = useState(false);

	const firstInputRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, [loginModal]);

	const initialFormData = {
		email: "",
		password: "",
	};

	const loginEmailValidation = () =>
		yup.object().shape({
			email: yup.string().required("Please Enter Email").email("Please Enter Valid Email"),
			password: yup.string().required("Please Enter Password"),
		});

	const { handleChange, handleSubmit, handleBlur, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: loginEmailValidation,
		onSubmit: async (val) => {
			try {
				dispatch(handleStartLoading());
				const loginCred = {
					email: val?.email,
					password: val?.password,
				};
				const encryptedKey = encryptStr(JSON.stringify(loginCred));
				const response = await postCall("login", { key: encryptedKey }, dispatch, router);
				if (response?.token) {
					dispatch(handleStoreUserName(response?.userName));
					setLocalStorage("authorizationToken", response?.token);
					setLocalStorage("userName", response?.userName);
					setLocalStorage("loggedEmail", response?.email);
					dispatch(handleStoreToken(response?.token));
					router.replace("/dashboard");
					dispatch(handleCloseAllModal());
				}
			} catch (error) {
				console.error(error);
			}
		},
	});

	useEffect(() => {
		resetForm();
	}, []);

	const togglePassword = () => {
		setPasswordToggle(!passwordToggle);
	};

	return (
		<Dialog open={loginModal} onShow={() => resetForm()} onClose={() => dispatch(handleCloseAllModal())} dialogClass="login-modal py-5 py-sm-5 py-md-5 py-lg-0">
			<div className="container-fluid ps-0 pe-0 pe-sm-0">
				<div className="row align-items-center">
					<div className="col-12 col-sm-12 col-md-6 col-lg-5">
						<div className="login-left">
							<h2>Login</h2>
							<p>
								Join us to save more on <br /> your spending
								{/* JOIN WITH US TO UNLOCK <br /> MORE OFFERS */}
							</p>
							<Image src={images.ModalBannerImg} className="img-fluid" alt="banner-img" />
						</div>
					</div>
					<div className="col-12 col-sm-12 col-md-6 col-lg-7 ">
						<div className="login-right">
							<Form className="row" noValidate onSubmit={handleSubmit}>
								<TextInput controlId="emailGroup" value={values?.email} inputRef={firstInputRef} onChange={handleChange} onBlur={handleBlur} touched={touched?.email} errors={errors?.email} placeholder={"Email Address*"} type="email" name="email" restProps={{ "aria-describedby": "E-mail address" }} />
								<div className="p-0 position-relative mt-3">
									<TextInput
										controlId="passwordGroup"
										value={values?.password}
										onChange={handleChange}
										onBlur={handleBlur}
										touched={touched?.password}
										errors={errors?.password}
										placeholder={"Password*"}
										type={passwordToggle ? "text" : "password"}
										name="password"
										inputClassName="placeholder-no-fix input-password text-box single-line password"
										restProps={{ "aria-describedby": "Password field" }}
										rightIcon={{
											onRightIconPress: togglePassword,
											toggleOff: <FaEyeSlash />,
											toggleON: <FaEye />,
											state: passwordToggle,
										}}
									/>
								</div>
								<div className="col-12 text-right">
									<button
										type="button"
										onClick={() => {
											dispatch(handleCloseAllModal());
											dispatch(handleOpenForgotPasswordModal(true));
										}}
										id="emailHelp"
										className="forgot-password">
										Forgot Password?
									</button>
								</div>
								<div className="col-12">
									<button type="submit" className="cls-btn btn">
										Login
									</button>
								</div>
								<div className="account">
									<p>Don’t have an account? </p>

									<button
										className="signup"
										type="button"
										onClick={() => {
											dispatch(handleCloseAllModal());
											dispatch(handleOpenSignUpModal(true));
										}}>
										&nbsp;Sign Up&nbsp;
									</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default LoginModal;
