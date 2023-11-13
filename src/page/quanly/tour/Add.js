import React, { useState, useEffect } from "react";
import data from "../phuongtien/data";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { Fragment } from "react";
import "./add.scss";
const AddTour = () => {
  const [selectedTransportations, setSelectedTransportations] = useState([]);
  const [selectedTrans, setSelectedTrans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransportations, setFilteredTransportations] = useState(data);
  const [showdspt, setShowdspt] = useState(false);
  const [tourData, setTourData] = useState({
    TenTour: "",
    SoLuongNguoi: 0,
    NgayKhoiHanh: "",
    SoNgay: 0,
    SoDem: 0,
    NoiKhoiHanh: "",
    GioTapTrung: "",
    Gia: 0,
    image: "",
    lichTrinh: [],
    phuongtien: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  const handleAddItineraryEntry = () => {
    setTourData({
      ...tourData,
      lichTrinh: [...tourData.lichTrinh, { Ngay: "", DiemDen: "", MoTa: "" }],
    });
  };

  const handleItineraryEntryChange = (index, fieldName, fieldValue) => {
    const updatedItinerary = [...tourData.lichTrinh];
    updatedItinerary[index][fieldName] = fieldValue;

    setTourData({
      ...tourData,
      lichTrinh: updatedItinerary,
    });
  };

  const handleAddTour = () => {
    const imageInput = document.getElementById("imageInput");
    tourData.image = imageInput.files[0];
    tourData.phuongtien = selectedTransportations;
    console.log(tourData);
  };
  const delLichTrinh = (index) => {
    const updatedItinerary = [...tourData.lichTrinh];
    updatedItinerary.splice(index, 1);

    setTourData({
      ...tourData,
      lichTrinh: updatedItinerary,
    });
  };

  useEffect(() => {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");

    if (imageInput) {
      imageInput.addEventListener("change", function () {
        // Xử lý khi input file thay đổi
        const selectedFile = imageInput.files[0];

        if (selectedFile) {
          const fileReader = new FileReader();
          fileReader.onload = function (e) {
            imagePreview.src = e.target.result;
          };
          fileReader.readAsDataURL(selectedFile);
        } else {
          imagePreview.src = "";
        }
      });
    }
  }, []);

  useEffect(() => {
    // Filter transportation data based on the search term
    setFilteredTransportations(
      data.filter((transportation) =>
        transportation.tenPhuongTien
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
    openlistPT(searchTerm);
  }, [searchTerm]);

  const handleAddTransportation = (trans) => {
    if (!selectedTransportations.includes(trans)) {
      setSelectedTransportations([...selectedTransportations, trans]);
    }
    setFilteredTransportations(data);
  };

  const handleRemoveTransportation = (index) => {
    // Remove selected transportation from the list
    const updatedTransportations = [...selectedTransportations];
    updatedTransportations.splice(index, 1);
    setSelectedTransportations(updatedTransportations);
  };
  const openlistPT = (s) => {
    if (s.length < 3) {
      setShowdspt(false);
    } else {
      setShowdspt(true);
    }
  };
  return (
    <>
      <center>
        <div className="head">
          <h2> Thêm tour</h2>
          <Button id="addt" variant="primary" onClick={handleAddTour}>
            Lưu
          </Button>
        </div>
      </center>

      <Form>
        <Row className="tourinfo">
          <Col lg={3} className="anhbia">
            <img id="imagePreview" src="" alt="Preview" />
            <input type="file" id="imageInput" accept="image/*" />
          </Col>
          <Col lg={9}>
            <Row>
              <Col lg={5}>
                <Form.Group controlId="TenTour">
                  <Form.Label>Tên Tour</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Tên Tour"
                    name="TenTour"
                    value={tourData.TenTour}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={5}>
                <Form.Group controlId="NgayKhoiHanh">
                  <Form.Label>Ngày Khởi Hành</Form.Label>
                  <Form.Control
                    type="date"
                    name="NgayKhoiHanh"
                    value={tourData.NgayKhoiHanh}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Form.Group controlId="NoiKhoiHanh">
                  <Form.Label>Nơi Khởi Hành</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Nơi Khởi Hành"
                    name="NoiKhoiHanh"
                    value={tourData.NoiKhoiHanh}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group controlId="Gia">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Giá"
                    name="Gia"
                    value={tourData.Gia}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group controlId="SoLuongNguoi">
                  <Form.Label>Số Lượng Người</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Số Lượng Người"
                    name="SoLuongNguoi"
                    value={tourData.SoLuongNguoi}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group controlId="SoNgay" className="col-lg-3">
                <Form.Label>Số Ngày</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Số Ngày"
                  name="SoNgay"
                  value={tourData.SoNgay}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="SoDem" className="col-lg-3">
                <Form.Label>Số Đêm</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Số Đêm"
                  name="SoDem"
                  value={tourData.SoDem}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="GioTapTrung" className="col-lg-4">
                <Form.Label>Giờ Tập Trung</Form.Label>
                <Form.Control
                  type="time"
                  name="GioTapTrung"
                  value={tourData.GioTapTrung}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <div className="row col-12" id="dsphuongtien">
          <Col lg={2} className="dspttitle">
            <span>Phương tiện</span>
          </Col>
          <Col lg={7}>
            <Form.Group controlId="selectedTransportations">
              <Row className="selectlist">
                {selectedTransportations.map((transportation, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="row-col-2 col-2 col-lg-2 col-md-2 col-sm-2"
                      id="selecitem"
                    >
                      <span className="selectedtransname">
                        {transportation.tenPhuongTien}
                      </span>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveTransportation(index)}
                      >
                        x
                      </Button>
                    </div>
                  </React.Fragment>
                ))}
              </Row>
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mb-3">
              <div className="position-relative">
                <FormControl
                  type="text"
                  placeholder="Search for transportation..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    openlistPT(e.target.value);
                  }}
                />
                <div className="pt">
                  {showdspt &&
                    filteredTransportations.map((transportation, index) => (
                      <div
                        className="pt-item"
                        key={index}
                        onClick={() => {
                          handleAddTransportation(transportation);
                          setShowdspt(false);
                          setSearchTerm("");
                        }}
                      >
                        {transportation.tenPhuongTien}
                      </div>
                    ))}
                </div>
              </div>
            </Form.Group>
          </Col>
        </div>
        <Form.Group controlId="lichTrinh" className="lichtrinh row">
          <center>
            <h5 className="col-lg-12">Lịch trình </h5>
          </center>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="ngay">Ngày</th>
                <th className="diemden">Điểm Đến</th>
                <th className="mota">Mô Tả</th>
                <th className="del"></th>
              </tr>
            </thead>
            <tbody>
              {tourData.lichTrinh.map((entry, index) => (
                <tr key={index}>
                  <td className="ngay">
                    <Form.Control
                      type="date"
                      value={entry.Ngay}
                      onChange={(e) =>
                        handleItineraryEntryChange(
                          index,
                          "Ngay",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="diemden">
                    <Form.Control
                      type="text"
                      value={entry.DiemDen}
                      onChange={(e) =>
                        handleItineraryEntryChange(
                          index,
                          "DiemDen",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="mota">
                    <Form.Control
                      type="text"
                      value={entry.MoTa}
                      onChange={(e) =>
                        handleItineraryEntryChange(
                          index,
                          "MoTa",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="del">
                    <Button
                      variant="outline-danger"
                      onClick={() => delLichTrinh(index)}
                    >
                      <AiFillDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="secondary"
            className="addlich"
            onClick={handleAddItineraryEntry}
          >
            Thêm Ngày
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default AddTour;
