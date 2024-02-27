import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatCardCurrency, getCardImage } from "../../utils/config";
import { postCall } from "../../services/apiCall";
import { useAppDispatch } from "../../redux/store";
import { useRouter } from "next/router";

const BestOffer = ({ bestOfferCards, allCards }) => {
	const [suggestedCards, setSuggestedCards] = useState([]);
	const [isMore, setIsMore] = useState(true);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const displayLimit = 10;
	useEffect(() => {
		let bestCards = [];
		for (const offerCard of bestOfferCards) {
			const foundCard = allCards.find((card) => card.card_key === offerCard.cardKey);
			if (foundCard) {
				// expecting value should be found
				bestCards.push({ ...offerCard, ...foundCard });
			} else {
				// get & add - not found card from master table
				addCardDetail(offerCard, bestCards);
			}
		}
		setSuggestedCards(bestCards);
	}, [bestOfferCards]);
	// add card detail
	const addCardDetail = async (offerCard, bestCards) => {
		const addedCard = await postCall("addCardDetail", { card_key: offerCard.cardKey }, dispatch, router);
		if (addedCard && addedCard.card_key) {
			allCards.push(addedCard);
			bestCards.push({ ...addedCard, ...addedCard.card_detail });
			setSuggestedCards(bestCards);
		}
	};
	return (
		suggestedCards.length > 0 && (
			<section className="best-offer-section mb">
				<div className="container">
					<div className="text-center">
						<h3 className="title">Best Offers From Our Partners</h3>
					</div>

					<div className="best-offer-inn">
						<div className="row gy-4">
							{suggestedCards.slice(0, isMore ? displayLimit : suggestedCards.length).map((card, index) => {
								return (
									<div className="col-12 col-sm-12 col-md-12 col-lg-6" key={index}>
										<div className="best-offer-main">
											<div className="best-card-box">
												<div className="card-box">
													<Image src={getCardImage(card)} alt="N/A" fill />
												</div>

												<div className="card-content">
													<h4>{card.cardName ? card.cardName : card.card_name}</h4>
													<ul>
														<li className="py-1">
															<div>
																<span>Rewards rate</span>
																<strong>{formatCardCurrency(card.earnMultiplier ? card.earnMultiplier : card.baseSpendAmount, card.spendType ? card.spendType : card.baseSpendEarnCurrency)}</strong>
															</div>
														</li>
														<li>
															<div>
																<span>Description</span>
																<strong>{card.spendBonusDesc ? card.spendBonusDesc : card.signupBonusDesc ? card.signupBonusDesc : "No offer available on selected category"}</strong>
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
						{suggestedCards.length > 10 && (
							// <div className="row gy-4">
							// 	<a href="#" onClick={() => setIsMore(!isMore)}>
							// 		{isMore ? "Load More" : "Top 10"}
							// 	</a>
							// </div>

							<div className="row gy-4">
								<div className="col-md-10"></div>
								<div className="col-md-2 text-end mt-5 pe-4">
								<a href="#" className="loadmore" onClick={() => setIsMore(!isMore)}>
									{isMore ? "Load More" : "Top 10"}
								</a>
								</div>
								
							</div>
						)}
					</div>
				</div>
			</section>
		)
	);
};

export default BestOffer;
