import BannerSection from "../../component/LandingPage/BannerSection";
import Savecard from "../../component/LandingPage/Savecard";
import ExploreOffer from "../../component/LandingPage/ExploreOffer";
import BestOffer from "../../component/LandingPage/BestOffer";
import AvailableOffer from "../../component/LandingPage/AvailableOffer";
import { useEffect, useState } from "react";
import { config } from "../../utils/config";
import axios from "axios";
// import {
//   handleStartLoading,
//   handleStopLoading,
// } from "../../redux/loader/loaderSlice";
import { useAppDispatch } from "../../redux/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const [cardDataList, setCardDataList] = useState();
  const [spendBonusCategoryList, setspendBonusCategoryList] = useState();

  const getCards = async () => {
    try {
      // dispatch(handleStartLoading());
      const data = await axios.post(`${config.apiURL}/getAllCards`, {
        // headers: authHeader,
      });
      const cardList = data?.data;
      const cardIssuerList = Array.from(
        new Set(cardList.map((card) => card.cardIssuer))
      );

      const cardGrouping = cardIssuerList.reduce((acc, cardIssuer) => {
        const associatedCards = cardList.filter(
          (card) => card.cardIssuer === cardIssuer
        );
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
        // dispatch(handleStopLoading());
        return acc;
      }, []);
      // dispatch(handleStopLoading());
      setCardDataList(cardGrouping);
    } catch (error) {
      // dispatch(handleStopLoading());
    }
  };

  const getSpendBonusCategoryList = async () => {
    try {
      // dispatch(handleStartLoading());
      const data = await axios.post(
        `${config.apiURL}/spendBonusCategoryList`
        //  { headers: authHeader }
      );
      // dispatch(handleStopLoading());
      const categoryGroupList = data?.data;
      const result = categoryGroupList
        ?.map(({ spendBonusCategoryGroup, spendBonusSubcategoryGroup }) => {
          const groupChildrenList = spendBonusSubcategoryGroup
            .filter(
              (subGroupData) => subGroupData.spendBonusCategory?.length > 0
            )
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
      // dispatch(handleStopLoading());
    }
  };

  useEffect(() => {
    getCards();
    getSpendBonusCategoryList();
  }, []);
  return (
    <>
      <BannerSection />
      {/* <BannerBottom /> */}
      <Savecard cardDataList={cardDataList} />
      <ExploreOffer spendBonusCategoryList={spendBonusCategoryList} />
      <AvailableOffer />
      <BestOffer />
    </>
  );
}
