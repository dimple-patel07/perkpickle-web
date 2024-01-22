// import pkg/file
import { useEffect, useState } from "react";
import { headerOptions } from "../../config/common-config";
import { ToastContainer, toast } from "react-toastify";
import ReactSelect from "react-select";
// import css
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../styles/Card.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Card() {
	const [allCards, setAllCards] = useState([]);
	const [groupCardList, setGroupCardList] = useState([]);
	const [cardCategoryList, setCardCategoryList] = useState([]);

	const [isSaved, setIsSaved] = useState(false);
	const [selAvailableCards, setSelAvailableCards] = useState([]);
	const [selCardCategoryList, setSelCardCategoryList] = useState([]);

	const [suggestCards, setSuggestCards] = useState([]);
	const [isOffersChecked, setIsOffersChecked] = useState(false);
	const [matchCards, setMatchCards] = useState([]);

	const selectionLimit = 10; // card selection limit

	// on available card selection
	const onAvailableCardSelection = (selDataList) => {
		if (selDataList.length > selectionLimit) {
			toast.error(`Max ${selectionLimit} selection allow`);
		} else {
			setSelAvailableCards(selDataList);
		}
	};

	// on group card changed
	const onGroupCardChange = (selData) => {
		setSelCardCategoryList(null);
		setCardCategoryList(selData.categoryChildrenList);
	};

	// on card category changed
	const onCardCategoryChange = (selData) => {
		setSelCardCategoryList([selData]);
	};

	useEffect(() => {
		getAllCards(); // get all cards
		spendBonusCategoryList(); // get card categories
	}, []);

	// get spend bonus category list - construct category dropdowns
	function spendBonusCategoryList() {
		try {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/spendBonusCategoryList`).then((data) => {
				data.json().then(async (categoryGroupList) => {
					const categoryGroups = categoryGroupList.map((categoryGroupData) => categoryGroupData["spendBonusCategoryGroup"]);
					let result = [];
					for (const categoryGroup of categoryGroups) {
						const subCategoryGroupData = categoryGroupList.find((categoryGroupData) => categoryGroupData["spendBonusCategoryGroup"] === categoryGroup);
						if (subCategoryGroupData?.["spendBonusSubcategoryGroup"]?.length > 0) {
							let groupChildrenList = [];
							for (const subGroupData of subCategoryGroupData["spendBonusSubcategoryGroup"]) {
								let categoryChildrenList = [];
								if (subGroupData["spendBonusCategory"]?.length > 0) {
									for (const categoryData of subGroupData["spendBonusCategory"]) {
										categoryChildrenList.push({
											label: categoryData["spendBonusCategoryName"],
											value: categoryData["spendBonusCategoryId"],
										});
									}
								}
								if (categoryChildrenList.length > 0) {
									groupChildrenList.push({
										label: subGroupData["spendBonusSubcategoryGroup"],
										value: subGroupData["spendBonusSubcategoryGroup"],
										categoryChildrenList: JSON.parse(JSON.stringify(categoryChildrenList)),
									});
								}
							}
							if (groupChildrenList.length > 0) {
								result.push({
									label: categoryGroup,
									value: categoryGroup,
									options: JSON.parse(JSON.stringify(groupChildrenList)),
								});
							}
						}
					}
					setGroupCardList(result);
				});
			});
		} catch (error) {
			console.error("Error :: ", error);
		}
	}
	// spend bonus category card - get category associated cards
	function spendBonusCategoryCard(categoryId) {
		return new Promise((resolve) => {
			let options = headerOptions({ spendBonusCategoryId: categoryId });
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/spendBonusCategoryCard`, options).then((dataList) => {
				dataList?.json().then((cardCategories) => {
					let result = [];
					if (cardCategories?.length > 0) {
						result = cardCategories;
					}
					resolve(result);
				});
			});
		});
	}
	// card detail by card key
	function cardDetailByCardKey(options) {
		return new Promise((resolve) => {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/cardDetailByCardKey`, options).then((cardDetail) => {
				cardDetail?.json().then((cardDetail) => {
					resolve(cardDetail);
				});
			});
		});
	}
	// get card image
	function getCardImage(options) {
		return new Promise((resolve) => {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCardImage`, options).then((cardImageData) => {
				cardImageData?.json().then((cardImageData) => {
					resolve(cardImageData);
				});
			});
		});
	}
	// get card offers
	async function getCardOffers() {
		let categoryWiseCards = [];
		for (const selCardCategory of selCardCategoryList) {
			categoryWiseCards = [...categoryWiseCards, ...(await spendBonusCategoryCard(selCardCategory.value))];
		}
		let foundCards = [];
		let notFoundCards = [];
		for (const cardCategoryData of categoryWiseCards) {
			if (cardCategoryData.earnMultiplier > 0 && cardCategoryData.spendBonusDesc) {
				const cardKey = cardCategoryData["cardKey"];
				const found = selAvailableCards.find((card) => card.value === cardKey);
				if (found) {
					foundCards.push(cardCategoryData);
				} else {
					notFoundCards.push(cardCategoryData);
				}
			}
		}
		setSuggestCards(notFoundCards);
		setMatchCards(foundCards);
		setIsOffersChecked(true);
	}
	// get all cards - construct card selection dropdown
	function getAllCards() {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllCards`).then((cardList) => {
			cardList?.json().then((cardList) => {
				const cardIssuerList = Array.from(new Set(cardList.map((card) => card.cardIssuer)));
				let cardGrouping = [];
				for (const cardIssuer of cardIssuerList) {
					const associatedCards = cardList.filter((card) => card.cardIssuer === cardIssuer);
					let options = [];
					for (const card of associatedCards) {
						options.push({
							label: card.cardName,
							value: card.cardKey,
						});
					}
					cardGrouping.push({
						label: cardIssuer,
						value: cardIssuer,
						options: options,
					});
				}
				// const options = headerOptions({ cardKey: cardKey });
				// const cardDetail = await cardDetailByCardKey(options);
				// const cardImage = await getCardImage(options);
				// cardDataList.push({ ...cardDetail[0], ...cardImage[0] });
				setAllCards(cardGrouping);
			});
		});
	}
	return (
		<>
			{/* card selection */}
			<div className="row p-5">
				<h3>{selAvailableCards.length > 0 ? "Selected" : "Select"} Cards</h3>
				{/* cards */}
				{allCards.length > 0 && (
					<div className="col-4">
						<ReactSelect isMulti name="cardList" className="basic-multi-select" classNamePrefix="select" options={allCards} onChange={onAvailableCardSelection} placeholder="Select Card" value={selAvailableCards} isDisabled={isSaved && !isOffersChecked} />
					</div>
				)}
				<div className="col-2 mt-1">
					<input type="button" value="Save Cards" disabled={(selAvailableCards.length === 0 || isSaved) && !isOffersChecked} onClick={() => setIsSaved(true)} />
				</div>
			</div>
			{/* offers */}
			{selAvailableCards.length > 0 && isSaved && (
				<>
					<div className="row p-5">
						<h3>Explore offers</h3>
						{/* group */}
						{groupCardList.length > 0 && (
							<div className="col-2">
								<ReactSelect name="groupList" className="basic" classNamePrefix="select" options={groupCardList} onChange={onGroupCardChange} placeholder="Select Group" />
							</div>
						)}
						{/* category */}
						{cardCategoryList.length > 0 && (
							<div className="col-4">
								<ReactSelect name="categoryList" className="basic" classNamePrefix="select" options={cardCategoryList} onChange={onCardCategoryChange} placeholder="Select Category" value={selCardCategoryList} />
							</div>
						)}
						<div className="col-2 mt-1">
							<input type="button" value="Check Offers" onClick={getCardOffers} />
						</div>
					</div>
					{/* match cards */}
					{isOffersChecked && (
						<>
							{/* offer available */}
							<div className="row p-5">
								<h3>{matchCards.length > 0 ? "Available offers" : "No offer available"}</h3>
								<table className="m-2">
									<tbody>
										{matchCards.map((card, index) => {
											return (
												<tr key={index}>
													<th>{card.cardName}</th>
													<td>{card.spendBonusDesc}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
							{/* offer suggestion */}
							{suggestCards.length > 0 && (
								<div className="row p-5">
									<h3>Offer Suggestion</h3>
									<table className="m-2">
										<tbody>
											{suggestCards.map((card, index) => {
												return (
													<tr key={index}>
														<th>{card.cardName}</th>
														<td>{card.spendBonusDesc}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</>
					)}
				</>
			)}
			<ToastContainer />
		</>
	);
}
