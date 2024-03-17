import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { images } from "../../component/Images";
import Image from "next/image";
import { getLoggedEmail, defaultMessageObj, setLocalStorage, NAME_REGEX, DIGIT_REGEX } from "../../utils/config";
import { useAppDispatch } from "../../redux/store";
import { handleStartLoading, showMessage } from "../../redux/loader/loaderSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../component/TextInput";
import { FloatingLabel, Form } from "react-bootstrap";
import { postCall } from "../../services/apiCall";
import { useRouter } from "next/router";
import { handleStoreUserName } from "../../redux/emailStore/emailStoreSlice";
import withAuth from "../../utils/withAuth";

const Profile = () => {
	const dispatch = useAppDispatch();
	const [userData, setUserData] = useState();
	const firstInputRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		getUserByEmail();
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, []);

	const getUserByEmail = async () => {
		try {
			// dispatch(handleStartLoading());
			const params = { email: getLoggedEmail() };
			const response = await postCall("getUserByEmail", params, dispatch, router);
			firstInputRef?.current?.focus();
			if (response?.email) {
				setUserData(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const initialFormData = {
		emailAddress: "",
		first_name: "",
		last_name: "",
		zip_code: "",
		address: "",
		phone_number: "",
	};

	const signInFormValidation = () =>
		yup.object().shape({
			first_name: yup.string().required("Please Enter First Name").trim().matches(NAME_REGEX, "Please enter valid first name").max(30),
			last_name: yup.string().required("Please Enter Last Name").trim().matches(NAME_REGEX, "Please enter valid last name").max(30),
			zip_code: yup.string().required("Please Enter Zip Code").matches(DIGIT_REGEX, "Must be only digits").min(5, "Must be exactly 5 digits").max(5, "Must be exactly 5 digits"),
		});

	const { handleChange, handleSubmit, handleBlur, setFieldValue, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: signInFormValidation,
		onSubmit: async (data) => {
			const params = {
				...userData,
				email: data.emailAddress || userData?.email,
				first_name: data.first_name,
				last_name: data.last_name,
				phone_number: data.phone_number,
				zip_code: data.zip_code,
				address: data.address,
			};
			const userName = data.first_name + " " + data.last_name;

			try {
				dispatch(handleStartLoading());
				const response = await postCall("updateUser", params, dispatch, router);
				if (response?.email) {
					getUserByEmail();
					dispatch(handleStoreUserName(userName));
					setLocalStorage("userName", userName);
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

	useEffect(() => {
		resetForm();
	}, []);

	useEffect(() => {
		if (userData) {
			setFieldValue("email", userData?.email);
			setFieldValue("first_name", userData?.first_name);
			setFieldValue("last_name", userData?.last_name);
			setFieldValue("phone_number", userData?.phone_number);
			setFieldValue("zip_code", userData?.zip_code);
			setFieldValue("address", userData?.address);
		}
	}, [userData]);

	return (
		<>
			{/* Banner Start */}
			<section className="banner-section">
				<div className="container">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
									<h1>
										Edit Your <br /> Profile Details
									</h1>
									<p>Update your profile to tailor your experience, manage your information for a seamless and customized user journey.</p>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-6">
								<Image src={images.profileBannerImg} width={544} height={544} className="img-fluid" alt="profileBannerImg" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/*  Banner End */}

			{/* ScreenBanner Form Start */}
			<section className="screenbanner-form">
				<div className="container">
					<div className="banner-form">
						<Form noValidate onSubmit={handleSubmit}>
							<div className="row gy-4 gy-sm-3 gy-md-4">
								<div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
									<TextInput controlId="email-controler" value={values?.email || ""} disabled placeholder="Email*" type="email" name="email" restProps={{ "aria-describedby": "email-form" }} />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
									<FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
										<InputMask className="form-control" mask="(999) 999-9999" placeholder="" value={values?.phone_number} onChange={handleChange} onBlur={handleBlur} name="phone_number" />
									</FloatingLabel>
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
									<TextInput controlId="firstname" value={values?.first_name} inputRef={firstInputRef} onChange={handleChange} onBlur={handleBlur} touched={touched?.first_name} errors={errors?.first_name} placeholder="First Name*" type="text" name="first_name" maxLength={50} restProps={{ "aria-describedby": "First Name" }} />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
									<TextInput controlId="lastname" value={values?.last_name} onChange={handleChange} onBlur={handleBlur} touched={touched?.last_name} errors={errors?.last_name} placeholder="Last Name*" type="text" name="last_name" maxLength={50} restProps={{ "aria-describedby": "Last Name" }} />
								</div>

								<div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
									<TextInput controlId="address" value={values?.address} onChange={handleChange} onBlur={handleBlur} touched={touched?.address} errors={errors?.address} inputType="textarea" placeholder={"Address"} type="text" name="address" maxLength={200} restProps={{ "aria-describedby": "address" }} />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
									<TextInput controlId="zipcode" value={values?.zip_code} onChange={handleChange} onBlur={handleBlur} touched={touched?.zip_code} errors={errors?.zip_code} placeholder="Zip Code*" type="text" maxLength={5} name="zip_code" restProps={{ "aria-describedby": "zip code" }} />
								</div>

								<div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-sm-center text-md-start text-lg-start">
									<button type="submit" className="btn">
										Update Profile
									</button>
								</div>
							</div>
						</Form>
					</div>
				</div>
			</section>
		</>
	);
};

export default withAuth(Profile);
