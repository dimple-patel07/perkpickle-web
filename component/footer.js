import Image from "next/image";
import React from "react";
import { images } from "./Images";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { TfiFacebook, TfiLinkedin } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="footer-logo">
              <Image src={images.FooterLogo} />
              <p>lorem ipsum dummy text lorem ipsum dummy lorem ipsum dummy</p>
            </div>
          </div>
          {/* <strong>Subscribe to Our NewsLetter</strong> for now commented */}
          {/* <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="footer-text">
              <strong>Subscribe to Our NewsLetter</strong>
              <div className="footer-form">
                <div className="col-6 col-sm-6 col-md-8 col-lg-8">
                  <form>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      aria-describedby="emailHelp"
                    />
                  </form>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-4">
                  <button className="btn">Submit</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="footer-nav">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <ul className="footer-menu">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <div className="social-icons">
                <ul>
                  <li>
                    <TfiFacebook />
                  </li>
                  <li>
                    <FaInstagram />
                  </li>
                  <li>
                    <TfiLinkedin />
                  </li>
                  <li>
                    <FaTwitter />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
