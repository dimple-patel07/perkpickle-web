import React from "react";
import { images } from "./Images";
import Image from "next/image";

const ScreenBanner = () => {
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
                  <p>
                    lorem ipsum getiing dummy data lorem ipsum getiing dummy
                    datalorem ipsum getiing dummy datalorem ipsum getiing dummy
                    datalorem
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <Image
                  src={images.profileBannerImg}
                  width={544}
                  height={544}
                  className="img-fluid"
                />
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
            <form>
              <div className="row gy-4 gy-sm-3 gy-md-4 gy-lg-5">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <textarea
                    type="text"
                    placeholder="Address"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <input
                    type="number"
                    placeholder="PinCode"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-sm-center text-md-start text-lg-start">
                  <button type="button" className="btn">
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScreenBanner;
