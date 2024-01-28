import { Inter } from "next/font/google";
import BannerSection from "../component/LandingPage/BannerSection";
import Savecard from "../component/LandingPage/Savecard";
import ExploreOffer from "../component/LandingPage/ExploreOffer";
import BestOffer from "../component/LandingPage/BestOffer";
import BannerBottom from "../component/LandingPage/BannerBottom";
import AvailableOffer from "../component/LandingPage/AvailableOffer";
import { useEffect, useState } from "react";
import { getData } from "../services/apiCall";
import { config } from "../utils/config";
import axios from "axios";

export default function Home() {
	const [cardData, setcardData] = useState();
	const [spendBonusCategoryList, setspendBonusCategoryList] = useState();

	const getCards = async () => {
		const data = await axios.get(`${config.apiURL}/getAllCards`);
		const cardList = data?.data;
		const cardIssuerList = Array.from(new Set(cardList.map((card) => card.cardIssuer)));

		const cardGrouping = cardIssuerList.reduce((acc, cardIssuer) => {
			const associatedCards = cardList.filter((card) => card.cardIssuer === cardIssuer);
			const options = associatedCards.map((card) => ({
				label: card.card_name,
				value: card.card_key,
			}));

			acc.push({
				label: cardIssuer,
				value: cardIssuer,
				options: options,
			});

			return acc;
		}, []);
		setcardData(cardGrouping);
	};

	const getSpendBonusCategoryList = async () => {
		const data = await axios.get(`${config.apiURL}/spendBonusCategoryList`);
		const categoryGroupList = data?.data;
		const result = categoryGroupList
			.map(({ spendBonusCategoryGroup, spendBonusSubcategoryGroup }) => {
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
	};

	useEffect(() => {
		getCards();
		getSpendBonusCategoryList();
	}, []);
	return (
		<>
			<BannerSection />
			{/* <BannerBottom /> */}
			<Savecard cardData={cardData} />
			<ExploreOffer spendBonusCategoryList={spendBonusCategoryList} />
			<AvailableOffer />
			<BestOffer />
		</>
	);
}
