import React from "react";
import { images } from "../Images";
import Image from "next/image";

const BannerSection = () => {
	return (
		<>
			<section className="banner-section showbullets">
				<div className="container scrollDiv">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
									<h3>Transparency at it's peak</h3>
									<p>Our core strength lies in maintaining a trusted relationship between our clients and us. We will never ask for any of your private financial credentials. </p>
					
									<p>We are;</p>
									<ul>
										<li>Innovative</li>
										<li>Transparent</li>
										<li>Highly efficient</li>
										<li>Professional</li>
										<li>Reliable</li>										
									</ul>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 text-center">
								<Image src={images.bannerImg} className="img-fluid" alt="banner-img" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BannerSection;
