import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, FormControl } from "react-bootstrap";
import "./add.scss";
import axios from "../../../api/axios";
import LichTrinh from "./lictrinh";
import { useNavigate, useLocation } from "react-router-dom";

const EditTour = () => {
  const [phuongtiens, setPhuongtiens] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();

  const updateTourData = (res) => {
    console.log(res);
    setTourData({
      ...tourData,
      maTour: res.maTour,
      tenTour: res.tenTour,
      soLuongNguoi: res.soLuongNguoi,
      soLuongNguoiDaDat: res.soLuongNguoiDaDat,
      ngayKhoiHanh: res.ngayKhoiHanh,
      soNgay: res.soNgay,
      soDem: res.soDem,
      noiKhoiHanh: res.noiKhoiHanh,
      gioTapTrung: res.gioTapTrung,
      gia: res.gia,
      image: res.image,
      anhBia: res.anhBia,
    });
    const byteCharacters = atob(res.image);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const objectURL = URL.createObjectURL(blob);
    const imagePreview = document.getElementById("imagePreview");

    if (imagePreview) {
      imagePreview.src = objectURL;
    } else {
      console.error("Image preview element not found.");
    }
  };

  async function fetchDataForLichTrinh(lichTrinh) {
    try {
      const diemDenRes = await axios.get(`api/DiemDens/${lichTrinh.idDiemDen}`);
      return {
        Ngay: lichTrinh.ngay,
        diemDen: diemDenRes,
        MoTa: lichTrinh.moTa,
      };
    } catch (error) {
      console.error(`Error fetching DiemDen ${lichTrinh.idDiemDen}:`, error);
      throw error;
    }
  }

  async function fetchDataForTransportation(phuongTien) {
    try {
      const phuongTienRes = await axios.get(
        `api/PhuongTiens/${phuongTien.idPhuongTien}`
      );
      return {
        idPhuongTien: phuongTienRes.idPhuongTien,
        tenPhuongTien: phuongTienRes.tenPhuongTien,
        moTa: phuongTienRes.moTa,
      };
    } catch (error) {
      console.error(
        `Error fetching PhuongTien ${phuongTien.idPhuongTien}:`,
        error
      );
      throw error;
    }
  }

  useEffect(() => {
    const fetchtour = async () => {
      try {
        const res = await axios.get(`api/Tours/${location.state.tour.maTour}`);
        updateTourData(res);

        const updatedItineraries = await Promise.all(
          res.lichTrinhs.map(
            async (lichTrinh) => await fetchDataForLichTrinh(lichTrinh)
          )
        );
        const updatedTransportations = await Promise.all(
          res.tourPhuongTiens.map(
            async (phuongTien) => await fetchDataForTransportation(phuongTien)
          )
        );

        setTourData((prevData) => ({
          ...prevData,
          lichTrinhs: [
            ...new Set([
              ...prevData.lichTrinhs,
              ...updatedItineraries.filter(Boolean),
            ]),
          ],
          idPhuongTiens: [
            ...new Set([
              ...prevData.idPhuongTiens,
              ...updatedTransportations.filter(Boolean),
            ]),
          ],
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchtour();
  }, []);

  const fetchpt = async () => {
    try {
      const res = await axios.get("api/PhuongTiens");
      setPhuongtiens(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchpt();
  }, []);

  const [selectedTransportations, setSelectedTransportations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransportations, setFilteredTransportations] =
    useState(phuongtiens);
  const [showdspt, setShowdspt] = useState(false);
  const [tourData, setTourData] = useState({
    maTour: "demo",
    tenTour: "",
    soLuongNguoi: 0,
    soLuongNguoiDaDat: 0,
    ngayKhoiHanh: new Date().toISOString(),
    soNgay: 0,
    soDem: 0,
    noiKhoiHanh: "",
    gioTapTrung: new Date().toISOString(),
    gia: 0,
    image: null,
    lichTrinhs: [],
    idPhuongTiens: [],
    anhBia: "x",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  const handleItineraryEntryChange = (index, fieldName, fieldValue) => {
    const updatedItinerary = [...tourData.lichTrinhs];
    updatedItinerary[index][fieldName] = fieldValue;

    setTourData({
      ...tourData,
      lichTrinhs: updatedItinerary,
    });
  };

  const handleEditTour = async () => {
    let validflag = true;
    if (tourData.lichTrinhs.some((item) => !item.Ngay || !item.MoTa)) {
      tourData.lichTrinhs.forEach((item) => {
        if (!item.Ngay || !item.MoTa) {
          alert(`Kiểm tra lại lịch trình ${item.diemDen.tenDiemDen}`);
          validflag = false;
          return;
        }
      });
    }
    if (!validflag) return;

    const formData = new FormData();

    const { lichTrinhs, idPhuongTiens, ...tourDataToSend } = tourData;

    Object.keys(tourDataToSend).forEach((key) => {
      formData.append(key, tourDataToSend[key]);
    });
    const formattedList = tourData.lichTrinhs.map((item) => ({
      maTour: "demo",
      ngay: new Date(item.Ngay),
      moTa: item.MoTa,
      idDiemDen: item.diemDen.idDiemDen,
    }));
    const imageInput = document.getElementById("imageInput");
    const selectedFile = imageInput.files[0];

    formData.append("image", selectedFile);
    formData.append("LichTrinhs", JSON.stringify(formattedList));
    formData.append("TourPhuongTiens", JSON.stringify(tourData.idPhuongTiens));
    try {
      await axios.put(`/api/Tours/${tourData.maTour}`, formData);
      alert("Cập nhật tour thành công");
    } catch (error) {
      console.error("Error adding formattedList:", error.response);
    }
  };
  const delLichTrinh = (index) => {
    const updatedItinerary = [...tourData.lichTrinhs];
    updatedItinerary.splice(index, 1);

    setTourData({
      ...tourData,
      lichTrinhs: updatedItinerary,
    });
  };

  useEffect(() => {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");

    if (imageInput) {
      imageInput.addEventListener("change", function () {
        const selectedFile = imageInput.files[0];

        if (selectedFile) {
          const fileReader = new FileReader();
          fileReader.onload = function (e) {
            imagePreview.src = e.target.result;
            setSelectedImage(e.target.result);
          };
          fileReader.readAsDataURL(selectedFile);
        } else {
          imagePreview.src = "";
        }
      });
    }
  }, []);

  useEffect(() => {
    setFilteredTransportations(
      phuongtiens.filter((transportation) =>
        transportation.tenPhuongTien
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
    openlistPT(searchTerm);
  }, [searchTerm]);

  const handleAddTransportation = (trans) => {
    const updatedPhuongTien = {
      idPhuongTien: trans.idPhuongTien,
      tenPhuongTien: trans.tenPhuongTien,
      moTa: trans.moTa,
    };

    if (!tourData.idPhuongTiens) {
      setTourData({
        ...tourData,
        idPhuongTiens: [updatedPhuongTien],
      });
    } else if (!Array.isArray(tourData.idPhuongTiens)) {
      setTourData({
        ...tourData,
        idPhuongTiens: [tourData.phuongtien, updatedPhuongTien],
      });
    } else {
      const isAlreadySelected = tourData.idPhuongTiens.some(
        (selectedTrans) => selectedTrans.idPhuongTien === trans.idPhuongTien
      );

      if (!isAlreadySelected) {
        setTourData({
          ...tourData,
          idPhuongTiens: [...tourData.idPhuongTiens, updatedPhuongTien],
        });
      }
    }
    setSelectedTransportations([...selectedTransportations, trans]);

    setFilteredTransportations(phuongtiens);
  };
  const handleRemoveTransportation = (index) => {
    const updatedTransportations = [...selectedTransportations];
    updatedTransportations.splice(index, 1);
    setSelectedTransportations(updatedTransportations);

    if (Array.isArray(tourData.idPhuongTiens)) {
      const updatedPhuongTien = [...tourData.idPhuongTiens];
      updatedPhuongTien.splice(index, 1);
      setTourData({
        ...tourData,
        idPhuongTiens: updatedPhuongTien,
      });
    }
  };

  const openlistPT = (s) => {
    if (s.length < 3) {
      setShowdspt(false);
    } else {
      setShowdspt(true);
    }
  };
  useEffect(() => {
    setTourData({ ...tourData, image: selectedImage });
  }, [selectedImage]);
  return (
    <>
      <center>
        <div className="head">
          <h2> Cập nhật thông tin tour</h2>
          <Button id="addt" variant="primary" onClick={handleEditTour}>
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
                    name="tenTour"
                    value={tourData.tenTour}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={5}>
                <Form.Group controlId="NgayKhoiHanh">
                  <Form.Label>Ngày Khởi Hành</Form.Label>
                  <Form.Control
                    type="date"
                    name="ngayKhoiHanh"
                    value={
                      new Date(tourData.ngayKhoiHanh)
                        .toISOString()
                        .split("T")[0]
                    }
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
                    name="noiKhoiHanh"
                    value={tourData.noiKhoiHanh}
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
                    name="gia"
                    value={tourData.gia}
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
                    name="soLuongNguoi"
                    value={tourData.soLuongNguoi}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group controlId="SoNgay" className="col-lg-2">
                <Form.Label>Số Ngày</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Số Ngày"
                  name="soNgay"
                  value={tourData.soNgay}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="SoDem" className="col-lg-2">
                <Form.Label>Số Đêm</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Số Đêm"
                  name="soDem"
                  value={tourData.soDem}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="GioTapTrung" className="col-lg-3">
                <Form.Label>Giờ Tập Trung</Form.Label>
                <Form.Control
                  type="time"
                  name="gioTapTrung"
                  value={tourData.gioTapTrung.slice(11, 16)}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="SoLuongNguoiDaDat" className="col-lg-3">
                <Form.Label>Đã đặt</Form.Label>
                <Form.Control
                  type="number"
                  name="soLuongNguoiDaDat"
                  value={tourData.soLuongNguoiDaDat}
                  disabled
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
                {tourData.idPhuongTiens.map((transportation, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="row-col-3 col-3 col-lg-3 col-md-3 col-sm-3"
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
        <LichTrinh
          tourData={tourData}
          handleItineraryEntryChange={handleItineraryEntryChange}
          delLichTrinh={delLichTrinh}
          setTourData={setTourData}
        />
      </Form>
    </>
  );
};

export default EditTour;
