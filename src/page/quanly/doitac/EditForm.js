import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../../api/axios";

const EditDoiTacModal = ({ show, onClose, itemToEdit }) => {
  const [formData, setFormData] = useState({
    idDoiTac: "",
    ten: "",
    email: "",
    soDienThoaiDt: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        idDoiTac: itemToEdit.idDoiTac,
        ten: itemToEdit.ten,
        email: itemToEdit.email,
        soDienThoaiDt: itemToEdit.soDienThoaiDt,
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      axios.put(`api/DoiTacs/${formData.idDoiTac}`, formData);

      onClose();
    } catch (e) {
      console.error(e);
    }
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
              name="ten"
              value={formData.ten}
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
              name="soDienThoaiDt"
              value={formData.soDienThoaiDt}
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
