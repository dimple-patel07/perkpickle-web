import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Select, { components } from "react-select";
import { useAppDispatch } from "../../redux/store";
import { getLoggedEmail } from "../../utils/config";
import DeleteModel from "../WarnModal/deleteModal";
import { handleStartLoading, handleStopLoading, showMessage } from "../../redux/loader/loaderSlice";
import { postCall } from "../../services/apiCall";
import { useRouter } from "next/router";
import { defaultMessageObj } from "../../utils/config";
import { images } from "../Images";

const Savecard = ({ cardDataList, onSavedCards }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const selectionLimit = 10; // card selection limit
	const searchIcon = <Image src={images.SearchIcon} height={20} width={20} alt="search.." />;
	const [selAvailableCards, setSelAvailableCards] = useState([]);
	const [selSavedCards, setSelSavedCards] = useState([]);
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
			const response = await postCall("getUserByEmail", { email: getLoggedEmail() }, dispatch, router, false);
			if (response) {
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
						// setSelSavedCards(savedSelectionList);
						// dispatch(handleStopLoading());
						await onSave(false, savedSelectionList);
					} else {
						dispatch(handleStopLoading());
					}
				} else {
					dispatch(handleStopLoading());
				}
			}
		} catch (error) {
			console.error(error);
		}
	};
	// get saved cards
	const getSavedCards = async (savedOrAddedList) => {
		return new Promise(async (resolve) => {
			let result = [];
			for (const selCard of savedOrAddedList) {
				const response = await postCall("cardDetailByCardKey", { cardKey: selCard.value }, dispatch, router, false);
				if (response?.length > 0) {
					// if (response[0].baseSpendAmount && response[0].baseSpendEarnCurrency) {
					result.push({ ...response[0], ...selCard });
					// }
				}
			}
			if (savedOrAddedList.length === result.length) {
				resolve(result);
			}
		});
	};
	// on save cards
	const onSave = async (isUpdateUserCall = true, savedOrAddedList) => {
		try {
			if (isUpdateUserCall) {
				dispatch(handleStartLoading());
			}
			let result = await getSavedCards(savedOrAddedList);
			const mergedResult = [...selSavedCards, ...result];
			setSelSavedCards(mergedResult);
			onSavedCards(mergedResult);
			if (mergedResult.length > 0 && isUpdateUserCall) {
				const cardKeys = mergedResult.map((card) => card.value);
				await updateUserCards(cardKeys.join(","));
			}

			if (isUpdateUserCall) {
				dispatch(
					showMessage({
						...defaultMessageObj,
						type: "success",
						messageText: "card saved successfully",
					})
				);
			}
			dispatch(handleStopLoading());
		} catch (error) {
			console.error(error);
		}
	};
	// on available card selection
	const onAvailableCardSelection = async (selDataList) => {
		dispatch(handleStartLoading());
		setSelAvailableCards(selDataList);
		onSave(true, [selDataList[selDataList.length - 1]]);
	};
	// remove specific card
	const removeUserCard = async () => {
		setIsShowDeleteModel(false);
		dispatch(handleStartLoading());
		const filterSavedCards = selSavedCards.filter((card) => card.cardKey !== deleteCardId);
		setSelSavedCards(filterSavedCards);
		onSavedCards(filterSavedCards);
		setSelAvailableCards(filterSavedCards);
		const selCardFound = selSavedCards.find((card) => card.cardKey === deleteCardId);
		if (selCardFound) {
			const cardKeys = filterSavedCards.map((card) => card.value);
			await updateUserCards(cardKeys.join(","), true);
		} else {
			dispatch(handleStopLoading());
		}
	};

	// cardKeys = cardKey(s) - either one or multiple keys will be update
	const updateUserCards = async (cardKeys, isDeleted = false) => {
		try {
			const params = { email: getLoggedEmail(), cardKeys: cardKeys };
			const response = await postCall("updateUserCards", params, dispatch, router);
			if (response.email) {
				console.log("card updated successfully");
			}
			if (isDeleted) {
				setTimeout(() => {
					dispatch(handleStopLoading());
				}, 1000);
			}
		} catch (error) {
			setSelAvailableCards([]);
			console.error(error);
		}
	};
	// hide close icon from selected dropdown value
	const multiSelectDropdownStyles = {
		multiValueRemove: (styles, { data }) => ({
			...styles,
			display: "none",
		}),
	};

	const ValueContainer = ({ children, ...props }) => {
		let [values, input] = children;
		if (Array.isArray(values)) {
			const plural = values.length === 1 ? "" : "s";
			values = searchIcon;
		}
		const style = { cursor: "pointer" };
		return (
			<components.ValueContainer {...props}>
				<span style={style}>{values}</span>
				{input}
			</components.ValueContainer>
		);
	};

	return (
		<>
			<section className="savecard-section mb mt-5">
				<div className="container">
					<div className="text-center">
						<h3 className="title">{selSavedCards.length > 0 ? "Your Saved Cards" : "Add Your Cards"}</h3>
						<p className="subtitle">
							Manage more cards so we can find <br /> best offers for you
						</p>
					</div>
					<div className="savecard-inn">
						{selSavedCards.length > 0 && (
							<div className="row">
								<p>
									saved card{selSavedCards.length === 1 ? "" : "s"} {selSavedCards.length}
								</p>
							</div>
						)}
						<div className="row">
							<div className="col-12 col-sm-12 col-md-12 col-lg-12">
								<Select
									isMulti
									name="multiSelectCardsDropdown"
									options={cardDataList}
									className="basic-multi-select search-icon"
									classNamePrefix="select"
									onChange={onAvailableCardSelection}
									value={selAvailableCards}
									styles={multiSelectDropdownStyles} // hide close from selected value
									isOptionDisabled={() => selAvailableCards.length >= selectionLimit}
									components={{ ClearIndicator: () => null, ValueContainer }} // hide clear indicator
									backspaceRemovesValue={false} // prevent backspace & delete key
									placeholder={searchIcon}
								/>
							</div>

							{/* <div className="col-12 col-sm-12 col-md-12 col-lg-2 text-center">
								<button type="button" className="btn" onClick={() => onSave()}>
									Save Cards
								</button>
							</div> */}
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
																<Image src={card.card_image_url ? card.card_image_url : images.NoImageAvailable} alt="N/A" fill />
															</div>
															<div className="card-content">
																<h4>{card.card_name}</h4>
															</div>
															<div
																className="card-box remove-icon"
																onClick={() => {
																	setIsShowDeleteModel(true);
																	setDeleteCardId(card.card_key);
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
