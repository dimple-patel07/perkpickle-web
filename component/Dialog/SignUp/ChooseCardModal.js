import React from "react";
import Dialog from "../Dialog";
import { images } from "../../Images";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const ChooseCardModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
              <div className="login-left">
                <h2>Choose Cards</h2>
                <p>
                  JOIN WITH US TO UNLOCK <br /> MORE OFFERS
                </p>
                <Image src={images.ModalBannerImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
              <div className="login-right">
                <div className="row">
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="card-box">
                      <Image src={images.Cardone} />
                      <div className="checked">
                        <FaCheckCircle />
                      </div>
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardthree} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="card-box">
                      <Image src={images.Cardfive} />
                      <div className="checked">
                        <FaCheckCircle />
                      </div>
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardtwo} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardtwo} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardfive} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardthree} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardone} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardone} />
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="modal-card-img">
                      <Image src={images.Cardthree} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-11 col-lg-11  m-auto">
                    <div className="choose-card-btn">
                      <button className="btn prev">Prev</button>
                      <button className="btn continue">Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ChooseCardModal;
