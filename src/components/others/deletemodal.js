// DeleteConfirmationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, onCancel, onDelete }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xoá </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn chắc chắn xoá chứ ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={onCancel}>
          Huỷ
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Xoá
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
