import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddDiaDiemFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tenDiaDiem: "",
    loaiDiaDiem: 0, // Default to "Trong nước" represented by 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    //onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm địa điểm</Modal.Title>
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
                  name="loaiDiaDiem"
                  id="trongNuoc"
                  value={0} // Numeric value representing "Trong nước"
                  checked={formData.loaiDiaDiem == 0}
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
                  name="loaiDiaDiem"
                  id="nuocNgoai"
                  value={1} // Numeric value representing "Nước ngoài"
                  checked={formData.loaiDiaDiem == 1}
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
          Thêm mới
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDiaDiemFormModal;
