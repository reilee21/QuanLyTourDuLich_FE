import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const EditVoucherFormModal = ({ show, onClose, onSubmit, editVoucher }) => {
  const [editedVoucher, setEditedVoucher] = useState({});

  useEffect(() => {
    setEditedVoucher(editVoucher);
  }, [editVoucher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVoucher({
      ...editedVoucher,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedVoucher);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa voucher</Modal.Title>
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
                  value={editedVoucher.MaVoucher || ""}
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
                  value={editedVoucher.TenVoucher || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formDoiTac">
                <Form.Label>Đối tác</Form.Label>
                <Form.Control
                  type="text"
                  name="DoiTac"
                  value={editedVoucher.IdDoiTac || ""}
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
                  value={editedVoucher.ThoiGianKetThuc || ""}
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
                  value={editedVoucher.ThoiGianBatDau || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {" "}
            <Col className="col-4">
              <Form.Group controlId="formSoLuong">
                <Form.Label>Số Lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="SoLuong"
                  value={editedVoucher.SoLuong || ""}
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
                  value={editedVoucher.PhanTramGiam || ""}
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Lưu chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVoucherFormModal;
