import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from "../../redux/store";
import { handleShowWarnModal } from "../../redux/warnModel/warnModelSlice";
import axios from "axios";
import { authHeader, config, getLoggedEmail } from "../../utils/config";
import DeleteModel from "../WarnModal/deleteModal";
import { handleStartLoading, handleStopLoading } from "../../redux/loader/loaderSlice";

const Savecard = ({ cardDataList }) => {
  const dispatch = useAppDispatch();
  const selectionLimit = 10; // card selection limit
  const [selAvailableCards, setSelAvailableCards] = useState([]);
  const [selSavedCards, setSelSavedCards] = useState([]);
  const [userData, setUserData] = useState();
  const [isShowDeleteModel, setIsShowDeleteModel] = useState();
  const [deleteCardId, setDeleteCardId] = useState();

  useEffect(() => {
    if (cardDataList?.length > 0) {
      getUserByEmail();
    }
  }, [cardDataList]);
  // get user by email
  const getUserByEmail = async () => {
    try {
      dispatch(handleStartLoading());
      const params = { email: getLoggedEmail() };
      const response = await axios.post(
        `${config.apiURL}/getUserByEmail`,
        params,
        // { headers: authHeader }
      );
      if (response?.data?.email) {
        dispatch(handleStopLoading());
        // expecting success response
        // setCookie("userName", `${response?.data?.first_name}${response?.data?.last_name}`);
        setUserData(response.data);
        // set saved cards
        const userCards = response.data;
        if (userCards.card_keys && cardDataList[0].options?.length > 0) {
          const cardKeys = userCards.card_keys.split(",");
          let savedSelectionList = [];
          for (const cardKey of cardKeys) {
            const found = cardDataList[0].options.find(
              (data) => data.value === cardKey
            );
            if (found) {
              savedSelectionList.push(found);
            }
          }
          if (savedSelectionList.length > 0) {
            setSelAvailableCards(savedSelectionList);
            onSave(false, savedSelectionList);
          }
        }
      }
    } catch (errorObj) {
      dispatch(handleStopLoading());
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: errorObj?.response?.data?.error,
        })
      );
    }
  };
  // on save cards
  const onSave = async (isUpdateUserCall = true, savedSelectionList) => {
    if (isUpdateUserCall) {
      savedSelectionList = selAvailableCards;
    }
    let result = [];
    for (const selCard of savedSelectionList) {
      const params = { cardKey: selCard.value };
      const response = await axios.post(
        `${config.apiURL}/cardDetailByCardKey`,
        params,
        // { headers: authHeader }
      );
      if (response?.data) {
        const cardDetail = response.data;
        if (
          cardDetail?.length > 0 &&
          cardDetail[0].baseSpendAmount &&
          cardDetail[0].baseSpendEarnCurrency
        ) {
          result.push({ ...cardDetail[0], ...selCard });
        }
      }
    }
    // setSelAvailableCards([]);
    setSelSavedCards(result);
    if (result.length > 0 && isUpdateUserCall) {
      const cardKeys = result.map((card) => card.value);
      await updateUserCards(cardKeys.join(","));
    }
  };
  // on available card selection
  const onAvailableCardSelection = (selDataList) => {
    if (selDataList.length > selectionLimit) {
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: `Max ${selectionLimit} selection allow`,
        })
      );
    } else {
      setSelAvailableCards(selDataList);
    }
  };
  // remove specific card
  const removeUserCard = async () => {
    setIsShowDeleteModel(false);
    await updateUserCards(deleteCardId);
  };

  // cardKeys = cardKey(s) - either one or multiple keys will be update
  const updateUserCards = async (cardKeys) => {
    try {
      dispatch(handleStartLoading());
      const params = { email: getLoggedEmail(), cardKeys: cardKeys };
      const response = await axios.post(
        `${config.apiURL}/updateUserCards`,
        params,
        // { headers: authHeader }
      );
      if (response?.data?.email) {
        dispatch(handleStopLoading());
        console.log("card saved successfully");
      } else {
        dispatch(handleStopLoading());
        setSelAvailableCards([]);
        dispatch(
          handleShowWarnModal({
            isShow: true,
            modelType: "error",
            modelMessage: `saved cards failed`,
          })
        );
      }
    } catch (error) {
      dispatch(handleStopLoading());
      setSelAvailableCards([]);
      dispatch(
        handleShowWarnModal({
          isShow: true,
          modelType: "error",
          modelMessage: `saved cards error`,
        })
      );
    }
  };
  return (
    <>
      <section className="savecard-section mb mt-5">
        <div className="container">
          <div className="text-center">
            <h3 className="title">Your Saved Cards</h3>
            <p className="subtitle">
              Manage more cards so we can find <br /> best offers for you
            </p>
          </div>
          <div className="savecard-inn">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                <Select
                  isMulti
                  name="colors"
                  options={cardDataList}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onAvailableCardSelection}
                  value={selAvailableCards}
                  placeholder={
                    <>
                      <IoSearch />
                      &nbsp; Search Card Here
                    </>
                  }
                />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-2 text-center">
                <button type="button" className="btn" onClick={() => onSave()}>
                  Save Cards
                </button>
              </div>
            </div>
            {/* Save Card Show */}
            <div className="save-card-show">
              {selSavedCards.length > 0 ? (
                <>
                  <div className="row gy-4">
                    {/* <div className="spinner-border" role="status"></div> */}
                    {selSavedCards.map((card, index) => {
                      return (
                        <div
                          className="col-12 col-sm-6 col-md-6 col-lg-4"
                          key={index}
                        >
                          <div className="best-offer-main">
                            <div className="best-card-box">
                              <div className="card-box">
                                <Image
                                  src={card.card_image_url}
                                  alt="N/A"
                                  fill 
                                />
                              </div>
                              <div className="card-content">
                                <h4>{card.cardName}</h4>
                              </div>
                              <div
                                className="card-box remove-icon"
                                onClick={() => {
                                  setIsShowDeleteModel(true);
                                  setDeleteCardId(card);
                                }}
                              >
                                <FaTrash />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <DeleteModel
          isShow={isShowDeleteModel}
          onClose={() => setIsShowDeleteModel(false)}
          onDelete={removeUserCard}
        />
      </section>
    </>
  );
};

export default Savecard;
