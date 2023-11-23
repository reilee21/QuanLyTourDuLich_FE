import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../../api/axios";

const AddKhachHangFormModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    hoTen: "",
    soDienThoaiKh: "",
    ngaySinh: "",
    email: "",
    soCccd: "",
    maPassport: "",
    diaChi: "",
    maKh: "",
    diemThuong: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const khachhangregis = {
      Makh: "",
      hoTen: formData.hoTen,
      soDienThoaiKh: formData.soDienThoaiKh,
      ngaySinh: formData.ngaySinh,
      email: formData.email,
      diaChi: formData.diaChi,
      soCccd: formData.soCccd,
      maPassport: formData.maPassport,
    };

    try {
      await axios.post("/api/KhachHangs", khachhangregis);
    } catch (error) {
      console.error("POST Request Error:", error);
    }
    onClose();
  };
  const handlePhoneNumberChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 10);
    setFormData({ soDienThoaiKh: limitedValue });
  };
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col className="col-5">
              <Form.Group controlId="formHoTen">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type="text"
                  name="hoTen"
                  value={formData.hoTen || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formSoDienThoaiKH">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="soDienThoaiKh"
                  value={formData.soDienThoaiKh || ""}
                  onChange={handlePhoneNumberChange}
                  pattern="[0-9]*"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="col-4">
              <Form.Group controlId="formNgaySinh">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="ngaySinh"
                  value={
                    formData.ngaySinh ? formData.ngaySinh.slice(0, 10) : ""
                  }
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group controlId="formSoCCCD">
              <Form.Label>Số CCCD</Form.Label>
              <Form.Control
                type="text"
                name="soCccd"
                value={formData.soCccd || ""}
                placeholder="Số CCCD"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="formMaPassport">
              <Form.Label>Mã Passport</Form.Label>
              <Form.Control
                type="text"
                name="maPassport"
                value={formData.maPassport || ""}
                placeholder="Mã passport"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="formDiaChi">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="diaChi"
                value={formData.diaChi || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
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

export default AddKhachHangFormModal;
