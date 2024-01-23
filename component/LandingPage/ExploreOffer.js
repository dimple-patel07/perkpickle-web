import React, { useState } from "react";
import { images } from "../Images";
import Image from "next/image";
import Form from "react-bootstrap/Form";

const ExploreOffer = () => {
  const [selectedOffer,  setselectedOffer] = useState("Select any fruit");
  const [selectedName,  setselectedName] = useState("Select any fruit");
  const handleOffer = (e) => {
    setselectedOffer(e.target.value);
  };
  const handleName = (e) => {
    setselectedName(e.target.value);
  };
  return (
    <section className="explore-offer-section mb">
      <div className="container">
        <div className="text-center">
          <h3 className="title">Explore Offers</h3>
          <p className="subtitle">
            Select your cards to unlock more offers <br /> for different
            categories
          </p>
        </div>
        {/* Offer Input Start */}
        <div className="explore-offer-inn">
          {/* <div className="row align-align-items-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <form>
              <div className="form-group d-flex gap-3">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Shopping"
                />
            <button className="btn">Search</button>
              </div>
            </form>
          </div>
        </div> */}
        </div>
        {/* Offer Input End */}

        {/* Card-Type Star */}
        {/* <div className="card-type-section"> 
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4 mb-sm-4 mb-md-4 mb-lg-0">
                    <div className="card-type-box">
                          <div className="card-box">
                          <Image src={images.Cardfour} className="img-fluid" />
                          </div> 
                          <p>Visa Card</p>
                          <div className="position-relative">
                          <Image src={images.star} className="img-fluid" />
                          <span className="percent">25%</span>
                          </div> 
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="card-type-box">
                          <div className="card-box">
                          <Image src={images.Cardfive} className="img-fluid" />
                          </div> 
                          <p>Forex Card</p>
                          <div className="position-relative">
                          <Image src={images.star} className="img-fluid" />
                          <span className="percent">10%</span>
                          </div> 
                    </div>
                </div>
            </div>
        </div> */}
        {/* Card-Type End */}

        {/* New Design Card Explore */}
        <div className="explore-offer-dropdown">
        <div className="row gy-4">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3">
            <Form.Select value={selectedOffer} onChange={handleOffer}>
              <option>Check Offer</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
              <option value="Five">Five</option>
            </Form.Select>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-7">
            <Form.Select value={selectedName} onChange={handleName}>
              <option>Check Name</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
              <option value="Five">Five</option>
            </Form.Select>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-2  text-center">
            <button type="button" className="btn">
              Check Offer
            </button>
          </div>
        </div>
        </div>
        {/* New Design Card Explore */}
      </div>
    </section>
  );
};

export default ExploreOffer;
