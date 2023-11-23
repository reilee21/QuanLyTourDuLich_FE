import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../../api/axios";

const EditKhachHangFormModal = ({ show, onClose, editData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editData);
    try {
      const res = await axios.put(`/api/KhachHangs/${editData.maKh}`, editData);
      console.log(res);
      onClose();
    } catch (error) {
      console.error("POST Request Error:", error);
    }
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
            <Col className="col-3">
              <Form.Group controlId="formMaKH">
                <Form.Label>Mã Khách Hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="maKh"
                  value={formData.maKh || ""}
                  disabled
                />
              </Form.Group>
            </Col>
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
                name="soCCCD"
                value={formData.soCCCD || ""}
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

export default EditKhachHangFormModal;
