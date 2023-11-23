import React, { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./add.scss";
const AddKhuyenMai = () => {
  const tours = [
    {
      MaTour: 1,
      TenTour: "Tour 1",
      NgayKhoiHanh: "2023-01-01",
      NoiKhoiHanh: "Hanoi",
      GioTapTrung: "08:00 AM",
      Gia: 100,
    },
    {
      MaTour: 23,
      TenTour: "Tour 2",
      NgayKhoiHanh: "2023-02-01",
      NoiKhoiHanh: "Ho Chi Minh City",
      GioTapTrung: "09:30 AM",
      Gia: 150,
    },
    {
      MaTour: 1,
      TenTour: "Tour 1",
      NgayKhoiHanh: "2023-01-01",
      NoiKhoiHanh: "Hanoi",
      GioTapTrung: "08:00 AM",
      Gia: 100,
    },
    {
      MaTour: 22,
      TenTour: "Tour 2",
      NgayKhoiHanh: "2023-02-01",
      NoiKhoiHanh: "Ho Chi Minh City",
      GioTapTrung: "09:30 AM",
      Gia: 150,
    },
    {
      MaTour: 1,
      TenTour: "Tour 1",
      NgayKhoiHanh: "2023-01-01",
      NoiKhoiHanh: "Hanoi",
      GioTapTrung: "08:00 AM",
      Gia: 100,
    },
    {
      MaTour: 23,
      TenTour: "Tour 2",
      NgayKhoiHanh: "2023-02-01",
      NoiKhoiHanh: "Ho Chi Minh City",
      GioTapTrung: "09:30 AM",
      Gia: 150,
    },
    {
      MaTour: 13,
      TenTour: "Tour 1",
      NgayKhoiHanh: "2023-01-01",
      NoiKhoiHanh: "Hanoi",
      GioTapTrung: "08:00 AM",
      Gia: 100,
    },
    {
      MaTour: 25,
      TenTour: "Tour 2",
      NgayKhoiHanh: "2023-02-01",
      NoiKhoiHanh: "Ho Chi Minh City",
      GioTapTrung: "09:30 AM",
      Gia: 150,
    },
    // Add more data as needed
  ];
  const [khuyenMaiData, setKhuyenMaiData] = useState({
    TenKm: "",
    PhanTramKm: 0,
    ThoiGianBatDau: "",
    ThoiGianKetThuc: "",
    Tours: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTour, setSelectedTour] = useState([]); // Initialize as an empty array
  const [isDisplay, setIsDisplay] = useState(false);
  const handleInputSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDisplay(true);
  };
  useEffect(() => {
    if (searchTerm.length < 1) setIsDisplay(false);
    else setIsDisplay(true);
  }, [isDisplay, searchTerm]);
  const handleTourSelect = (tour) => {
    const isTourSelected = selectedTour.some(
      (selected) => selected.MaTour === tour.MaTour
    );
    if (!isTourSelected) {
      setSelectedTour([...selectedTour, tour]);
    }
    setSearchTerm("");
  };
  const removeSelected = (tour) => {
    const updatedSelectedTour = selectedTour.filter(
      (selected) => selected.MaTour !== tour.MaTour
    );
    setSelectedTour(updatedSelectedTour);
  };
  // Dùng useEffect để làm việc với sự kiện khi selectedTour thay đổi
  useEffect(() => {
    // Xử lý khi tour được chọn
    // Ở đây, bạn có thể thêm logic để hiển thị tour trong table hoặc thực hiện các tác vụ khác
    console.log("Selected Tour:", selectedTour);
  }, [selectedTour]);

  // Lọc danh sách tour dựa trên searchTerm
  const filteredTours = tours.filter((tour) =>
    tour.MaTour.toString().includes(searchTerm.toLowerCase())
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKhuyenMaiData({
      ...khuyenMaiData,
      [name]: value,
    });
  };

  const handleAddKhuyenMai = (e) => {
    khuyenMaiData.Tours = selectedTour;
  };
  return (
    <>
      <center>
        <h2 className="title-km">Chương trình khuyến mãi</h2>
      </center>
      <Button variant="success" className="addkm" onClick={handleAddKhuyenMai}>
        Thêm Khuyến Mãi
      </Button>

      <Form>
        <Row>
          <Form.Group controlId="TenKm" className="col-lg-4 col-md-6 col-sm-10">
            <Form.Label>Tên Khuyến Mãi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên khuyến mãi"
              name="TenKm"
              value={khuyenMaiData.TenKm}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group
            controlId="PhanTramKm"
            className="col-lg-2 col-md-6 col-sm-10"
          >
            <Form.Label>Phần Trăm Khuyến Mãi</Form.Label>
            <Form.Control
              type="number"
              placeholder="Nhập phần trăm khuyến mãi"
              name="PhanTramKm"
              value={khuyenMaiData.PhanTramKm}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="ThoiGianBatDau"
            className="col-lg-2 col-md-6 col-sm-10"
          >
            <Form.Label>Thời Gian Bắt Đầu</Form.Label>
            <Form.Control
              type="date"
              name="ThoiGianBatDau"
              value={khuyenMaiData.ThoiGianBatDau}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group
            controlId="ThoiGianKetThuc"
            className="col-lg-2 col-md-6 col-sm-10"
          >
            <Form.Label>Thời Gian Kết Thúc</Form.Label>
            <Form.Control
              type="date"
              name="ThoiGianKetThuc"
              value={khuyenMaiData.ThoiGianKetThuc}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <Form.Group controlId="searchTour">
              <Form.Label>Thêm tour áp dụng khuyến mãi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mã tour"
                value={searchTerm}
                onChange={handleInputSearchChange}
              />
              <div className="searchlist">
                {isDisplay &&
                  filteredTours.map((tour, index) => (
                    <div
                      className="row"
                      key={index}
                      onClick={() => handleTourSelect(tour)}
                    >
                      <div className="col-lg-4 col-md-4 col-sm-4">
                        {tour.MaTour}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        {tour.TenTour}
                      </div>
                    </div>
                  ))}
              </div>
            </Form.Group>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6" />
        </Row>
        <Row>
          <center>
            <h4 className="title-selected-list">Danh sách tour áp dụng</h4>
          </center>
          <div className="km-selected-tour col-lg-10 col-md-10 col-sm-10">
            <Row className="header">
              <div className="col-lg-3 col-md-3 col-sm-3">Mã Tour</div>
              <div className="col-lg-7  col-md-7 col-sm-7">Tên Tour</div>
              <div className="col-lg-1 col-md-1 col-sm-1"></div>
            </Row>
            {selectedTour.map((tour) => (
              <Row key={tour.MaTour} onClick={() => handleTourSelect(tour)}>
                <div className="col-lg-3 col-md-3 col-sm-3">{tour.MaTour}</div>
                <div className="col-lg-7 col-md-7 col-sm-7">{tour.TenTour}</div>
                <div className="col-lg-1 col-md-2 col-sm-1">
                  <Button
                    variant="outline-danger"
                    onClick={() => removeSelected(tour)}
                  >
                    x
                  </Button>
                </div>
              </Row>
            ))}
          </div>
        </Row>
      </Form>
    </>
  );
};

export default AddKhuyenMai;
