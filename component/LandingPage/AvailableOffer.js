import React from "react";
import Image from "next/image";

const AvailableOffer = ({ availableOffers, savedCardList }) => {
	const getCurrency = (card) => {
		let result = "-";
		if (card.baseSpendAmount) {
			if (card.baseSpendEarnCurrency === "miles" || card.baseSpendEarnCurrency === "points") {
				result = `X ${card.baseSpendAmount} ${card.baseSpendEarnCurrency}`;
			} else if (card.baseSpendEarnCurrency === "cashback") {
				result = `${card.baseSpendAmount} %`;
			} else {
				result = `${card.baseSpendAmount} ${card.baseSpendEarnCurrency}`;
			}
		}

		return result;
	};
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
													{/* X 3 mile */}
													{getCurrency(card)}
												</p>
												<span>{card.spendBonusDesc ? card.spendBonusDesc : card.baseSpendAmount ? "-" : "No offer available on selected category"}</span>
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
													{getCurrency(card)}
													{/* {card.baseSpendEarnCashValue} ({card.baseSpendAmount} / {card.baseSpendEarnCurrency}) */}
												</p>
												<span>{card.signupBonusDesc ? card.signupBonusDesc : card.baseSpendAmount ? "-" : "No offer available on selected card"}</span>
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
