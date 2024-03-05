import Image from "next/image";
import React from "react";
import { images } from "./Images";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { TfiFacebook, TfiLinkedin } from "react-icons/tfi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="footer-logo">
            <Link href="/">
							<div className="logo">
								<Image src={images.logo} alt="logo" />
							</div>
						</Link>
              {/* <p>We have around 3800 different credit card databases, and you will find your credit card on our platform.</p> */}
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
            <div className="col-12 col-sm-12 col-md-12 col-lg-11">
              <ul className="footer-menu">
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/about-us"}>About Us</Link></li>
                <li><Link href={"/contact-us"}>Contact Us</Link></li>
                <li><Link href={"/cookie-policy"}>Cookie Policy</Link></li>
                <li><Link href={"/privacy-policy"}>Privacy Policy</Link></li>
                <li><Link href={"/terms-and-condition"}>Terms & Conditions</Link></li>

              </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-1">
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
