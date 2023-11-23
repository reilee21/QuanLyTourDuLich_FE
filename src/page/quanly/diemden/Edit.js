import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./index.scss";
import DDiaDiem from "./diadiem";
import axios from "../../../api/axios";

const EditDiemDenFormModal = ({ show, onClose, itemToEdit }) => {
  const [formData, setFormData] = useState({
    TenDiemDen: "",
    IdDiaDiem: "",
    TenDiaDiem: "",
  });
  useEffect(() => {
    if (itemToEdit)
      setFormData({
        TenDiemDen: itemToEdit.tenDiemDen,
        IdDiaDiem: itemToEdit.idDiaDiem,
        TenDiaDiem: "",
      });
  }, [itemToEdit]);

  const handleSubmit = async () => {
    const dt = {
      idDiemDen: itemToEdit.idDiemDen,
      tenDiemDen: formData.TenDiemDen,
      idDiaDiem: formData.IdDiaDiem,
    };

    try {
      await axios.put(`api/DiemDens/${dt.idDiemDen}`, dt);
      alert(`Cập nhật - ${dt.tenDiemDen} - thành công`);

      onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Điểm Đến</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên Điểm Đến</Form.Label>
            <Form.Control
              type="text"
              name="TenDiemDen"
              value={formData.TenDiemDen}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
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
          Lưu chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDiemDenFormModal;
