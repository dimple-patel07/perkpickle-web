import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { images } from "../../component/Images";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../component/TextInput";
import { Form } from "react-bootstrap";
import PageBanner from "../../component/pageBanner";
import { EMAIL_REGEX, config, getLoggedEmail } from "../../utils/config";
import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import { handleStartLoading, showMessage } from "../../redux/loader/loaderSlice";
import { defaultMessageObj } from "../../utils/config";
import { postCall } from "../../services/apiCall";
import { useRouter } from "next/router";
import commonRoute from "../../utils/commonRoute";
import { useSelector } from "react-redux";
import { emailStoreSelectore } from "../../redux/emailStore/emailStoreSlice";

const ContactUs = () => {
	const firstInputRef = useRef(null);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const token = useSelector(emailStoreSelectore)?.token;
	useEffect(() => {
		setTimeout(() => {
			firstInputRef?.current?.focus();
		}, 500);
	}, []);

	const initialFormData = {
		name: "",
		email: token ? getLoggedEmail() : "",
		subject: "",
		message: "",
	};

	const contactUsFormValidation = () =>
		yup.object().shape({
			name: yup
				.string()
				.required("please enter your name")
				.trim()
				.matches(/^[A-Za-z ]*$/, "please enter valid name")
				.max(30),
			email: yup.string().required("Please enter email").matches(EMAIL_REGEX, "Please enter valid email").max(30),
			subject: yup.string().required("please enter subject").trim().max(30),
		});

	const { handleChange, handleSubmit, handleBlur, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: contactUsFormValidation,
		onSubmit: async (data) => {
			try {
				dispatch(handleStartLoading());
				const response = await postCall("contactMail", data, dispatch, router);
				if (response?.message) {
					dispatch(
						showMessage({
							...defaultMessageObj,
							type: "success",
							messageText: response.message,
						})
					);
					resetForm();
				}
			} catch (error) {
				console.error(error);
			}
		},
	});

	useEffect(() => {
		resetForm();
	}, []);

	return (
		<>
			{/* Banner Section  */}
			<PageBanner title={"Contact Us"} description={"We're Here to Help Feel free to contact us for any inquiries, feedback, or assistance you may need. We welcome your questions and comments. Please connect with our support team and let us assist you promptly."} />

			{/* Contact Form Start */}
			<section className="contact-us-section">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5">
							<div className="contact-text">
								<h4>How Can We Help You?</h4>
								<p>Please fill up the form with all the details and our support team will reach out to you as soon as possible.</p>

								<div className="contact-text-box">
									<div className="contact-text-inn">
										<div className="contact-icon">
											<Image src={images.ContactIcon} alt="contact-icn" />
										</div>
										<div className="contact-description">
											<strong>Email</strong>
											<p>support@perkpickle.com</p>
										</div>
									</div>
								</div>

								{/* <div className="contact-text-box mt-4">
									<div className="contact-text-inn">
										<div className="contact-icon">
											<Image src={images.LocationIcon} alt="loc-icon" />
										</div>
										<div className="contact-description">
											<strong>Our Location</strong>
											<p>762 Durgan Road, Lake Enidchester, TN 14712</p>
										</div>
									</div>
								</div> */}
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-6">
							<div className="contact-form">
								<Form noValidate onSubmit={handleSubmit}>
									<div className="row gy-4 gy-sm-3 gy-md-4 gy-lg-4">
										<div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
											<TextInput
												controlId="name"
												inputRef={firstInputRef}
												value={values?.name}
												onChange={handleChange}
												onBlur={handleBlur}
												touched={touched?.name}
												errors={errors?.name}
												// formGroupClassName="mb-4 pt-3 pb-3"
												placeholder={"Your Name*"}
												type="text"
												name="name"
												restProps={{ "aria-describedby": "your Name" }}
											/>
										</div>

										<div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
											<TextInput
												controlId="email"
												value={values?.email}
												onChange={handleChange}
												onBlur={handleBlur}
												touched={touched?.email}
												errors={errors?.email}
												// formGroupClassName="mb-4 pt-3 pb-3"
												disabled={token ? true : false}
												placeholder={"Email Address*"}
												type="text"
												name="email"
												restProps={{ "aria-describedby": "email-address" }}
											/>
										</div>

										<div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
											<TextInput
												controlId="subject"
												value={values?.subject}
												onChange={handleChange}
												onBlur={handleBlur}
												touched={touched?.subject}
												errors={errors?.subject}
												// formGroupClassName="mb-4 pt-3 pb-3"
												placeholder={"Subject*"}
												type="text"
												name="subject"
												restProps={{ "aria-describedby": "subject" }}
											/>
										</div>
										{/* description */}
										<div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
											<textarea type="text" placeholder="Description" className="form-control" value={values?.message} onChange={handleChange} onBlur={handleBlur} name="message" />
										</div>

										<div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
											<button type="submit" className="btn">
												Send Message
											</button>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Contact Form End */}
		</>
	);
};

export default commonRoute(ContactUs);
