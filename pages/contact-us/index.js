import Image from "next/image";
import React from "react";
import { images } from "../../component/Images";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { EMAIL_REGEX } from "../../utils/config";

const ContactUs = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
  } = useForm();

  const handleBlur = async (fieldName) => await trigger(fieldName);
  const handleOnChange = async (fieldName) => await trigger(fieldName);

  const handleFormSubmit = async (data) => {};
  return (
    <>
      {/* Banner Section  */}
      <section className="banner-section">
        <div className="container">
          <div className="banner-main">
            <div className="row align-items-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
                <div className="banner-text">
                  <h1>Contact Us</h1>
                  <p>
                    lorem ipsum getiing dummy data lorem ipsum getiing dummy
                    datalorem ipsum getiing dummy datalorem ipsum getiing dummy
                    datalorem
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <Image
                  src={images.ContactBannerImg}
                  alt="contact-img"
                  width={544}
                  height={544}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Start */}
      <section className="contact-us-section">
        <div className="container">
          <div className="row align-items-center justify-content-center gx-5">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
              <div className="contact-text">
                <h4>How Can We Help You?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet{" "}
                </p>

                <div className="contact-text-box">
                  <div className="contact-text-inn">
                    <div className="contact-icon">
                      <Image src={images.ContactIcon} alt="contact-icn"/>
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
                      <Image src={images.LocationIcon} alt="loc-icon"/>
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
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="row gy-4 gy-sm-3 gy-md-4 gy-lg-4">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.your_name
                           ? "error-input"
                           : ""
                       }`}
                        placeholder="Your Name*"
                        {...register("your_name", {
                          required: "Please Enter Your Name",
                          onChange: () => handleOnChange("your_name"),
                          maxLength: {
                            value: 30,
                            message:
                              "Last Name should not exceed 30 characters",
                          },
                          minLength: {
                            value: 3,
                            message: "Please enter more than 3 characters",
                          },
                        })}
                        onBlur={() => handleBlur("your_name")}
                      />
                      <ErrorMessage
                        className="error"
                        errors={errors}
                        name="your_name"
                        as="p"
                      />
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.emailAddress
                           ? "error-input"
                           : ""
                       }`}
                        placeholder="Email Address*"
                        {...register("emailAddress", {
                          onChange: () => handleOnChange("emailAddress"),
                          required: "Please Enter Email Address",
                          pattern: {
                            value: EMAIL_REGEX,
                            message: "Invalid Email Address",
                          },
                        })}
                        maxLength={250}
                        onBlur={() => handleBlur("emailAddress")}
                      />
                      <ErrorMessage
                        className="error"
                        errors={errors}
                        name="emailAddress"
                        as="p"
                      />
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.subject
                           ? "error-input"
                           : ""
                       }`}
                        placeholder="Subject*"
                        {...register("subject", {
                          onChange: () => handleOnChange("subject"),
                          required: "Please Enter Subject",
                          maxLength: {
                            value: 30,
                            message:
                              "Last Name should not exceed 30 characters",
                          },
                          minLength: {
                            value: 3,
                            message: "Please enter more than 3 characters",
                          },
                        })}
                        onBlur={() => handleBlur("subject")}
                      />
                      <ErrorMessage
                        className="error"
                        errors={errors}
                        name="subject"
                        as="p"
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <textarea
                        type="text"
                        placeholder="Address"
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                      <button type="submit" className="btn">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
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
