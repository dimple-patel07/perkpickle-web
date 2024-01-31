import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { images } from "../../component/Images";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../component/TextInput";
import { Form } from "react-bootstrap";
import PageBanner from "../../component/pageBanner";
import { config } from "../../utils/config";
import axios from "axios";

const ContactUs = () => {
	const firstInputRef = useRef(null);

	useEffect(() => {
		firstInputRef?.current?.focus();
	}, []);

	const initialFormData = {
		name: "",
		email: "",
		subject: "",
		message: "",
	};

	const signInFormValidation = () =>
		yup.object().shape({
			name: yup.string().required("Please Enter Your Name"),
			email: yup.string().required("Please Enter Email").email("Please Enter Valid Email"),
			subject: yup.string().required("Please Enter Subject"),
		});

	const { handleChange, handleSubmit, handleBlur, values, touched, errors, resetForm } = useFormik({
		initialValues: initialFormData,
		validationSchema: signInFormValidation,
		onSubmit: async (data) => {
			try {
				await axios.post(`${config.apiURL}/contactMail`, data);
			} catch (error) {
				console.error("contact request failed :: ", error);
			}
		},
	});

	useEffect(() => {
		resetForm();
	}, []);

	return (
		<>
			{/* Banner Section  */}
			<PageBanner title={"Contact Us"} />

			{/* Contact Form Start */}
			<section className="contact-us-section">
				<div className="container">
					<div className="row align-items-center justify-content-center gx-5">
						<div className="col-12 col-sm-12 col-md-6 col-lg-5">
							<div className="contact-text">
								<h4>How Can We Help You?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet </p>

								<div className="contact-text-box">
									<div className="contact-text-inn">
										<div className="contact-icon">
											<Image src={images.ContactIcon} alt="contact-icn" />
										</div>
										<div className="contact-description">
											<strong>Email & Phone</strong>
											<p>asdsda@gmail.com</p>
											<p>+91 34 343 34343</p>
										</div>
									</div>
								</div>

								<div className="contact-text-box mt-4">
									<div className="contact-text-inn">
										<div className="contact-icon">
											<Image src={images.LocationIcon} alt="loc-icon" />
										</div>
										<div className="contact-description">
											<strong>Our Location</strong>
											<p>762 Durgan Road, Lake Enidchester, TN 14712</p>
										</div>
									</div>
								</div>
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
										<div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
											<textarea type="text" placeholder="Address" className="form-control" value={values?.message} onChange={handleChange} onBlur={handleBlur} name="message" />
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

export default ContactUs;
