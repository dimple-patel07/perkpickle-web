import BannerSection from "../../component/LandingPage/BannerSection";
import BannerSection2 from "../../component/LandingPage/BannerSection2";
import BannerSection3 from "../../component/LandingPage/BannerSection3";
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
import { useSelector } from "react-redux";
import { emailStoreSelectore } from "../../redux/emailStore/emailStoreSlice";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [cardDataList, setCardDataList] = useState();
	const [allCards, setAllCards] = useState();
	const [spendBonusCategoryList, setSpendBonusCategoryList] = useState();
	const [savedCardList, setSavedCardList] = useState([]);
	const [availableOffers, setAvailableOffers] = useState([]);
	const [bestOfferCards, setBestOfferCards] = useState([]);
	const [isOfferChecked, setIsOfferChecked] = useState(false);
	const token = useSelector(emailStoreSelectore).token;

	useEffect(() => {
		dispatch(handleStartLoading());
		getAllCards();
	}, []);
	// get all cards
	const getAllCards = async () => {
		try {
			const cardList = await postCall("getAllCards", {}, dispatch, router, false);
			if (cardList?.length > 0) {
				setAllCards(cardList);
				const cardIssuerList = Array.from(new Set(cardList.map((card) => card.cardIssuer)));
				const cardGrouping = cardIssuerList.reduce((acc, cardIssuer) => {
					const associatedCards = cardList.filter((card) => card.cardIssuer === cardIssuer);
					// ...card ; will be use in SaveCard.js
					const options = associatedCards.map((card) => ({
						...{
							label: card.card_name,
							value: card.card_key,
						},
						...card,
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
			}
		} catch (error) {
			console.error(error);
		}
	};
	// get spend bonus category list
	const getSpendBonusCategoryList = async () => {
		try {
			const isLatest = false; // set true for latest rapid api data
			const categoryGroupList = await postCall("spendBonusCategoryList", { isLatest: isLatest }, dispatch, router, false);
			if (categoryGroupList?.length > 0) {
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
				setSpendBonusCategoryList(result);
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleSavedCards = async (val) => {
		setAvailableOffers([]);
		setBestOfferCards([]);
		setIsOfferChecked(false);
		setSavedCardList(JSON.parse(JSON.stringify(val)));
	};
	return (
		<>
			{/* <BannerSection /> */}
			{/* <BannerBottom /> */}
			{/* saved cards */}
<Carousel interval={5000}>

<Carousel.Item>
   <BannerSection />
	<Carousel.Caption>		
	</Carousel.Caption>
</Carousel.Item>

<Carousel.Item>	
<BannerSection2 />
	<Carousel.Caption>

	</Carousel.Caption>
</Carousel.Item>

<Carousel.Item>
	<BannerSection3 />
	<Carousel.Caption>
		
	</Carousel.Caption>
</Carousel.Item>

</Carousel>

			{token && <Savecard cardDataList={cardDataList} onSavedCards={async (val) => await handleSavedCards(val)} />}

			{token && savedCardList.length > 0 && spendBonusCategoryList?.length > 0 && (
				<>
					{/* explore offers */}
					<ExploreOffer spendBonusCategoryList={spendBonusCategoryList} savedCardList={savedCardList} onAvailableOffers={(val) => setAvailableOffers(val)} onBestOffers={(val) => setBestOfferCards(val)} onOffersChecked={(val) => setIsOfferChecked(val)} allCards={allCards} />
					{/* available offers */}
					{isOfferChecked && availableOffers.length > 0 && <AvailableOffer availableOffers={availableOffers} />}
					{/* best offers */}
					{isOfferChecked && bestOfferCards.length > 0 && <BestOffer bestOfferCards={bestOfferCards} allCards={allCards} />}
				</>
			)}
		</>
	);
};

export default withAuth(Home);
