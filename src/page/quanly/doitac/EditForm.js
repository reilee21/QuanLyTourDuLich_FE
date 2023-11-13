import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditDoiTacModal = ({ show, onClose, onSubmit, itemToEdit }) => {
  const [formData, setFormData] = useState({
    tenDoiTac: "",
    email: "",
    sdt: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        tenDoiTac: itemToEdit.ten,
        email: itemToEdit.email,
        sdt: itemToEdit.sdt,
      });
    }
  }, [itemToEdit]);

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
        <Modal.Title>Chỉnh sửa Đối Tác</Modal.Title>
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
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDoiTacModal;
