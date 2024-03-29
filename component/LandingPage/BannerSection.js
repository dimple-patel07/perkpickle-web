import React from "react";
import { images } from "../Images";
import Image from "next/image";

const BannerSection = () => {
	return (
		<>
			<section className="banner-section">
				<div className="container scrollDiv">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
									<h3>Earn As You Spend!</h3>
									<p>Our aim is to ensure that you earn as many points as possible. Get ready to turn your spending into a fun and rewarding experience!</p>	
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
