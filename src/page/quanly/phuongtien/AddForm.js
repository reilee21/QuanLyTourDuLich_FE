import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../../api/axios";
import data from "./data";
import { useEffect } from "react";
const AddFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tenPhuongTien: "",
    moTa: "",
    idDoiTac: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.idDoiTac == null || formData.idDoiTac.length < 2) {
      const { idDoiTac, ...dataWithoutId } = formData;

      try {
        await axios.post("api/PhuongTiens", dataWithoutId);
        onClose();
      } catch (e) {
        console.error(e);
      }
      return;
    }

    try {
      await axios.post("api/PhuongTiens", formData);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm phương tiện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên Phương tiện</Form.Label>
            <Form.Control
              type="text"
              name="tenPhuongTien"
              value={formData.tenPhuongTien}
              onChange={handleChange}
            />
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              name="moTa" // Corrected to "moTa"
              value={formData.moTa}
              onChange={handleChange}
            />
            <Form.Label>Mã Đối tác</Form.Label>
            <Form.Control
              type="text"
              name="IdDoiTac"
              value={formData.IdDoiTac}
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

export default AddFormModal;
