import React, { useState } from "react";
import Select from "react-select";
import { postCall } from "../../services/apiCall";
import { useAppDispatch } from "../../redux/store";
import { useRouter } from "next/router";
import { handleStartLoading, handleStopLoading } from "../../redux/loader/loaderSlice";

const ExploreOffer = ({ spendBonusCategoryList, savedCardList, onAvailableOffers, onBestOffers, onOffersChecked, allCards }) => {
	const [groupCatagories, setGroupCatagories] = useState([]);
	const [selCategory, setSelCategory] = useState();
	const dispatch = useAppDispatch();
	const router = useRouter();

	// on group changed
	const onGroupChanged = (val) => {
		setSelCategory(null);
		setGroupCatagories(val?.categoryChildrenList);
	};
	// on category changed
	const onCategoryChanged = (selData) => {
		setSelCategory(selData);
	};

	// get card offers
	const getCardOffers = async () => {
		dispatch(handleStartLoading());
		const categoryWiseCards = await spendBonusCategoryCard(selCategory.value);
		let foundCards = [];
		let notFoundCards = [];
		for (const cardCategoryData of categoryWiseCards) {
			if (cardCategoryData.earnMultiplier > 0 && cardCategoryData.spendBonusDesc) {
				const cardKey = cardCategoryData["cardKey"];
				const dbCard = allCards.find((ac) => ac.card_key === cardKey);
				const found = savedCardList.find((card) => card.value === cardKey);
				if (found) {
					foundCards.push({ ...cardCategoryData, ...found, ...dbCard });
				} else {
					notFoundCards.push({ ...cardCategoryData, ...dbCard });
				}
			}
		}
		// sorting on descending to order to show highest discount on top in the list
		foundCards = foundCards.sort((a, b) => (a.earnMultiplier < b.earnMultiplier ? 1 : -1));
		notFoundCards = notFoundCards.sort((a, b) => (a.earnMultiplier < b.earnMultiplier ? 1 : -1));
		onOffersChecked(true);
		onAvailableOffers(foundCards);
		onBestOffers(notFoundCards);
		dispatch(handleStopLoading());
	};
	// spend bonus category card - get category associated cards
	const spendBonusCategoryCard = async () => {
		let categoryWiseCards = [];
		try {
			const response = await postCall(
				"spendBonusCategoryCard",
				{
					spendBonusCategoryId: selCategory.value,
				},
				dispatch,
				router
			);
			if (response?.length > 0) {
				categoryWiseCards = response;
			}
		} catch (error) {
			console.error(error);
		} finally {
			return categoryWiseCards;
		}
	};
	return (
		<section className="explore-offer-section mb">
			<div className="container">
				<div className="text-center">
					<h3 className="title">Explore Offers</h3>
					<p className="subtitle">
						Select your cards to unlock more offers <br /> for different categories
					</p>
				</div>
				{/* Offer Input Start */}
				<div className="explore-offer-inn"></div>

				{/* New Design Card Explore */}
				<div className="explore-offer-dropdown">
					<div className="row gy-4">
						<div className="col-12 col-sm-6 col-md-6 col-lg-3">
							<Select name="checkoffer" options={spendBonusCategoryList} className="form-select" onChange={(val) => onGroupChanged(val)} classNamePrefix="select" placeholder={"Select Group"} />
						</div>
						<div className="col-12 col-sm-6 col-md-6 col-lg-7">
							<Select name="checkoffer" options={groupCatagories} className="form-select" onChange={onCategoryChanged} value={selCategory} classNamePrefix="select" placeholder={"Check Category"} isDisabled={groupCatagories.length === 0} />
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-2  text-center">
							<button type="button" className="btn" onClick={getCardOffers}>
								Check Offer
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ExploreOffer;
