import React from "react";
import PageBanner from "../../component/pageBanner";
import commonRoute from "../../utils/commonRoute";
import { useSelector } from "react-redux";
import { emailStoreSelectore } from "../../redux/emailStore/emailStoreSlice";
import { handleOpenLoginModal, handleOpenSignUpModal } from "../../redux/modal/modalSlice";
import { useAppDispatch } from "../../redux/store";
const AboutUs = () => {
	const token = useSelector(emailStoreSelectore).token;
	const dispatch = useAppDispatch();
	// open signup modal & scroll up
	const openSigninOrSignup = (flag) => {
		const headerTag = document.getElementsByTagName("header");
		setTimeout(() => {
			window.scrollTo({ top: headerTag[0].offsetTop, left: headerTag[0].offsetTop, behavior: "smooth" });
		}, 10);
		if (flag === "login") {
			dispatch(handleOpenLoginModal(true));
		} else {
			// signup
			dispatch(handleOpenSignUpModal(true));
		}
	};
	return (
		<>
			<PageBanner title={"About Us"} description={"PerkPickle provides cutting-edge solutions to individuals looking to maximize their earnings while spending. Each credit card comes with its reward, and we aim to ensure that you earn as many points as possible."} />
			<section className="contact-us-section">
				<div className="container">
					<div className="row">
						<h3>Who we are</h3>
						<p> PerkPickle is a fintech company dedicated to revolutionizing the financial landscape. We are a product of passion, hard work, and commitment. PerkPickle is made up of a team of experts working tirelessly to ensure that our clients gain access to the different available opportunities to maximize their earnings while making expenses. </p>
						<h3>Meet our CEO</h3>
						<p>(Add a photo of the CEO) Mr Krunal Patel, CEO of Perkpickle</p>
						<p>Krunal Patel is an experienced software developer. He has previously handled several tech-related projects, but his dream has always been to own his own fintech company.  Aside from being a software developer for seven years and still counting, Krunal has great experience in the financial industry. The foundation of Perkpickle was built based on passion, experience, determination, and commitment to have positive financial impacts on the lives of others through technology. </p>
						<h3>What we do</h3>
						<p>Keeping track of all points in your different cards can be overwhelming, and sometimes, you may even end up mixing them up. This is where we come in.</p>

						<p>PerkPickle will help you keep track of all your available points and also help you earn more points.</p>

						<p>How we operate is quite easy. All you need to do is log into your account with us and choose the spending category you are going for. We will then show you all your cards organized according to their available points, ranging from the highest to the lowest points. This will enable you to pick the right one and save you from the stress of searching through a series of cards and wasting your time.</p>
						<p>Register with us now to access an organized arrangement of your credit cards.</p>
						{/* signup link - should not be logged in */}
						{!token && (
							<>
								<span>
									Click here to
									<a className="anchor-with-underline" onClick={() => openSigninOrSignup("signup")}>
										&nbsp;Sign Up.
									</a>
								</span>

								<p>
									Kindly
									<a className="anchor-with-underline" onClick={() => openSigninOrSignup("login")}>
										&nbsp;Login&nbsp;
									</a>
									if you already have an account with us.
								</p>
							</>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default commonRoute(AboutUs);
