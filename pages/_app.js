import Footer from "../component/footer";
import Header from "../component/header";
import "../styles/global.scss";
import Providers from "../redux/provider";
import { Poppins } from "next/font/google";
import CommonDialog from "../component/Dialog/commonDialog";
import WarnModal from "../component/WarnModal/Warnmodal";
import Loader from "../component/Loader";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "400", "500"] });

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <div className={poppins.className}>
        <Loader />
        {/* <Header /> */}
        <CommonDialog />
        <WarnModal />
        <ToastContainer theme="colored" />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </div>
    </Providers>
  );
}
