import Image from "next/image";
import React from "react";
import { images } from "../../component/Images";
import Footer from "../../component/footer";

const ContactUs = () => {
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
                  alt=""
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
            <div className="col-12 col-sm-12 col-md-5 col-lg-5">
              <div className="contact-text">
                <h4>How Can We Help You?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet{" "}
                </p>

                <div className="contact-text-box">
                  <div className="contact-text-inn">
                    <div className="contact-icon">
                      <Image src={images.ContactIcon} />
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
                      <Image src={images.LocationIcon} />
                    </div>
                    <div className="contact-description">
                      <strong>Our Location</strong>
                      <p>
                      762 Durgan Road, Lake Enidchester, TN 14712
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="contact-form">
              <form>    
          <div className='row gy-4 gy-sm-3 gy-md-4 gy-lg-4'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
              <input type='text' placeholder='Your Name' className='form-control' />
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
            <input type='text' placeholder='Email Address' className='form-control' />
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
            <input type='text' placeholder='Subject' className='form-control' />
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
            <textarea type='text' placeholder='Address' className='form-control' />
            </div>

            <div className='col-12 col-sm-12 col-md-12 col-lg-12 text-center'>
           <button type="button" className='btn'>Send Message</button>
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
