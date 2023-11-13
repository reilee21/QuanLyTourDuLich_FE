import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditFormModal = ({ show, onClose, onSubmit, editData }) => {
  const [formData, setFormData] = useState({}); // Initialize as an empty object

  useEffect(() => {
    setFormData(editData); // Update formData when editData prop changes
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa phương tiện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTenPhuongTien">
            <Form.Label>Tên Phương tiện</Form.Label>
            <Form.Control
              type="text"
              name="tenPhuongTien"
              value={formData.tenPhuongTien || ""} // Set the value based on formData
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formMoTa">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              name="moTa"
              value={formData.moTa || ""} // Set the value based on formData
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDoiTac">
            <Form.Label>Đối tác</Form.Label>
            <Form.Control
              type="text"
              name="doiTac"
              value={formData.doiTac || ""} // Set the value based on formData
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Lưu chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFormModal;
