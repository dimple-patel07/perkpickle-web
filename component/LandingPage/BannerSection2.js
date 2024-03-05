import React from "react";
import { images } from "../Images";
import Image from "next/image";

const BannerSection2 = () => {
	return (
		<>
			<section className="banner-section showbullets">
				<div className="container scrollDiv">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
								<h3>Track Your Rewards On Different Types Of Programs With Ease.</h3>
									<ul>
										<li>Credit cards</li>
										<li>Plane tickets</li>
										<li>
										Hotels

										</li>
										<li>
										Dinings
										</li>
										<li>
										Train tickets

										</li>
										<li>
										Entertainment

										</li>
									</ul>


<span>We can make the process super easy for you by organizing the programs and finding the best ways to access the rewards.</span>

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

export default BannerSection2;
