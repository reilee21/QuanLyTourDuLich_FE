import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const AddVoucherFormModal = ({ show, onClose, onSubmit }) => {
  const [newVoucher, setNewVoucher] = useState({
    MaVoucher: "",
    TenVoucher: "",
    ThoiGianBatDau: new Date(),
    ThoiGianKetThuc: new Date(),
    SoLuong: 0,
    PhanTramGiam: 0,
    IdDoiTac: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({
      ...newVoucher,
      [name]: value,
    });
  };

  const handleAddSubmit = () => {
    // Validate the input, perform any necessary checks

    // Submit the new voucher
    onSubmit(newVoucher);

    // Clear the form fields
    setNewVoucher({
      MaVoucher: "",
      TenVoucher: "",
      ThoiGianBatDau: new Date(),
      ThoiGianKetThuc: new Date(),
      SoLuong: 0,
      PhanTramGiam: 0,
      IdDoiTac: "",
    });
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col className="col-4">
              <Form.Group controlId="formMaVoucher">
                <Form.Label>Mã Voucher</Form.Label>
                <Form.Control
                  type="text"
                  name="MaVoucher"
                  value={newVoucher.MaVoucher}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formTenVoucher">
                <Form.Label>Tên Voucher</Form.Label>
                <Form.Control
                  type="text"
                  name="TenVoucher"
                  value={newVoucher.TenVoucher}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formDoiTac">
                <Form.Label>Đối tác</Form.Label>
                <Form.Control
                  type="text"
                  name="IdDoiTac"
                  value={newVoucher.IdDoiTac}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="col-4">
              <Form.Group controlId="formThoiGianKetThuc">
                <Form.Label>Thời Gian Kết Thúc</Form.Label>
                <Form.Control
                  type="date"
                  name="ThoiGianKetThuc"
                  value={newVoucher.ThoiGianKetThuc}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formThoiGianBatDau">
                <Form.Label>Thời Gian Bắt Đầu</Form.Label>
                <Form.Control
                  type="date"
                  name="ThoiGianBatDau"
                  value={newVoucher.ThoiGianBatDau}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col-4">
              <Form.Group controlId="formSoLuong">
                <Form.Label>Số Lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="SoLuong"
                  value={newVoucher.SoLuong}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formPhanTramGiam">
                <Form.Label>Phần Trăm Giảm</Form.Label>
                <Form.Control
                  type="number"
                  name="PhanTramGiam"
                  value={newVoucher.PhanTramGiam}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Add more input fields for other voucher properties here */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" type="submit" onClick={handleAddSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVoucherFormModal;
