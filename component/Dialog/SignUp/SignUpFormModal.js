import React, { useState } from "react";
import Dialog from "../Dialog";
import Image from "next/image";
import { images } from "../../Images";
import ChooseCardModal from "./ChooseCardModal";
import { useSelector } from "react-redux";
import { modalSelector } from "../../../redux/modal/modalSlice";
import { useAppDispatch } from "../../../redux/store";
import axios from "axios";
import { config } from "../../../utils/config";
const SignUpFormModal = () => {
	const [chooseCardModalShow, setChooseCardModalShow] = useState(false);
	const ModalState = useSelector(modalSelector);
	const signUpFormModalShow = ModalState?.SignUpForm;
	const dispatch = useAppDispatch();

	const [userData, setUserData] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		zip_code: "",
		address: "",
		phone_number: "",
	});

	const onInputChanged = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const updateUser = async () => {
		try {
			const response = await axios.post(`${config.apiURL}/updateUser`, userData);
			if (response?.data?.email) {
				console.log("user updated successfully : ", response.data.email);
				closeModal();
				setChooseCardModalShow(true);
			}
		} catch (errorObj) {
			console.error(errorObj?.response?.data?.error); // error
		}
	};

	const closeModal = () => dispatch(handleCloseAllModal());
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
										{/* email - readonly - set from verified user response */}
										<div class="col-6 col-sm-6 col-md-6 col-lg-6">
											<input type="email" class="form-control" placeholder="Email" name="email" onChange={onInputChanged} readonly />
										</div>
										{/* first name */}
										<div class="col-6 col-sm-6 col-md-6 col-lg-6">
											<input type="text" class="form-control" placeholder="First name" name="first_name" onChange={onInputChanged} />
										</div>
										{/* last name */}
										<div class="col-6 col-sm-6 col-md-6 col-lg-6">
											<input type="text" class="form-control" placeholder="Last name" name="last_name" onChange={onInputChanged} />
										</div>
										{/* password */}
										<div class="col-12 mt-3">
											<input type="password" class="form-control" placeholder="Password" name="password" onChange={onInputChanged} />
										</div>
										{/* zip code */}
										<div class="col-12 my-3">
											<input type="number" class="form-control" placeholder="zip Code" name="zip_code" onChange={onInputChanged} />
										</div>
										{/* address */}
										<div class="col-12">
											<textarea class="form-control" placeholder="Address" name="address" onChange={onInputChanged}></textarea>
										</div>
										{/* phone number */}
										<div class="col-12 my-3">
											<input type="number" class="form-control" placeholder="Phone Number" name="phone_number" onChange={onInputChanged} />
										</div>
										<div className="account d-flex justify-content-between align-items-center">
											<button
												type="button"
												onClick={() => {
													updateUser();
												}}
												className="btn order-1 mt-3 mb-0">
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
			<ChooseCardModal isOpen={chooseCardModalShow} onClose={() => setChooseCardModalShow(false)} />
		</>
	);
};

export default SignUpFormModal;
