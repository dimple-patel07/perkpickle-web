import React from "react";
import { images } from "../Images";
import Image from "next/image";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const BannerSection = () => {
	return (
		<>
			<section className="banner-section showbullets">
				<div className="container scrollDiv">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
									<h3> Transparency At It's Peak</h3>
									<p>Our core strength lies in maintaining a trusted relationship between our users and us. We will never ask for any of your private financial credentials.</p>
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
