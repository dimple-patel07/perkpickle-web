import Footer from "../component/footer";
import Header from "../component/header";
import "../styles/global.scss";
import Providers from "../redux/provider";
import { Poppins } from "next/font/google";
import CommonDialog from "../component/Dialog/commonDialog";
import WarnModal from "../component/WarnModal/Warnmodal";
import Loader from "../component/Loader";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "400", "500"] });

export default function App({ Component, pageProps }) {
	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			dataLayer.push(arguments);
		};
		window.gtag("js", new Date());
		window.gtag("config", "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}");
	}, []);
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
