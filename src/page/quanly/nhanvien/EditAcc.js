import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";

const EditAccountModal = ({ show, onClose, onSubmit, itemToEdit }) => {
  const [formData, setFormData] = useState({
    Username: itemToEdit.Username,
    Password: itemToEdit.Password,
  });
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        Username: itemToEdit.Username,
        Password: itemToEdit.Password,
      });
    }
  }, [itemToEdit]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission here
    onSubmit(formData); // Pass the updated username and password to the parent component
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
            />
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
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAccountModal;
