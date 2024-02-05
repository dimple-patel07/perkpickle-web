import React from "react";
import Image from "next/image";

const AvailableOffer = ({ availableOffers, savedCardList }) => {
	return (
		<section className="available-offer mb">
			<div className="container">
				<div className="text-center">
					<h3 className="title">{availableOffers.length > 0 ? "Available Offers" : "Default Card Offers"}</h3>
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
								<p className="m-0">
									<strong>Rewards rate (Points / Currency)</strong>
								</p>
								<span>
									<strong>Description</strong>
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
												<div className="available-card-img">
													<Image src={card.card_image_url} alt="N/A" width="50" height="50" />
												</div>
												<p className="m-0">{card.cardName}</p>
												<p className="m-0">
													{card.earnMultiplier} ({card.baseSpendAmount} / {card.baseSpendEarnCurrency})
												</p>
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
												<div className="available-card-img">
													<Image src={card.card_image_url} alt="N/A" width="50" height="50" />
												</div>
												<p className="m-0">{card.cardName}</p>
												<p className="m-0">
													{card.baseSpendEarnCashValue} ({card.baseSpendAmount} / {card.baseSpendEarnCurrency})
												</p>
												<span>{card.signupBonusDesc}</span>
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
