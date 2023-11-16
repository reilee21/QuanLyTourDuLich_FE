import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "../../../api/axios";

const EditFormModal = ({ show, onClose, editData }) => {
  const [formData, setFormData] = useState({
    idPhuongTien: "",
    tenPhuongTien: "",
    moTa: "",
    idDoiTac: null,
  });
  useEffect(() => {
    if (editData) {
      setFormData({
        idPhuongTien: editData.idPhuongTien,

        tenPhuongTien: editData.tenPhuongTien || "",
        moTa: editData.moTa || "",
        idDoiTac: editData.idDoiTac || null,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      axios.put(`api/PhuongTiens/${formData.idPhuongTien}`, formData);

      onClose();
    } catch (e) {
      console.error(e);
    }
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
              name="idDoiTac"
              value={formData.idDoiTac || ""} // Set the value based on formData
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
