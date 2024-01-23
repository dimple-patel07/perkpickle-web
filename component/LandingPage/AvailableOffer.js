import React from 'react'

const AvailableOffer = () => {
  return (
    <section className='available-offer mb'>
        <div className='container'>
        <div className="text-center">
          <h3 className="title">Available Offers</h3>
          <p className="subtitle">
            Select your offer <br /> for different
            categories
          </p>
        </div>
            <div className='available-inn'>
                <div className='heading'>
                    <ul>
                    <li>
                            <p className='m-0'><strong>Credit Card</strong></p>
                            <span><strong>Rewards rate</strong></span>
                        </li>
                        <hr />                        
                    </ul>
                </div>
                <div className='list'>
                    <ul>
                        <li>
                            <p className='m-0'>Wells Fargo Active Cash® Card</p>
                            <span>2% Cashback</span>
                        </li>
                        <hr />
                        <li>
                            <p className='m-0'>Chase Freedom Unlimited®</p>
                            <span>1.5%-6.5% Cashback</span>
                        </li>
                        <hr />
                    </ul>
                </div>

            </div>
        </div>
    </section>
  )
}

export default AvailableOffer
