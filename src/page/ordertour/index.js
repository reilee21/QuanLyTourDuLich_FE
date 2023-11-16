// SearchPage.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import "./ordertour.scss";
import HanoiImage from "../../assets/image/hanoi.png";
import { Button, Row } from "react-bootstrap";
const SearchPage = () => {
  const sampleData = [
    {
      MaTour: "T001",
      TenTour: "Tour 1",
      SoLuongNguoi: 10,
      NgayKhoiHanh: "2023-11-15",
      SoNgay: 5,
      SoDem: 4,
      NoiKhoiHanh: "Hồ Chí Minh",
      GioTapTrung: "2023-11-15T08:00:00",
      Gia: 5000000,
      imageUrl: HanoiImage,
      MoTa: "Mô tả cho Tour 1...",
    },
    {
      MaTour: "T002",
      TenTour: "Tour 2",
      SoLuongNguoi: 15,
      NgayKhoiHanh: "2023-12-01",
      SoNgay: 7,
      SoDem: 6,
      NoiKhoiHanh: "Hà Nội",
      GioTapTrung: "2023-12-01T07:30:00",
      Gia: 7000000,
      imageUrl: HanoiImage,
      MoTa: "Mô tả cho Tour 2...",
    },
    {
      MaTour: "T003",
      TenTour: "Tour 3",
      SoLuongNguoi: 12,
      NgayKhoiHanh: "2023-12-10",
      SoNgay: 3,
      SoDem: 2,
      NoiKhoiHanh: "Đà Nẵng",
      GioTapTrung: "2023-12-10T09:00:00",
      Gia: 3500000,
      imageUrl: HanoiImage,
      MoTa: "Mô tả cho Tour 3...",
    },
    {
      MaTour: "T003",
      TenTour: "Tour 3",
      SoLuongNguoi: 12,
      NgayKhoiHanh: "2023-12-10",
      SoNgay: 3,
      SoDem: 2,
      NoiKhoiHanh: "Đà Nẵng",
      GioTapTrung: "2023-12-10T09:00:00",
      Gia: 3500000,
      imageUrl: HanoiImage,
      MoTa: "Mô tả cho Tour 3...",
    },
    {
      MaTour: "T003",
      TenTour: "Tour 3",
      SoLuongNguoi: 12,
      NgayKhoiHanh: "2023-12-10",
      SoNgay: 3,
      SoDem: 2,
      NoiKhoiHanh: "Đà Nẵng",
      GioTapTrung: "2023-12-10T09:00:00",
      Gia: 3500000,
      imageUrl: HanoiImage,
      MoTa: "Mô tả cho Tour 3...",
    },
  ];

  const [filterPrice, setFilterPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    navigate(`/tourdetail/${tourId}`);
  };

  return (
    <div className="search-page-container">
      <Row>
        <div className="filter col-lg-3 col-md-3 col-sm-3">
          <center>
            <h3>Lọc kết quả</h3>
          </center>

          <Row className="minmax">
            <p>Ngân sách</p>
            <input
              type="number"
              placeholder="Giá nhỏ nhất"
              min={500000}
              value={500000}
            />
            <input type="number" placeholder="Giá lớn nhất" max={100000000} />
          </Row>
          <Row className="sort">
            <p>Sắp xếp theo</p>

            <select
              className="input-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </Row>
          <Row className="avai">
            <h6 className="col-lg-8">Số người</h6>
            <input type="number" className="col-lg-4" />
          </Row>
          <Row>
            <Button> Lọc</Button>
          </Row>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-9 search-tour-result">
          <div className="row">
            {sampleData.map((tour) => (
              <div
                key={tour.MaTour}
                className="search-tour-item col-lg-3 col-md-3 col-sm-3"
                onClick={() => handleTourClick(tour.MaTour)}
              >
                <img src={tour.imageUrl} alt={tour.TenTour} />
                <div className="content">
                  <h5 className="tourname">{tour.TenTour}</h5>
                  <p>
                    Ngày khởi hành: <span>{tour.NgayKhoiHanh}</span>
                  </p>
                  <p>
                    Điểm xuất phát: <span>{tour.NoiKhoiHanh}</span>
                  </p>
                  <p className="price">{tour.Gia.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Row>
    </div>
  );
};

export default SearchPage;
