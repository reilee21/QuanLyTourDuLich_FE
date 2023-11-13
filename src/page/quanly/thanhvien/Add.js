import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import khachHangData from "./datatv"; // Thay thế bằng nguồn dữ liệu thực tế
import DatePicker from "react-datepicker";
const AddKhachHangFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    HoTen: "",
    SoDienThoaiKH: "",
    NgaySinh: "",
    Email: "",
    DiaChi: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newItem = {
      MaKH: `KH${khachHangData.length + 1}`, // Tạo mã khách hàng tự động (có thể tạo logic tùy chỉnh)
      HoTen: formData.HoTen,
      SoDienThoaiKH: formData.SoDienThoaiKH,
      NgaySinh: formData.NgaySinh,
      Email: formData.Email,
      DiaChi: formData.DiaChi,
    };
    khachHangData.push(newItem); // Thêm khách hàng mới vào nguồn dữ liệu
    onClose(); // Đóng modal thêm khách hàng
    onSubmit(newItem); // Gửi dữ liệu khách hàng mới cho xử lý bổ sung (nếu cần)
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm khách hàng</Modal.Title>
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

export default AddKhachHangFormModal;
