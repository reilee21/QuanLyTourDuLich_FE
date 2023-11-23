import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../../api/axios";

const EditVoucherFormModal = ({ show, onClose, editVoucher }) => {
  const [editedVoucher, setEditedVoucher] = useState({});
  const [ptg, setPtg] = useState(0);
  const [ddt, setDdt] = useState(0);

  useEffect(() => {
    if (editVoucher) {
      setEditedVoucher({
        ...editedVoucher,
        maVoucher: editVoucher.maVoucher,
        tenVoucher: editVoucher.tenVoucher,
        soLuong: editVoucher.soLuong,
        thoiGianBatDau: editVoucher.thoiGianBatDau
          ? new Date(editVoucher.thoiGianBatDau).toISOString()
          : new Date().toISOString(),
        thoiGianKetThuc: editVoucher.thoiGianKetThuc
          ? new Date(editVoucher.thoiGianKetThuc).toISOString()
          : new Date().toISOString(),
        diemDoiThuong: 0,
      });
      setPtg(editVoucher.phanTramGiam * 10);
      setDdt(editVoucher.diemDoiThuong);
    }
  }, [editVoucher]);
  useEffect(() => {
    setEditedVoucher((prevState) => ({
      ...prevState,
      phanTramGiam: ptg / 10,
    }));
  }, [ptg]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedVoucher({
      ...editedVoucher,
      [name]: value,
    });
  };
  const changeptg = (value) => {
    if (value > 100 || value < 0) {
      setPtg(1);
      return;
    }
    setPtg(value);
  };
  const changeddt = (value) => {
    if (value < 0) {
      setDdt(1);
      return;
    }
    setPtg(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/vouchers/${editedVoucher.maVoucher}`,
        editedVoucher
      );
      alert("Cập nhật tour thành công");
      onClose();
    } catch (error) {
      alert("Cập nhật tour thất bại");

      console.error("Error adding formattedList:", error.response);
    }
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
                  name="naVoucher"
                  value={editedVoucher.maVoucher}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col className="col-4">
              <Form.Group controlId="formTenVoucher">
                <Form.Label>Tên Voucher</Form.Label>
                <Form.Control
                  type="text"
                  name="tenVoucher"
                  value={editedVoucher.tenVoucher}
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
                  onChange={changeddt}
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
                    editVoucher.thoiGianKetThuc
                      ? editedVoucher.thoiGianKetThuc.slice(0, 10)
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
                    editVoucher.thoiGianBatDau
                      ? editedVoucher.thoiGianBatDau.slice(0, 10)
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
                  value={editedVoucher.soLuong}
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Lưu chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVoucherFormModal;
