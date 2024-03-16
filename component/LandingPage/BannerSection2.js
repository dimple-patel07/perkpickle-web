import React from "react";
import { images } from "../Images";
import Image from "next/image";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const BannerSection2 = () => {
	// if (isMobile) {
	// 	console.log("is mobile-----");
	// }
	// if (isBrowser) {
	// 	console.log("is browser----");
	// }
	return (
		<>
			<section className="banner-section showbullets">
				<div className="container scrollDiv">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<BrowserView>
									<div className="banner-text">
										<h3>
											<small>Track Your Rewards On </small> <br /> Different Types Of Programs With Ease.
										</h3>
										<ul>
											<li>Credit cards</li>
											<li>Plane tickets</li>
											<li>Hotels</li>
											<li>Dinings</li>
											<li>Train tickets</li>
											<li>Entertainment</li>
										</ul>

										<p>We can make the process super easy for you by organizing the programs and finding the best ways to access the rewards.</p>
									</div>
								</BrowserView>

								<MobileView>
									<div className="banner-text">
										<h3>
											<small>Track Your Rewards On </small> <br /> Different Types Of Programs With Ease.
										</h3>

										<p>We can make the process super easy for you by organizing the programs and finding the best ways to access the rewards.</p>
									</div>
								</MobileView>
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

export default BannerSection2;
