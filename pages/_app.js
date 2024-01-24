import Footer from "../component/footer";
import Header from "../component/header";
import "../styles/global.scss";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "400", "500"] });

export default function App({ Component, pageProps }) {
  // const token = request.cookies.get('user')
  const token = false;
  return (
    <div className={poppins.className}>
      <Header />
      <Component {...pageProps} />
      {token && <Footer />}
    </div>
  );
}
