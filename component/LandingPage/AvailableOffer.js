import React from "react";

const AvailableOffer = ({ availableOffers, savedCardList }) => {
	return (
		<section className="available-offer mb">
			<div className="container">
				<div className="text-center">
					<h3 className="title">Available Offers</h3>
					<p className="subtitle">
						Select your offer <br /> for different categories
					</p>
				</div>
				<div className="available-inn">
					<div className="heading">
						<ul>
							<li>
								<p className="m-0">
									<strong>Credit Card</strong>
								</p>
								<span>
									<strong>Rewards rate</strong>
								</span>
							</li>
							<hr />
						</ul>
					</div>
					<div className="list">
						{availableOffers.length > 0 ? (
							// offers available on selected cards
							<ul key="availableOfferList">
								{availableOffers.map((card, index) => {
									return (
										<div key={index}>
											<li key={`${index}`}>
												<p className="m-0">{card.cardName}</p>
												<span>{card.spendBonusDesc}</span>
											</li>
											<hr />
										</div>
									);
								})}
							</ul>
						) : (
							// when offers not available on selected cards
							<ul>
								{savedCardList.map((card, index) => {
									return (
										<div key={index}>
											<li>
												<p className="m-0">{card.cardName}</p>
												<span>
													{card.baseSpendAmount} / {card.baseSpendEarnCurrency}
													{/* {card.benefit.length > 0 &&
														card.benefit.map((data, index) => {
															return <p key={index}>{data.benefitDesc}</p>;
														})} */}
												</span>
												<hr />
											</li>
											<hr />
										</div>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AvailableOffer;
