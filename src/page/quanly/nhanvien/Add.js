// AddNhanVienFormModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNhanVienFormModal = ({ show, onClose, onSubmit }) => {
  const [selectedChucVu, setSelectedChucVu] = useState("");
  const chucVuOptions = [
    "Quản lý",
    "Phương tiện và dịch vụ",
    "CSKH",
    "Phòng vé",
    "Hướng dẫn viên",
  ];

  const [formData, setFormData] = useState({
    MaNV: "",
    HoTen: "",
    SoDienThoaiNV: "",
    SoCCCD: "",
    Email: "",
    ChucVu: selectedChucVu,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChucVuChange = (e) => {
    setSelectedChucVu(e.target.value);
  };
  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    onSubmit(formData); // Pass the form data to the parent component
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Nhân Viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Mã Nhân Viên</Form.Label>
            <Form.Control
              type="text"
              name="MaNV"
              value={formData.MaNV}
              onChange={handleChange}
            />
            <Form.Label>Họ và Tên</Form.Label>
            <Form.Control
              type="text"
              name="HoTen"
              value={formData.HoTen}
              onChange={handleChange}
            />
            <Form.Label>Số Điện Thoại Nhân Viên</Form.Label>
            <Form.Control
              type="text"
              name="SoDienThoaiNV"
              value={formData.SoDienThoaiNV}
              onChange={handleChange}
            />
            <Form.Label>Số CCCCD</Form.Label>
            <Form.Control
              type="text"
              name="SoCCCD"
              value={formData.SoCCCD}
              onChange={handleChange}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
            <Form.Label>Chức Vụ</Form.Label>
            <Form.Control
              as="select"
              name="ChucVu"
              value={selectedChucVu}
              onChange={handleChucVuChange}
            >
              <option value="">Chọn Chức Vụ</option>
              {chucVuOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
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

export default AddNhanVienFormModal;
