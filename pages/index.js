import Image from "next/image";
import { images } from "../component/Images";
import { handleOpenSignUpModal } from "../redux/modal/modalSlice";
import { useAppDispatch } from "../redux/store";
import withAuth from "../utils/withAuth";

const Login = () => {
	const dispatch = useAppDispatch();
	return (
		<>
			{/* Login Banner Start */}
			<section className="banner-section login">
				<div className="container">
					<div className="banner-main">
						<div className="row align-items-center">
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0">
								<div className="banner-text">
									<h2>Gain Easy Access To All Your Credit Card Rewards</h2>
									<p>With PerkPickle, you will no longer miss out on a single reward again. Access all your credit cards from any location with ease. With over 3,800 credit card databases, finding your card is a breeze on our platform.</p>

									<div>
										<button type="button" className="btn register" onClick={() => dispatch(handleOpenSignUpModal(true))}>
											Register With Us
										</button>
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-6">
								<Image src={images.bannerImg} className="img-fluid" alt="bannerImg" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mt-5 section-home">
				<div className="container">
					<div className="row">
						<div className="col-md-12 mt-5  text-center">
							<span className="header-title-1">Why Perkpickle?</span>
						</div>
						<div className="col-md-12 mt-5 mb-40  text-center">
							<span className="header-title">Access Your Credit Cards Without Compromising Your Privacy</span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="row al-center">
								<div className="col-md-6">
									<Image src={images.homeImg} alt="Home" className="img-fluid" />
								</div>
								<div className="col-md-6 ">
									<p className="normal-txt">Maintaining the safety and privacy of our users is our top priority here at PerkPickle. You do not need to give out any delicate information. </p>
									<p className="normal-txt fs-4">We will never ask you;</p>
									<div className="w-100">
										<ul className="ul-txt ms-2">
											<li className="list-group-item">
												<Image src={images.homeIcon} className="resize-15 me-3" />
												To link your card via your bank or ask for any of your bank credentials.{" "}
											</li>
											<li className="list-group-item">
												<Image src={images.homeIcon} className="resize-15 me-3" />
												CVV number 
											</li>
											<li className="list-group-item">
												<Image src={images.homeIcon} className="resize-15 me-3" />
												Card number
											</li>
										</ul>
									</div>
									<div className="w-100 mt-4">
										<p className="normal-txt mt-4">At PerkPickle, we pride ourselves on maintaining your financial privacy. All your private bank information and credentials are solely for you. We will never ask for it. </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="container services-bg">
				<div className="row">
					<div className="col-md-12 mt-5 mb-5 text-center">
						<span className="header-title-1">Our Services</span>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-12 mt-3 list-type5">
						<ol>
							<li>
								<a>
									<b>Organize your credit cards based on their rewards.</b> We will help you organize your credit cards according to their available cash back, from the highest points to the lowest points.
								</a>
							</li>
							<li>
								<a>
									<b> Point out the cards with the highest rewards.</b> Take advantage of earning while spending. You no longer need to guess the card with the highest payback or the card with the best reward for a particular product or service. We will help you point out the right card for the right purpose.
								</a>
							</li>
							<li>
								<a>
									<b>Provide you with the best credit card options.</b> If there are other cards better than the ones you have, trust us to provide you with the best alternatives with higher rewards.
								</a>
							</li>
						</ol>
					</div>
				</div>

				<div className="row text-center">
					<div className="col-md-12 mt-4 mb-4">
						<button type="button" className="btn btn-success btn-lg mb-4" onClick={() => dispatch(handleOpenSignUpModal(true))}>
							Register With Us
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default withAuth(Login, false);
