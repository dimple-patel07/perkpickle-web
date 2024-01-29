import React, { useEffect, useState } from "react";
import { images } from "./Images";
import Image from "next/image";
import { getLoggedEmail } from "../utils/config";
import axios from "axios";
import { config } from "../utils/config";
import { useAppDispatch } from "../redux/store";
import { handleShowWarnModal } from "../redux/warnModel/warnModelSlice";

const ScreenBanner = () => {
	const dispatch = useAppDispatch();
	const [userData, setUserData] = useState();
	useEffect(() => {
		getUserByEmail();
	}, []);
	// get user by email
	const getUserByEmail = async () => {
		try {
			const params = { email: getLoggedEmail() };
			const response = await axios.post(`${config.apiURL}/getUserByEmail`, params);
			if (response?.data?.email) {
				// expecting success response
				setUserData(response.data);
			}
		} catch (errorObj) {
			dispatch(
				handleShowWarnModal({
					isShow: true,
					modelType: "error",
					modelMessage: errorObj?.response?.data?.error,
				})
			);
		}
	};
	// update user
	const updateUser = async () => {
		console.log("user data :: ", userData);
		userData.first_name = `${userData.first_name}+`;
		try {
			const response = await axios.post(`${config.apiURL}/updateUser`, userData);
			if (response?.data?.email) {
				dispatch(
					handleShowWarnModal({
						isShow: true,
						modelType: "success",
						modelMessage: "profile updated successfully",
					})
				);
			} else {
				dispatch(
					handleShowWarnModal({
						isShow: true,
						modelType: "error",
						modelMessage: "profile updated failed",
					})
				);
			}
		} catch (errorObj) {
			dispatch(
				handleShowWarnModal({
					isShow: true,
					modelType: "error",
					modelMessage: "profile updated failed",
				})
			);
		}
	};
	return (
		<>
			{/* Banner Start */}
			<section className="banner-section">
				<div className="container">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
									<h1>
										Edit Your <br /> Profile Details
									</h1>
									<p>lorem ipsum getiing dummy data lorem ipsum getiing dummy datalorem ipsum getiing dummy datalorem ipsum getiing dummy datalorem</p>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-6">
								<Image src={images.profileBannerImg} width={544} height={544} className="img-fluid" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/*  Banner End */}

			{/* ScreenBanner Form Start */}
			<section className="screenbanner-form">
				<div className="container">
					<div className="banner-form">
						<form>
							<div className="row gy-4 gy-sm-3 gy-md-4 gy-lg-5">
								<div className="col-12 col-sm-12 col-md-6 col-lg-6">
									<input type="text" placeholder="Email Address" className="form-control" />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6">
									<input type="text" placeholder="Phone Number" className="form-control" />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6">
									<input type="text" placeholder="First Name" className="form-control" />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6">
									<input type="text" placeholder="Last Name" className="form-control" />
								</div>

								<div className="col-12 col-sm-12 col-md-12 col-lg-12">
									<textarea type="text" placeholder="Address" className="form-control" />
								</div>

								<div className="col-12 col-sm-12 col-md-6 col-lg-6">
									<input type="number" placeholder="PinCode" className="form-control" />
								</div>

								<div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center text-sm-center text-md-start text-lg-start">
									<button type="button" className="btn" onClick={() => updateUser()}>
										Update Profile
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default ScreenBanner;
