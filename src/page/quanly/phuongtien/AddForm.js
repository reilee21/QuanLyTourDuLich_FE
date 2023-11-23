import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../../api/axios";
import DDoitac from "./doitac";

const AddFormModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    idPhuongTien: "",
    tenPhuongTien: "",
    moTa: "",
    idDoiTac: "",
    tendoitac: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.idDoiTac != null) {
      const { tendoitac, idPhuongTien, ...dt } = formData;
      try {
        await axios.post(`/api/phuongtiens`, dt);
        alert(`Thêm phương tiện : ${formData.tenPhuongTien} thành công`);
        setFormData({});
        onClose();
      } catch (e) {
        console.log(e);
      }
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
          </Form.Group>
          <DDoitac formData={formData} setFormData={setFormData} />
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
