import React, { useState } from "react";
import Dialog from "../../Dialog/Dialog";
import { images } from "../../Images";
import Image from "next/image";
import SignUpModal from "../SignUp/SignUpModal";
import ForgotPasswordModal from "../ForgotPassword/ForgotPasswordModal";

const LoginModal = ({ isOpen, onClose }) => {
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [forgotPasswordModalShow, setForgotPasswordModalShow] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="container-fluid ps-0 pe-0 pe-sm-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
              <div className="login-left">
                <h2>LOGIN</h2>
                <p>
                  JOIN WITH US TO UNLOCK <br /> MORE OFFERS
                </p>
                <Image src={images.LoginImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
              <div className="login-right">
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      autoComplete="off"
                    />
                  </div>
                  <div class="mb-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off"/>
                  </div>
                  <button type="button" onClick={() => { onClose(); setForgotPasswordModalShow(true);}} id="emailHelp" class="forgot-password">
                    Forgot Password?
                  </button>
                  <button type="button" className="cls-btn btn">
                    Sign In
                  </button>
                  <div className="account">
                    <p>Don’t have an account? </p>

                    <button className="signup" type="button" onClick={() => { onClose(); setSignUpModalShow(true); }}> Sign Up </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <SignUpModal
        isOpen={signUpModalShow}
        onClose={() => setSignUpModalShow(false)}
      />
      <ForgotPasswordModal
        isOpen={forgotPasswordModalShow}
        onClose={() => setForgotPasswordModalShow(false)}
      />
    </>
  );
};

export default LoginModal;
