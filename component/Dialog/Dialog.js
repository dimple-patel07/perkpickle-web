import React from "react";
import { Modal } from "react-bootstrap";

const Dialog = (props) => {
  const { open, onClose, children } = props;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="login-modal"
      show={open}
      onHide={onClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="p-0">
        <div className="modal-inn">{children}</div>
      </Modal.Body>
    </Modal>
  );
};

Dialog.defaultProps = {
  title: "",
  open: false,
  onClose: () => {},
  children: undefined,
  extraClass: "",
};

export default Dialog;
