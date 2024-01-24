import React from 'react'
import { images } from '../Images'
import Image from 'next/image'

const BannerSection = () => {
  const token = process.env.SET_LOGIN
  return (
<>
   <section className='banner-section'>
      <div className='container'>
        <div className='banner-main'>
          <div className='row align-items-center'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-sm-1 order-md-1 order-lg-0'>
              <div className='banner-text'>
               <h1>Lorem Ipsum <br /> Dummy Text</h1>
               <p>lorem ipsum getiing dummy data lorem ipsum getiing dummy datalorem ipsum getiing dummy datalorem ipsum getiing dummy datalorem</p>
                <button className='btn'>Get Start</button>
              </div>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
          <Image src={images.bannerImg} className='img-fluid' />
          </div>

          </div>
        </div>
      </div>
   </section>
   </>
   
  )
}

export default BannerSection
