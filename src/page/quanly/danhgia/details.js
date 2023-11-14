import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
const DetailsDanhGiaModal = ({ show, onClose, danhGia }) => {
  if (!danhGia) {
    return null;
  }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin đánh giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col className="col-3">
              <Form.Group>
                <Form.Label>Mã Tour</Form.Label>
                <Form.Control type="text" readOnly value={danhGia.MaTour} />
              </Form.Group>
            </Col>
            <Col className="col-9">
              <Form.Group>
                <Form.Label>Tên Tour</Form.Label>
                <Form.Control type="text" readOnly value={danhGia.TenTour} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Tên Khách Hàng</Form.Label>
              <Form.Control type="text" readOnly value={danhGia.TenKH} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Thời Điểm Đánh Giá</Form.Label>
              <Form.Control type="text" readOnly value={danhGia.ThoiDiem} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Nội Dung Đánh Giá</Form.Label>
              <Form.Control as="textarea" readOnly value={danhGia.NoiDung} />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsDanhGiaModal;
