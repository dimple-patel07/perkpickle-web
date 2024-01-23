import React, { useState } from "react";
import { images } from "./Images";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import ModalPopup from "./ModalPopup";
import LoginModal from "./Dialog/LogIn/LogInModal";
import SignUpModal from "./Dialog/SignUp/SignUpModal";

const Header = () => {
  const token = false;
  const [modalShow, setModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);
  return (
    <>
      <header className="shadow">
        <Navbar>
          <Container>
            <Link href="/">
              <Image src={images.logo} />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              {token && (
                <Nav className="align-items-center">
                  <Nav.Link href="#home">
                    <div className="profile">
                      <Image src={images.profile} />
                    </div>
                  </Nav.Link>
                  <NavDropdown title="Hello John" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
              {!token && (
                <>
                  <div className="header-btn">
                    <button onClick={() => setModalShow(true)} className="btn">
                      Login
                    </button>
                    <button
                      onClick={() => setSignInModalShow(true)}
                      className="btn"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
              {/* <ModalPopup show={modalShow} onHide={() => setModalShow(false)} /> */}
              <LoginModal
                isOpen={modalShow}
                onClose={() => setModalShow(false)}
              />
              <SignUpModal
                isOpen={signInModalShow}
                onClose={() => setSignInModalShow(false)}
              />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
