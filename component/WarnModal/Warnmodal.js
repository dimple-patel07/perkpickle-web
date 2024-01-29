import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdClose, IoMdTrash } from "react-icons/io";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { images } from "../Images";
import { useSelector } from "react-redux";
import {
  handleShowWarnModal,
  warnModalSelector,
} from "../../redux/warnModel/warnModelSlice";
import { useAppDispatch } from "../../redux/store";
import { handleCloseAllModal } from "../../redux/modal/modalSlice";

const WarnModal = () => {
  const dispatch = useAppDispatch();
  const warnModelSelector = useSelector(warnModalSelector);
  const handleClose = () => {
    dispatch(
      handleShowWarnModal({
        isShow: false,
        modelType: "",
        modelMessage: "",
      })
    );
  };
  return (
    <Modal
      className="warn-modal"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={warnModelSelector.isShow}
      onHide={handleClose}
    >
      <Modal.Body>
        {/* Delete Oops Modal */}

        {warnModelSelector.modelType === "error" && (
          <div className="warn-modal-box">
            <div className="modal-icon">
              <IoMdClose />
            </div>
            <div className="modal-text">
              <strong>Oops!</strong>
              <p>{warnModelSelector.modelMessage}</p>
              <div className="modal-btn">
                <button
                  type="button"
                  className="btn me-4"
                  onClick={handleClose}
                >
                  Try Again
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    handleClose();
                    dispatch(handleCloseAllModal());
                  }}
                >
                  Try Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}

        {warnModelSelector.modelType === "DeleteOopsModal" && (
          <div className="warn-modal-box">
            <div className="modal-icon">
              <IoMdTrash />
            </div>
            <div className="modal-text">
              <strong>Are you Sure?</strong>
              <p>Are you sure you want to delete this card?</p>
              <div className="modal-btn">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    handleClose();
                    dispatch(handleCloseAllModal());
                  }}
                >
                  Cancel
                </button>
                <button type="button" className="btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card Added */}

        {warnModelSelector.modelType === "AddedCardModal" && (
          <div className="warn-modal-box">
            <div className="card-img">
              <Image src={images.ModalCardImg} alt="card-img"/>
            </div>
            <div className="modal-text">
              <strong>Card Added</strong>
              <p>Your card has been added successfully.</p>
              <div className="modal-btn">
                <button type="button" className="btn continue">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}

        {warnModelSelector.modelType === "success" && (
          <div className="warn-modal-box">
            <div className="modal-icon bg-success">
              <FaCheck />
            </div>
            <div className="modal-text">
              <strong>Success!</strong>
              <p>{warnModelSelector.modelMessage}</p>
              <div className="modal-btn">
                <button
                  type="button"
                  className="btn continue"
                  onClick={handleClose}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WarnModal;
