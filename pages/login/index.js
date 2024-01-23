import Image from "next/image";
import { images } from "../../component/Images";
import styles from "./login.module.css";
export default function Login() {
  return (
    <>
    {/* Login Banner Start */}
    <section className='banner-section login'>
       <div className='container'>
         <div className='banner-main'>
           <div className='row align-items-center'>
           <div className='col-12 col-sm-12 col-md-12 col-lg-6 order-md-1 order-lg-0'>
               <div className='banner-text'>
                <h1>Lorem Ipsum <br /> Dummy Text</h1>
                <p>lorem ipsum getiing dummy data lorem ipsum getiing dummy datalorem ipsum getiing dummy datalorem ipsum getiing dummy datalorem</p>
                
                 <div >
                   <button>Register With Us</button>
                 </div>
                 
               </div>
           </div>
           <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
           <Image src={images.bannerImg} className='img-fluid' />
           </div>
 
           </div>
         </div>
       </div>
    </section>

    {/* Login Banner End */}
    </>
  );
}
