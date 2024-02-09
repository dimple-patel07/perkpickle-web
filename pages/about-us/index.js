import React from "react";
import BannerSection from "../../component/LandingPage/BannerSection";
import PageBanner from "../../component/pageBanner";
import commonRoute from "../../utils/commonRoute";

const AboutUs = () => {
  return (
    <>
      <PageBanner title={"About Us"} />
      <section className="contact-us-section">
        <div className="container">
          <div className="row align-items-center justify-content-center gx-5">
            Coming Soon
          </div>
        </div>
      </section>
    </>
  );
};

export default commonRoute(AboutUs);
