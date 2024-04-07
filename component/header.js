import React, { useEffect, useState } from "react";
import { images } from "./Images";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
// import Dropdown from "react-bootstrap/Dropdown";
// import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";
import { useAppDispatch } from "../redux/store";
import { handleOpenChangePasswordModal, handleOpenLoginModal, handleOpenResetPasswordModal, handleOpenSignUpModal } from "../redux/modal/modalSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { emailStoreSelectore, handleStoreToken } from "../redux/emailStore/emailStoreSlice";
import { clearSessionStorage, getSessionStorage } from "../utils/config";

const Header = () => {
	const dispatch = useAppDispatch();
	const userName = getSessionStorage("userName");
	const token = useSelector(emailStoreSelectore).token;
	const router = useRouter();
	const [toggleDropdown, SetToggleDropdown] = useState(false);

	useEffect(() => {
		SetToggleDropdown(false);
	}, [router.pathname]);

	const handleToggle = () => {
		SetToggleDropdown(!toggleDropdown);
	};
	// logout
	const logoutProcess = () => {
		clearSessionStorage();
		dispatch(handleStoreToken(""));
	};

	return (
		<>
			<header>
				<Navbar>
					<Container>
						<Link href="/">
							<div className="logo">
								<Image src={images.logo} alt="logo" />
							</div>
						</Link>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
							{token && (
								<Nav className="align-items-center">
									<NavDropdown
										title={
											<div className="profile">
												{/* <Image src={images.profile} /> */}
												<FaUserAlt />
												<span className="profile-name">{userName}</span>
											</div>
										}
										show={toggleDropdown}
										onToggle={handleToggle}
										onClick={handleToggle}
										id="basic-nav-dropdown">
										<ul>
											<li>
												<Link href="/profile">Profile</Link>
											</li>
											<li>
												<Link href={router.pathname} onClick={() => dispatch(handleOpenChangePasswordModal(true))}>
													Change Password
												</Link>
											</li>
											<li>
												<Link href="/contact-us">Contact Us</Link>
											</li>
											<li>
												<Link href="/about-us">About Us</Link>
											</li>
											<li>
												<Link href="/privacy-policy">Privacy Policy</Link>
											</li>
											<li onClick={() => logoutProcess()}>
												<Link href="/">Logout</Link>
											</li>
										</ul>
									</NavDropdown>
								</Nav>
							)}
							{!token && (
								<div className="header-btn">
									<button onClick={() => dispatch(handleOpenLoginModal(true))} className="btn">
										<span>Login</span>
										<i>
											<IoMdLogIn />
										</i>
									</button>
									<button onClick={() => dispatch(handleOpenSignUpModal(true))} className="btn">
										<span>Sign Up</span>
										<i>
											<FaRegUserCircle />
										</i>
									</button>
								</div>
							)}
						</Navbar.Collapse>

						{/* Toggle Menu Login Header */}
						{/* <div className="login-toggle">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <RxHamburgerMenu />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <ul>
                      <li>
                        <Link href="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">Contact Us</Link>
                      </li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
            </div> */}
					</Container>
				</Navbar>
			</header>
		</>
	);
};

export default Header;
