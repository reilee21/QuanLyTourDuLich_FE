import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditCustomerAccountModal = ({ show, onClose, onSubmit, itemToEdit }) => {
  const [formData, setFormData] = useState({ ...itemToEdit });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa tài khoản khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={formData.Password}
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
          Lưu chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCustomerAccountModal;
