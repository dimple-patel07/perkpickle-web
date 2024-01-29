import Image from 'next/image'
import React from 'react'
import { images } from '../Images'

const BestOffer = () => {
  return (
    <section className='best-offer-section mb'>
         <div className='container'>
         <div className="text-center">
            <h3 className="title">Best Offers From Our Partners</h3>
          </div>

          <div className='best-offer-inn'> 
              <div className='row gy-4'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
                  <div className='best-offer-main'>     
                <div className="best-card-box">
                          <div className="card-box">
                          <Image src={images.Cardtwo} className="img-fluid" alt="card-img"/>
                          </div>
                          <div className='card-content'>
                              <h4>Well Fargo Active Cash Card</h4>
                              <ul>
                                <li>
                                  <div className='d-flex'>
                                    <span>Intro Offer</span>
                                    <strong>$200</strong>
                                  </div>
                                </li>
                                <li className='py-1'>
                                  <div>
                                    <span>Reward rate</span>
                                    <strong>2% <i>(Cashback)</i></strong>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    <span>Annual Fee</span>
                                    <strong >$0</strong>
                                  </div>
                                </li>
                              </ul>
                          </div>
                    </div>
                          {/* <div className='card-footer'>
                           <div className='card-footer-text'>
                              <p>NerdWallet Rating</p>
                              <span>5.0/5</span>
                           </div>
                           <div>
                            <button className='btn'>Apply Now</button>
                           </div>
                          </div>  */}
                  </div>
                </div>
                
                <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
                <div className='best-offer-main'>     
                <div className="best-card-box">
                          <div className="card-box">
                          <Image src={images.Cardthree} className="img-fluid" alt="card-img"/>
                          </div>
                          <div className='card-content'>
                              <h4>Chase Freedom Unlimited*</h4>
                              <ul>
                                <li>
                                  <div>
                                    <span>Intro Offer</span>
                                    <strong>Unlimited Matched Cashback</strong>
                                  </div>
                                </li>
                                <li className='py-1'>
                                  <div>
                                    <span>Reward rate</span>
                                    <strong>1.5%-5% <i>(Cashback)</i></strong>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    <span>Annual Fee</span>
                                    <strong >$0</strong>
                                  </div>
                                </li>
                              </ul>
                          </div>
                    </div>
                          {/* <div className='card-footer'>
                           <div className='card-footer-text'>
                              <p>NerdWallet Rating</p>
                              <span>5.0/5</span>
                           </div>
                           <div>
                            <button className='btn'>Apply Now</button>
                           </div>
                          </div>  */}
                  </div>
                </div>

                <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
                <div className='best-offer-main'>     
                <div className="best-card-box">
                          <div className="card-box">
                          <Image src={images.Cardfive} className="img-fluid" alt="card-img"/>
                          </div>
                          <div className='card-content'>
                              <h4>Capital one SavorOne Card</h4>
                              <ul>
                                <li>
                                  <div className='d-flex'>
                                    <span>Intro Offer</span>
                                    <strong>$200</strong>
                                  </div>
                                </li>
                                <li className='py-1'>
                                  <div>
                                    <span>Reward rate</span>
                                    <strong>1%-10% <i>(Cashback)</i></strong>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    <span>Annual Fee</span>
                                    <strong >$0</strong>
                                  </div>
                                </li>
                              </ul>
                          </div>
                    </div>
                          {/* <div className='card-footer'>
                           <div className='card-footer-text'>
                              <p>NerdWallet Rating</p>
                              <span>5.0/5</span>
                           </div>
                           <div>
                            <button className='btn'>Apply Now</button>
                           </div>
                          </div>  */}
                  </div>
                </div>

                <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
                <div className='best-offer-main'>     
                <div className="best-card-box">
                          <div className="card-box">
                          <Image src={images.Cardone} className="img-fluid" alt="card-img"/>
                          </div>
                          <div className='card-content'>
                              <h4>Well Fargo Active Cash Card</h4>
                              <ul>
                                <li>
                                  <div className='d-flex'>
                                    <span>Intro Offer</span>
                                    <strong>$75000</strong>
                                  </div>
                                </li>
                                <li className='py-1'>
                                  <div>
                                    <span>Reward rate</span>
                                    <strong>2x-5x <i>(Points)</i></strong>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    <span>Annual Fee</span>
                                    <strong >$95</strong>
                                  </div>
                                </li>
                              </ul>
                          </div>
                    </div>
                          {/* <div className='card-footer'>
                           <div className='card-footer-text'>
                              <p>NerdWallet Rating</p>
                              <span>5.0/5</span>
                           </div>
                           <div>
                            <button className='btn'>Apply Now</button>
                           </div>
                          </div>  */}
                  </div>
                </div>
              </div>
          </div>
         </div>
    </section>
  )
}

export default BestOffer
