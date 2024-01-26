import React from "react";
import { images } from "./Images";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppDispatch } from "../redux/store";
import {
  handleOpenLoginModal,
  handleOpenSignUpModal,
} from "../redux/modal/modalSlice";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const Header = () => {
  const token = getCookie("user");
  const dispatch = useAppDispatch();

  return (
    <>
      <header>
        <Navbar>
          <Container>
            <Link href="/">
              <div className="logo">
                <Image src={images.logo} />
              </div>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              {token && (
                <Nav className="align-items-center">
                  <NavDropdown
                    title={
                      <div className="profile">
                        <Image src={images.profile} />
                        <span> Hello John</span>
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <ul>
                      <li>
                        <Link href="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact-us">
                          Contact Us
                        </Link>
                      </li>
                      <li onClick={() => deleteCookie("user")}>
                        <Link href="/">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </NavDropdown>
                </Nav>
              )}
              {!token && (
                <div className="header-btn">
                  <button
                    onClick={() => dispatch(handleOpenLoginModal(true))}
                    className="btn"
                  >
                    <span>Login</span>
                    <i>
                      <IoMdLogIn />
                    </i>
                  </button>
                  <button
                    onClick={() => dispatch(handleOpenSignUpModal(true))}
                    className="btn"
                  >
                    <span>Sign Up</span>
                    <i>
                      <FaRegUserCircle />
                    </i>
                  </button>
                </div>
              )}
            </Navbar.Collapse>

            {/* Toggle Menu Login Header */}
            <div className="login-toggle">
              {!token && (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <RxHamburgerMenu />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <ul>
                      <li>
                        <Link href="/about-us">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact-us">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Container>
        </Navbar>
        <div></div>
      </header>
    </>
  );
};

export default Header;
