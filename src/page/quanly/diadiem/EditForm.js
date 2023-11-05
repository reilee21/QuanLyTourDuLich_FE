import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const EditDiaDiemFormModal = ({ show, onClose, onSubmit, itemToEdit }) => {
  const [formData, setFormData] = useState({
    tenDiaDiem: "",
    loaiDiaDiem: 0, // Initialize with the numeric value (0 for "Trong nước" and 1 for "Nước ngoài")
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        tenDiaDiem: itemToEdit.ten,
        loaiDiaDiem: itemToEdit.loai,
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // You can submit the updated data using the `onSubmit` callback
    onSubmit(formData);
    onClose();
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
                  name="loaiDiaDiem"
                  id="trongNuoc"
                  value={0} // Use numeric values
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
                  value={1} // Use numeric values
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
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDiaDiemFormModal;
