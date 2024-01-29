import Image from "next/image";
import { images } from "../../component/Images";
import styles from "./login.module.css";
import Footer from "../../component/footer";
import { handleOpenLoginModal, handleOpenSignUpModal } from "../../redux/modal/modalSlice";
import { useAppDispatch } from "../../redux/store";
export default function Login() {
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
                  <h1>
                    Lorem Ipsum <br /> Dummy Text
                  </h1>
                  <p>
                    lorem ipsum getiing dummy data lorem ipsum getiing dummy
                    datalorem ipsum getiing dummy datalorem ipsum getiing dummy
                    datalorem
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
      {/* Login Banner End */}
    </>
  );
}
