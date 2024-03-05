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
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 order-md-1 order-lg-0">
                <div className="banner-text">
                  <h2>
                  Gain Easy Access To All Your Credit Cards Reward
                  </h2>
                  <p>
                  With PerkPickle, you will no longer miss out on a credit card reward. Access all your credit cards from any location with ease.
                  We have around 3800 different credit card databases, and you will find your credit card on our platform.
                  </p>

                  <div>
                    <button
                      type="button"
                      className="btn register"
                      onClick={() => dispatch(handleOpenSignUpModal(true))}
                    >
                      Register With Us
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <Image src={images.bannerImg} className="img-fluid" alt="bannerImg"/>
              </div>
            </div>
          </div>
        </div>

      </section>
      <h2>Travel Light</h2>
      <p>
      The world has advanced to a technological age; you no longer need to move around with all your credit cards. All you have to do is select the credit card with more rewards to offer and make your purchases.
      </p>
      <h2>Access Your Credit Cards Without Compromising Your Privacy</h2>
      <p>
      Maintaining the safety and privacy of our clients is our top priority here at PerkPickle. You do not need to give out any delicate information. 
      </p>
      <p>We will never ask you;</p>
      <ul>
        <li>To link your card via your bank or ask for any of your bank credentials. </li>
        <li>CVV number </li>
        <li>Card number (16 digits)</li>
      </ul>
<p>We use high-tech encryption to ensure that all imputed data maintains a high level of privacy. </p>
<p>
At PerkPickle, we pride ourselves on maintaining your financial privacy. All your private bank information and credentials are solely for you. We will never ask for it. 
</p>
<h3>Our services</h3>
<ul>
  <li>
  Organize your credit cards based on their rewards.
We will help you organize your credit cards according to their available cash back, from the highest points to the lowest points.
  </li>
  <li>
  Point out the cards with the highest rewards
Take advantage of earning while spending. You no longer need to guess the card with the highest payback or the card with the best reward for a particular product or service. We will help you point out the right card for the right purpose.
  </li>
  <li>
  Provide you with the best credit card options. 
If there are other cards better than the ones you have, trust us to provide you with the best alternatives with higher rewards.
  </li>
</ul>
<div>
                    <button
                      type="button"
                      className="btn register"
                      onClick={() => dispatch(handleOpenSignUpModal(true))}
                    >
                      Register With Us
                    </button>
                  </div>
    </>
  );
}

export default withAuth(Login, false);