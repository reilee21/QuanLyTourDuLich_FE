import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../../api/axios";

const AddVoucherFormModal = ({ show, onClose }) => {
  const [newVoucher, setNewVoucher] = useState({
    maVoucher: "",
    tenVoucher: "",
    thoiGianBatDau: new Date().toISOString(),
    thoiGianKetThuc: new Date().toISOString(),
    soLuong: 0,
    phanTramGiam: 0,
    diemDoiThuong: 0,
  });
  const [ptg, setPtg] = useState(0);
  const [ddt, setDdt] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewVoucher({
      ...newVoucher,
      [name]: value,
    });
  };

  const handleAddSubmit = async () => {
    try {
      const res = await axios.post(`api/vouchers`, newVoucher);
      alert("Thêm thành công");
      onClose();
      setNewVoucher({});
    } catch (e) {
      console.error(e);
      alert("Kiểm tra lại mã voucher");
      return;
    }
  };
  const changeptg = (value) => {
    if (value > 100 || value < 0) {
      setPtg(1);
      return;
    }
    setPtg(value);
  };
  useEffect(() => {
    setNewVoucher((prevState) => ({
      ...prevState,
      phanTramGiam: ptg / 10,
    }));
  }, [ptg]);

  const changeddt = (value) => {
    if (value < 0) {
      setDdt(1);
      return;
    }
    setDdt(value);
  };
  useEffect(() => {
    setNewVoucher((prevState) => ({
      ...prevState,
      diemDoiThuong: ddt,
    }));
  }, [ddt]);
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
                  name="maVoucher"
                  value={newVoucher.maVoucher}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formTenVoucher">
                <Form.Label>Tên Voucher</Form.Label>
                <Form.Control
                  type="text"
                  name="tenVoucher"
                  value={newVoucher.tenVoucher}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formTenVoucher">
                <Form.Label>Điểm đổi thưởng</Form.Label>
                <Form.Control
                  type="number"
                  name="diemDoiThuong"
                  value={ddt}
                  onChange={(e) => changeddt(e.target.value)}
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
                  name="thoiGianKetThuc"
                  value={
                    newVoucher.thoiGianKetThuc
                      ? newVoucher.thoiGianKetThuc.slice(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formThoiGianBatDau">
                <Form.Label>Thời Gian Bắt Đầu</Form.Label>
                <Form.Control
                  type="date"
                  name="thoiGianBatDau"
                  value={
                    newVoucher.thoiGianBatDau
                      ? newVoucher.thoiGianBatDau.slice(0, 10)
                      : ""
                  }
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
                  name="soLuong"
                  value={newVoucher.soLuong}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formPhanTramGiam">
                <Form.Label>Phần Trăm Giảm</Form.Label>
                <Form.Control
                  type="number"
                  name="phanTramGiam"
                  value={ptg}
                  onChange={(e) => changeptg(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
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
