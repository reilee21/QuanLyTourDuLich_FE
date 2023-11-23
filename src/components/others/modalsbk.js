// DeleteConfirmationModal.js
import React from "react";
import { Modal, Button, FormGroup } from "react-bootstrap";
import "./custom.scss";
const SearchBK = ({ show, onCancel, onSubmit }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title> Nhập mã bookings </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input name="bookingid" className="nhapidbk" type="text" />
        <Button className="submitsbk" variant="success" onClick={onSubmit}>
          Tìm
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SearchBK;
