import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddDiaDiemFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tenDiaDiem: "",
    loai: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "loai") {
      const isChecked = value === "true";
      setFormData({ ...formData, [name]: isChecked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
          Thêm mới
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDiaDiemFormModal;
