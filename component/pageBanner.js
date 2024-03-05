import Image from "next/image";
import React from "react";
import { images } from "./Images";

const PageBanner = ({ title }) => {
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-main">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
              <div className="banner-text">
                <h1>{title}</h1>
                <p>
                PerkPickle provides cutting-edge solutions to individuals looking to maximize their earnings while spending. Each credit card comes with its reward, and we aim to ensure that you earn as many points as possible.
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
  );
};

export default PageBanner;
