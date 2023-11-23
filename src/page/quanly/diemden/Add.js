import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./index.scss";
import DDiaDiem from "./diadiem";
import axios from "../../../api/axios";

const AddDiemDenFormModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    TenDiemDen: "",
    IdDiaDiem: -1,
    TenDiaDiem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const data = {
      idDiemDen: "",
      tenDiemDen: formData.TenDiemDen,
      idDiaDiem: formData.IdDiaDiem,
    };
    try {
      const res = await axios.post("/api/diemdens", data);
      alert(`Thêm - ${res.tenDiemDen} - thành công`);

      onClose();
    } catch (e) {
      console.log(e);
    }
    setFormData({});
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Điểm Đến</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên Điểm Đến</Form.Label>
            <Form.Control
              type="text"
              name="TenDiemDen"
              value={formData.TenDiemDen}
              onChange={handleChange}
            />
          </Form.Group>
          <DDiaDiem formData={formData} setFormData={setFormData} />
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

export default AddDiemDenFormModal;
