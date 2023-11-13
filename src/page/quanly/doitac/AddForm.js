import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddDoiTacFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tenDoiTac: "",
    email: "",
    sdt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    onSubmit(formData); // Pass the form data to the parent component
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Đối Tác</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên Đối Tác</Form.Label>
            <Form.Control
              type="text"
              name="tenDoiTac"
              value={formData.tenDoiTac}
              onChange={handleChange}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Huỷ
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Thêm mới
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDoiTacFormModal;
