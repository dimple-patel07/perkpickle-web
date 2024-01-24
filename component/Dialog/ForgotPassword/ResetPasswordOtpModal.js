import React from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppDispatch } from "../../../redux/store";
import { handleCloseAllModal, modalSelector } from "../../../redux/modal/modalSlice";
import { useSelector } from "react-redux";

const ResetPasswordOtpModal = () => {
  const resetPasswordModal = useSelector(modalSelector).resetPassword
  const dispatch = useAppDispatch()
  const closeModal = () => dispatch(handleCloseAllModal())
  return (
    <div>
      <Dialog open={resetPasswordModal} onClose={closeModal}>
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-5 height">
              <div className="login-left">
                <h2>RESET PASSWORD</h2>
                <p>
                  Enter new and confirm password <br /> to reset your password
                </p>
                <Image src={images.LoginImg} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 position-relative height">
              <div className="login-right">
                <div className="back-arrow text-start">
                  <FaArrowLeft />
                </div>
                <form>
                  <div class="mb-3">
                    <input
                      type="Number"
                      class="form-control"
                      placeholder="New Password"
                      autoComplete="off"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="Number"
                      class="form-control"
                      placeholder="Confirm Password"
                      autoComplete="off"
                    />
                  </div>
                  <button type="button" className="btn">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ResetPasswordOtpModal;
