import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from "../../redux/store";
import { getLoggedEmail, defaultMessageObj } from "../../utils/config";
import DeleteModel from "../WarnModal/deleteModal";
import { handleStartLoading, handleStopLoading, showMessage } from "../../redux/loader/loaderSlice";
import { postCall } from "../../services/apiCall";
import DropdownWithCheckbox from "./DropdownWithCheckbox";

const Savecard = ({ cardDataList, onSavedCards }) => {
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
			// dispatch(handleStartLoading());
			const response = await postCall("getUserByEmail", { email: getLoggedEmail() });
			if (response.email) {
				dispatch(handleStopLoading());
				setUserData(response);
				// set saved cards
				if (response.card_keys && cardDataList[0].options?.length > 0) {
					const cardKeys = response.card_keys.split(",");
					let savedSelectionList = [];
					for (const cardKey of cardKeys) {
						const found = cardDataList[0].options.find((data) => data.value === cardKey);
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
		} catch (error) {
			console.error(error);
		}
	};
	// on save cards
	const onSave = async (isUpdateUserCall = true, savedSelectionList) => {
		try {
			if (isUpdateUserCall) {
				dispatch(handleStartLoading());
				savedSelectionList = selAvailableCards;
			}
			let result = [];
			for (const selCard of savedSelectionList) {
				const response = await postCall("cardDetailByCardKey", { cardKey: selCard.value });
				if (response?.length > 0) {
					if (response[0].baseSpendAmount && response[0].baseSpendEarnCurrency) {
						result.push({ ...response[0], ...selCard });
					}
				}
			}
			// setSelAvailableCards([]);
			setSelSavedCards(result);
			onSavedCards(result);
			if (result.length > 0 && isUpdateUserCall) {
				const cardKeys = result.map((card) => card.value);
				await updateUserCards(cardKeys.join(","));
			}
		} catch (error) {
			console.error(error);
		}
	};
	// on available card selection
	const onAvailableCardSelection = (selDataList) => {
		if (selDataList.length > selectionLimit) {
			dispatch(
				showMessage({
					...defaultMessageObj,
					type: "error",
					messageText: `Max ${selectionLimit} selection allow`,
				})
			);
		} else {
			setSelAvailableCards(selDataList);
		}
	};
	// remove specific card
	const removeUserCard = async () => {
		dispatch(handleStartLoading());
		setIsShowDeleteModel(false);
		const filterSavedCards = selSavedCards.filter((card) => card.cardKey !== deleteCardId);
		setSelSavedCards(filterSavedCards);
		onSavedCards(filterSavedCards);
		const filterAvailableCards = selAvailableCards.filter((card) => card.value !== deleteCardId);
		setSelAvailableCards(filterAvailableCards);
		const cardKeys = filterAvailableCards.map((card) => card.value);
		await updateUserCards(cardKeys.join(","));
	};

	// cardKeys = cardKey(s) - either one or multiple keys will be update
	const updateUserCards = async (cardKeys) => {
		try {
			const params = { email: getLoggedEmail(), cardKeys: cardKeys };
			const response = await postCall("updateUserCards", params);
			if (response.email) {
				console.log("card saved successfully");
			}
			dispatch(handleStopLoading());
		} catch (error) {
			setSelAvailableCards([]);
			console.error(error);
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
									isOptionDisabled={() => selAvailableCards.length >= selectionLimit}
									placeholder={
										<>
											<IoSearch />
											&nbsp; Search Card Here
										</>
									}
								/>
								{/* <DropdownWithCheckbox items={cardDataList} selAvailableCards={selAvailableCards} selectionLimit={selectionLimit} onAvailableCardSelection={onAvailableCardSelection} /> */}
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
										{selSavedCards.map((card, index) => {
											return (
												<div className="col-12 col-sm-6 col-md-6 col-lg-4" key={index}>
													<div className="best-offer-main">
														<div className="best-card-box">
															<div className="card-box">
																<Image src={card.card_image_url} alt="N/A" fill />
															</div>
															<div className="card-content">
																<h4>{card.cardName}</h4>
															</div>
															<div
																className="card-box remove-icon"
																onClick={() => {
																	setIsShowDeleteModel(true);
																	setDeleteCardId(card.cardKey);
																}}>
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
					onClose={() => {
						setIsShowDeleteModel(false);
						setDeleteCardId(null);
					}}
					onDelete={removeUserCard}
				/>
			</section>
		</>
	);
};

export default Savecard;
