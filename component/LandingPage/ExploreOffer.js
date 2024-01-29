import React, { useState } from "react";
import { images } from "../Images";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const ExploreOffer = ({ spendBonusCategoryList }) => {
  const [selectedOffer, setselectedOffer] = useState("Select any fruit");
  const [selectedName, setselectedName] = useState("Select any fruit");
  const [selectedCatagories, setSelectedCatagories] = useState();
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
        <div className="explore-offer-inn"></div>

        {/* New Design Card Explore */}
        <div className="explore-offer-dropdown">
          <div className="row gy-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              {/* <Form.Select value={selectedOffer} onChange={handleOffer}>
                <option>Check Offer</option>
                {spendBonusCategoryList?.map((item) => (
                  <option value={item?.value} key={item?.label}>
                    {item?.label}
                  </option>
                ))}
              </Form.Select> */}
              <Select
                name="checkoffer"
                options={spendBonusCategoryList}
                className="form-select"
                onChange={(val) => setSelectedCatagories(val?.categoryChildrenList)}
                classNamePrefix="select"
                placeholder={"Select Group"}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-7">
            <Select
                name="checkoffer"
                options={selectedCatagories || []}
                className="form-select"
                onChange={(val) => console.log(val)}
                classNamePrefix="select"
                placeholder={"Check Category"}
              /> 
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
