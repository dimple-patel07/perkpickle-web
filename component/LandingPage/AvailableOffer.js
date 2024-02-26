import React from "react";
import Image from "next/image";
import { formatCardCurrency, getCardImage } from "../../utils/config";
const AvailableOffer = ({ availableOffers }) => {
	return (
		<section className="available-offer mb">
			<div className="container">
				<div className="text-center">
					<h3 className="title">Saved Card Offers</h3>
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
									<strong>Rewards rate</strong>
								</p>
								<span>
									<strong>Description</strong>
								</span>
							</li>
							<hr />
						</ul>
					</div>
					<div className="list">
						{availableOffers.length > 0 && (
							// offers available on selected cards
							<ul key="availableOfferList">
								{availableOffers.map((card, index) => {
									return (
										<div key={index}>
											<li key={`${index}`}>
												<div className="available-card-img">
													<Image src={getCardImage(card)} alt="N/A" width="50" height="50" className="available-card-img" />
												</div>
												<p className="m-0">{card.card_name}</p>
												<p className="m-0">{formatCardCurrency(card.earnMultiplier ? card.earnMultiplier : card.baseSpendAmount, card.spendType ? card.spendType : card.baseSpendEarnCurrency)}</p>
												<span>{card.spendBonusDesc ? card.spendBonusDesc : card.signupBonusDesc ? card.signupBonusDesc : "No offer available on selected category"}</span>
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
