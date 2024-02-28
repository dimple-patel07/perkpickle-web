import React from "react";
import Image from "next/image";
import { formatCardCurrency, getCardImage } from "../../utils/config";
const AvailableOffer = ({ availableOffers }) => {
	return (
		<section className="available-offer mb">
			<div className="container">
				<div id="savedCardOfferTitle" className="text-center">
					<h3 className="title">Saved Card Offers</h3>
					<p className="subtitle">
						Select your offer <br /> for different categories
					</p>
				</div>
				<div className="available-inn">
					{/* <div className="heading">
						<div className="row mb-3 pb-2 border-bottom">
							<div className="col-md-1 col-sm-12"></div>
							<div className="col-md-3 text-center col-sm-12"><b>Credit Card</b></div>
							<div className="col-md-4 text-center col-sm-12"><b>Rewards rate</b></div>
							<div className="col-md-4 text-center col-sm-12"><b>Description</b></div>
						</div>
					</div> */}
					<div className="list">
						{availableOffers.length > 0 && (
							// offers available on selected cards
							<table key="availableOfferList" className="table-blue">
								<tbody>
									<tr key="header" className="border-bottom">
										<td className="mb-2 mt-2 me-0" width="10%"></td>
										<td className="text-center text-wrap table-blue" width="30%">
											<b>Credit Card</b>
										</td>
										<td className="text-center text-wrap table-blue" width="20%">
											<b>Rewards rate</b>
										</td>
										<td className="text-center text-wrap" width="40%">
											<b>Description</b>
										</td>
									</tr>
									{availableOffers.map((card, index) => {
										return (
											<tr key={index} className="border-bottom">
												<td className="mb-2 mt-2 me-0">
													<Image src={getCardImage(card)} alt="N/A" width="50" height="50" className="available-card-img" />
												</td>
												<td className="text-center text-wrap">{card.card_name}</td>
												<td className="text-center text-wrap">{formatCardCurrency(card.earnMultiplier ? card.earnMultiplier : card.baseSpendAmount, card.spendType ? card.spendType : card.baseSpendEarnCurrency)}</td>
												<td className="text-center text-wrap">{card.spendBonusDesc ? card.spendBonusDesc : card.signupBonusDesc ? card.signupBonusDesc : "-"}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AvailableOffer;
