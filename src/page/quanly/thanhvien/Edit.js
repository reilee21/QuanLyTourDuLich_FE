import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const EditKhachHangFormModal = ({ show, onClose, onSubmit, editData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
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
                  name="MaKH"
                  value={formData.MaKH || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-5">
              <Form.Group controlId="formHoTen">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type="text"
                  name="HoTen"
                  value={formData.HoTen || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formSoDienThoaiKH">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="SoDienThoaiKH"
                  value={formData.SoDienThoaiKH || ""}
                  onChange={handleChange}
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
                  name="NgaySinh"
                  value={formData.NgaySinh || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="Email"
                  value={formData.Email || ""}
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
                name="SoCCCD"
                value={formData.SoCCCD || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="formMaPassport">
              <Form.Label>Mã Passport</Form.Label>
              <Form.Control
                type="text"
                name="MaPassport"
                value={formData.MaPassport || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="formDiaChi">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="DiaChi"
                value={formData.DiaChi || ""}
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
