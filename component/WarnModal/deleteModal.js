import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdTrash } from "react-icons/io";

const DeleteModel = ({ isShow, onClose, onDelete }) => {
  return (
    <>
      <Modal
        className="warn-modal"
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isShow}
        onHide={onClose}
      >
        <Modal.Body>
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
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => onDelete()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModel;
