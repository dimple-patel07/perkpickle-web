import BannerSection from "../../component/LandingPage/BannerSection";
import Savecard from "../../component/LandingPage/Savecard";
import ExploreOffer from "../../component/LandingPage/ExploreOffer";
import BestOffer from "../../component/LandingPage/BestOffer";
import AvailableOffer from "../../component/LandingPage/AvailableOffer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { useRouter } from "next/router";
import { postCall } from "../../services/apiCall";
import { handleStartLoading } from "../../redux/loader/loaderSlice";
import withAuth from "../../utils/withAuth";

const Home = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [cardDataList, setCardDataList] = useState();
	const [allCards, setAllCards] = useState();
	const [spendBonusCategoryList, setspendBonusCategoryList] = useState();
	const [savedCardList, setSavedCardList] = useState([]);
	const [availableOffers, setAvailableOffers] = useState([]);
	const [bestOfferCards, setBestOfferCards] = useState([]);
	const [isOfferChecked, setIsOfferChecked] = useState(false);

	useEffect(() => {
		dispatch(handleStartLoading());
		getAllCards();
	}, []);
	// get all cards
	const getAllCards = async () => {
		try {
			const cardList = await postCall("getAllCards", {}, dispatch, router, false);
			setAllCards(cardList);
			const cardIssuerList = Array.from(new Set(cardList.map((card) => card.cardIssuer)));
			const cardGrouping = cardIssuerList.reduce((acc, cardIssuer) => {
				const associatedCards = cardList.filter((card) => card.cardIssuer === cardIssuer);
				const options = associatedCards.map((card) => ({
					label: card.card_name,
					value: card.card_key,
					card_image_url: card.card_image_url, // will be use in SaveCard.js
				}));

				acc.push({
					label: cardIssuer,
					value: cardIssuer,
					options: options,
				});
				return acc;
			}, []);
			setCardDataList(cardGrouping);
			await getSpendBonusCategoryList();
		} catch (error) {
			console.error(error);
		}
	};
	// get spend bonus category list
	const getSpendBonusCategoryList = async () => {
		try {
			const categoryGroupList = await postCall("spendBonusCategoryList", {}, dispatch, router);
			const result = categoryGroupList
				?.map(({ spendBonusCategoryGroup, spendBonusSubcategoryGroup }) => {
					const groupChildrenList = spendBonusSubcategoryGroup
						.filter((subGroupData) => subGroupData.spendBonusCategory?.length > 0)
						.map(({ spendBonusSubcategoryGroup, spendBonusCategory }) => ({
							label: spendBonusSubcategoryGroup,
							value: spendBonusSubcategoryGroup,

							categoryChildrenList: spendBonusCategory.map((categoryData) => ({
								label: categoryData.spendBonusCategoryName,
								value: categoryData.spendBonusCategoryId,
							})),
						}));

					return (
						groupChildrenList.length > 0 && {
							label: spendBonusCategoryGroup,
							value: spendBonusCategoryGroup,
							options: groupChildrenList,
						}
					);
				})
				.filter(Boolean);
			setspendBonusCategoryList(result);
		} catch (error) {
			console.error(error);
		}
	};
	const handleSavedCards = (val) => {
		setSavedCardList(val);
		setAvailableOffers([]);
		setBestOfferCards([]);
		setIsOfferChecked(false);
	};
	return (
		<>
			<BannerSection />
			{/* <BannerBottom /> */}
			{/* saved cards */}
			<Savecard cardDataList={cardDataList} onSavedCards={(val) => handleSavedCards(val)} />
			{savedCardList.length > 0 && (
				<>
					{/* explore offers */}
					<ExploreOffer spendBonusCategoryList={spendBonusCategoryList} savedCardList={savedCardList} onAvailableOffers={(val) => setAvailableOffers(val)} onBestOffers={(val) => setBestOfferCards(val)} onOffersChecked={(val) => setIsOfferChecked(val)} allCards={allCards} />
					{/* available offers */}
					{isOfferChecked && (availableOffers.length > 0 || savedCardList.length > 0) && <AvailableOffer availableOffers={availableOffers} savedCardList={savedCardList} />}
					{/* best offers */}
					{isOfferChecked && bestOfferCards.length > 0 && <BestOffer bestOfferCards={bestOfferCards} allCards={allCards} />}
				</>
			)}
		</>
	);
}

export default withAuth(Home)