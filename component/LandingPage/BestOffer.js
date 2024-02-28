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
		let notAvailableCards = [];
		for (const offerCard of bestOfferCards) {
			const foundCard = allCards.find((card) => card.card_key === offerCard.cardKey);
			if (foundCard) {
				// expecting value should be found
				bestCards.push({ ...offerCard, ...foundCard });
			} else {
				// get & add - not found card from master table
				bestCards.push(offerCard);
				notAvailableCards.push(offerCard);
			}
		}
		setSuggestedCards(bestCards);
		addCardDetail(notAvailableCards, bestCards);
	}, [bestOfferCards]);
	// add card detail
	const addCardDetail = async (notAvailableCards, bestCards) => {
		let newAddedCards = [];
		for (const offerCard of notAvailableCards) {
			const addedCard = await postCall("addCardDetail", { card_key: offerCard.cardKey }, dispatch, router);
			if (addedCard && addedCard.card_key) {
				allCards.push(addedCard);
				newAddedCards.push(addedCard);
			}
			// append card-image
			if (newAddedCards.length === notAvailableCards.length) {
				let dataList = [];
				for (const bestCard of bestCards) {
					const foundCard = allCards.find((card) => card.card_key === bestCard.cardKey);
					if (foundCard) {
						dataList.push({ ...bestCard, ...foundCard });
					} else {
						dataList.push(bestCard);
					}
				}
				setSuggestedCards(JSON.parse(JSON.stringify(dataList)));
			}
		}
	};
	// best offer list toggle - top 10/ show all
	const handleListToggle = () => {
		setIsMore(!isMore);
		const savedCardOfferTitle = document.getElementById("savedCardOfferTitle");
		setTimeout(() => {
			window.scrollTo({ top: savedCardOfferTitle.offsetTop, left: savedCardOfferTitle.offsetTop, behavior: "smooth" });
		}, 10);
	};
	return (
		suggestedCards.length > 0 && (
			<section className="best-offer-section mb">
				<div className="container">
					<div id="bestOffersTitle" className="text-center">
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
																<strong>{card.spendBonusDesc ? card.spendBonusDesc : "-"}</strong>
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
						{suggestedCards.length > displayLimit && (
							<div className="row gy-4">
								<div className="col-md-10"></div>
								<div className="col-md-2 text-end mt-5 pe-4">
									<a href="#" className="loadmore" onClick={() => handleListToggle()}>
										{isMore ? "Load More" : `Top ${displayLimit}`}
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
