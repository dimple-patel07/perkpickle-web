import React from "react";
import { images } from "../Images";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";  
import { IoSearch } from "react-icons/io5";
const Savecard = ({cardData}) => { 

  return (
    <>
      <section className="savecard-section mb">
        <div className="container">
          <div className="text-center">
            <h3 className="title">Your Saved Cards</h3>
            <p className="subtitle">
              Manage more cards so we can find <br /> best offers for you
            </p>
          </div>
          <div className="savecard-inn">
            {/* <div className="row justify-content-center justify-content-sm-center justify-content-lg-start">
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardtwo} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardfive} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardthree} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardfour} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardthree} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardone} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardtwo} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardfive} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-3 col-lg-2 add-card-inn">
                <div className="text-center">
                    <div className="addcard-box">
                    <FaPlus />
                      <p>Add Card</p>
                    </div>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                <Select
                  isMulti
                  name="colors"
                  options={cardData}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder={<><IoSearch />&nbsp; Search Card Here</>}

                  
                />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-2 text-center">
               <button type="button" className="btn">Save Cards</button>
              </div>
            </div>
            {/* Save Card Show */}
            <div className="save-card-show"> 
            <div className="row gy-4">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardtwo} />
                              </div>
                              <div className="card-content">
                              <h4>Well Fargo Active Cash Card</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardone} />
                              </div>
                              <div className="card-content">
                              <h4>Chase Sapphire</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardthree} />
                              </div>
                              <div className="card-content">
                              <h4>Capital one SavorOne</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardfour} />
                              </div>
                              <div className="card-content">
                              <h4>Well Fargo Active Cash Card</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardfive} />
                              </div>
                              <div className="card-content">
                              <h4>Well Fargo Active Cash Card</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardtwo} />
                              </div>
                              <div className="card-content">
                              <h4>Well Fargo Active Cash Card</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardone} />
                              </div>
                              <div className="card-content">
                              <h4>Chase Sapphire</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardthree} />
                              </div>
                              <div className="card-content">
                              <h4>Capital one SavorOne</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardfour} />
                              </div>
                              <div className="card-content">
                              <h4>Well Fargo Active Cash Card</h4>
                              </div>
                      </div>
                   </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                   <div className="best-offer-main">
                      <div className="best-card-box">
                              <div className="card-box">
                                <Image src={images.Cardfive} />
                              </div>
                              <div className="card-content">
                              <h4>Well Fargo Active Cash Card</h4>
                              </div>
                      </div>
                   </div>
                </div>
                
                
                 
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Savecard;
