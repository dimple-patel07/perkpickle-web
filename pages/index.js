import { Inter } from "next/font/google";
import BannerSection from "../component/LandingPage/BannerSection"; 
import Savecard from "../component/LandingPage/Savecard";
import ExploreOffer from "../component/LandingPage/ExploreOffer";
import BestOffer from "../component/LandingPage/BestOffer";
import BannerBottom from "../component/LandingPage/BannerBottom";
import AvailableOffer from "../component/LandingPage/AvailableOffer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <BannerSection />
      <BannerBottom />
      <Savecard />
      <ExploreOffer />
      <AvailableOffer  />
      <BestOffer />
    </>
  );
}
