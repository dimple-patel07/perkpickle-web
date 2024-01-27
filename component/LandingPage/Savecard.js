import React, { useState } from "react";
import { images } from "../Images";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";  
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from "../../redux/store";
import { handleShowWarnModal } from "../../redux/warnModel/warnModelSlice";
import axios from "axios";
import { config } from "../../utils/config";
const Savecard = ({cardData}) => { 
  const dispatch = useAppDispatch();
	const selectionLimit = 1; // card selection limit
  const [selAvailableCards, setSelAvailableCards] = useState([]);
  const [selSavedCards, setSelSavedCards] = useState([]);


	// get card image
	async function getCardImage(params) {
    const response = await axios.post(`${config.apiURL}/getCardImage`,params); // expecting success response
   return response?.data;
	}
  const onSave = async() =>{
    let cardDataList = [];
    for (const selCard of selAvailableCards) {
      const params = { cardKey: selCard.value };
      const response = await axios.post(`${config.apiURL}/cardDetailByCardKey`,params);
			// const options = headerOptions({ cardKey: selCard.value });
			// const cardDetail = await cardDetailByCardKey(options);
      if(response?.data) {
        const cardDetail = response.data;
        if (cardDetail?.length > 0 && cardDetail[0].baseSpendAmount && cardDetail[0].baseSpendEarnCurrency) {
          const cardImage = await getCardImage(params);
          cardDataList.push({ ...cardDetail[0], ...cardImage[0] });
        }
      }
		}
    setSelSavedCards(cardDataList);
  }
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
  const loadImageSrc=({src})=>{
    return src;
  }
  return (
    <>
      <section className="savecard-section mb">
        <div className="container">
          <div className="text-center">
            <h3 className="title">Your Saved Cards</h3>
            <p className="subtitle">
              Manage more cards so we can find <br /> best offers for you
            </p>
          </div>
          <div className="savecard-inn">
            {/* <div className="row justify-content-center justify-content-sm-center justify-content-lg-start">
              <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <div className="card-in position-relative text-center">
                  <Image src={images.Cardtwo} className="img-fluid" />
                  <div className="remove-icon">
                    <FaTrash />
                  </div>
                </div>
              </div>     
              <div className="col-6 col-sm-3 col-md-3 col-lg-2 add-card-inn">
                <div className="text-center">
                    <div className="addcard-box">
                    <FaPlus />
                      <p>Add Card</p>
                    </div>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                <Select
                  isMulti
                  name="colors"
                  options={cardData}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onAvailableCardSelection} 
                  value={selAvailableCards}
                  placeholder={<><IoSearch />&nbsp; Search Card Here</>}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-2 text-center">
               <button type="button" className="btn" onClick={()=>onSave()}>Save Cards</button>
              </div>
            </div>
            {/* Save Card Show */}
            <div className="save-card-show"> 
              {selSavedCards.length>0 ? 
              <div className="row gy-4">
              {
              selSavedCards.map((card, index) => {
                return <div key={index}>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="best-offer-main">
                      <div className="best-card-box">
                        <div className="card-box">
                          <Image loader={() => loadImageSrc(card.cardImageUrl)} src={card.cardImageUrl}  alt="N/A" fill={true}/>
                        </div>
                        <div className="card-content">
                          <h4>{card.cardName}</h4>
                        </div>
                        <div className="card-box remove-icon">
                          <FaTrash />
                        </div>
                    </div>
                    </div>
                  </div> 
                </div>
              })}              
              </div> :<></>
              }

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Savecard;
