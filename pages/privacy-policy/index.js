import React from "react";
import PageBanner from "../../component/pageBanner";
import commonRoute from "../../utils/commonRoute";

const PrivacyPolicy = () => {
  return (
    <>
      <PageBanner title={"Privacy Policy"} />
      <section className="contact-us-section">
        <div className="container">
          <div className="row align-items-center justify-content-center gx-5">
            Comming Soon
          </div>
        </div>
      </section>
    </>
  );
};

export default commonRoute(PrivacyPolicy);
