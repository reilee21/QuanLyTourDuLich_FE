import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../../api/axios";

const EditDiaDiemFormModal = ({ show, onClose, itemToEdit }) => {
  const [formData, setFormData] = useState({
    idDiaDiem: "",
    tenDiaDiem: "",
    loai: false,
  });
  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        idDiaDiem: itemToEdit.idDiaDiem,
        tenDiaDiem: itemToEdit.tenDiaDiem,
        loai: itemToEdit.loai,
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "loai") {
      const isChecked = value === "true";
      setFormData({ ...formData, [name]: isChecked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`api/DiaDiems/${formData.idDiaDiem}`, formData);
      alert(`Cập nhật - ${formData.tenDiaDiem} - thành công`);

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa địa điểm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên địa điểm</Form.Label>
            <Form.Control
              type="text"
              name="tenDiaDiem"
              value={formData.tenDiaDiem}
              onChange={handleChange}
            />
            <Form.Label>Loại địa điểm</Form.Label>
            <div className="d-flex">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="loai"
                  id="trongNuoc"
                  value="true"
                  checked={formData.loai === true}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="trongNuoc">
                  Trong nước
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="loai"
                  id="nuocNgoai"
                  value="false"
                  checked={formData.loai === false}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="nuocNgoai">
                  Nước ngoài
                </label>
              </div>
            </div>
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

export default EditDiaDiemFormModal;
