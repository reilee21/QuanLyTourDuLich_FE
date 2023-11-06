import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import data from "./data";
const AddFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tenPhuongTien: "",
    moTa: "",
    doiTac: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newItem = {
      stt: data.length + 1,
      tenPhuongTien: formData.tenPhuongTien,
      moTa: formData.moTa,
      doiTac: formData.doiTac,
    };
    data.push(newItem);
    onClose();
    onSubmit(newItem);
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
            <Form.Label>Đối tác</Form.Label>
            <Form.Control
              type="text"
              name="doiTac" // Corrected to "doiTac"
              value={formData.doiTac}
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
