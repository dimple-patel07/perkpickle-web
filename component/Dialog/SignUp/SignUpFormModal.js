import React, { useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import ChooseCardModal from "./ChooseCardModal";
import { useSelector } from "react-redux";
import { modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";

const SignUpFormModal = () => {
  const [chooseCardModalShow, setChooseCardModalShow] = useState(false);
  const ModalState = useSelector(modalSelector)
  const signUpFormModalShow = ModalState?.SignUpForm
  const dispatch = useAppDispatch()
  
  const closeModal = () => dispatch(handleCloseAllModal())
  return (
    <>
      <Dialog open={signUpFormModalShow} onClose={closeModal}>
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5 height">
              <div className="login-left">
                <h2>Sign Up</h2>
                <p>
                  JOIN WITH US TO UNLOCK <br /> MORE OFFERS
                </p>
                <Image src={images.LoginImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
              <div className="login-right">
                <form>
                  <div className="row">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                      <input
                        type="text"
                        id="inputPassword6"
                        class="form-control"
                        placeholder="Firstname"
                      />
                    </div>
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                      <input
                        type="text"
                        id="inputPassword6"
                        class="form-control"
                        placeholder="Lastname"
                      />
                    </div>
                    <div class="col-12 mt-3">
                      <input
                        type="number"
                        id="inputPassword6"
                        class="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div class="col-12 my-3">
                      <input
                        type="number"
                        id="inputPassword6"
                        class="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div class="col-12">
                      <textarea
                        class="form-control"
                        placeholder="Address"
                      ></textarea>
                    </div>
                    <div class="col-12 my-3">
                      <input
                        type="number"
                        id="inputPassword6"
                        class="form-control"
                        placeholder="Pin Code"
                      />
                    </div>
                    <div className="account d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        onClick={() => {
                          closeModal();
                          setChooseCardModalShow(true);
                        }}
                        className="btn order-1 mt-3 mb-0"
                      >
                        Continue
                      </button>
                      <p>
                        Already have an account? <span>Signin</span>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <ChooseCardModal
        isOpen={chooseCardModalShow}
        onClose={() => setChooseCardModalShow(false)}
      />
    </>
  );
};

export default SignUpFormModal;
