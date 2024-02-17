import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getCardImage } from "../../utils/config";

const BestOffer = ({ bestOfferCards, allCards }) => {
	const [suggestedCards, setSuggestedCards] = useState([]);
	useEffect(() => {
		let bestCards = [];
		for (const offerCard of bestOfferCards) {
			const foundCard = allCards.find((card) => card.card_key === offerCard.cardKey);
			if (foundCard) {
				// expecting value should be found
				bestCards.push({ ...offerCard, ...foundCard });
			}
		}
		setSuggestedCards(bestCards);
	}, [bestOfferCards]);
	return (
		suggestedCards.length > 0 && (
			<section className="best-offer-section mb">
				<div className="container">
					<div className="text-center">
						<h3 className="title">Best Offers From Our Partners</h3>
					</div>

					<div className="best-offer-inn">
						<div className="row gy-4">
							{suggestedCards.map((card, index) => {
								return (
									<div className="col-12 col-sm-12 col-md-12 col-lg-6" key={index}>
										<div className="best-offer-main">
											<div className="best-card-box">
												<div className="card-box">
													<Image src={getCardImage(card)} alt="N/A" fill />
												</div>

												<div className="card-content">
													<h4>{card.cardName}</h4>
													<ul>
														<li className="py-1">
															<div>
																<span>Rewards rate</span>
																<strong>
																	{card.earnMultiplier} <i>Points</i>
																</strong>
															</div>
														</li>
														<li>
															<div>
																<span>Description</span>
																<strong>{card.spendBonusDesc}</strong>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		)
	);
};

export default BestOffer;
