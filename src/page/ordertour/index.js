// SearchPage.js
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./ordertour.scss";
import { Button, Row } from "react-bootstrap";
const SearchPage = () => {
  const location = useLocation();
  const data = location.state.tourlist;
  const [filteredData, setFilterData] = useState(data);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [slot, setSlot] = useState(0);

  const navigate = useNavigate();

  const handleTourClick = (tour) => {
    navigate(`/tour/${tour.maTour}`, { state: { tourdetail: tour } });
  };
  const handleFilter = () => {
    let filteredData = data.slice();
    if (minPrice !== 0 || maxPrice !== 0) {
      filteredData = filteredData.filter(
        (tour) => tour.gia >= minPrice && tour.gia <= maxPrice
      );
    }

    if (sortBy === "asc") {
      filteredData.sort((a, b) => a.gia - b.gia);
    } else if (sortBy === "desc") {
      filteredData.sort((a, b) => b.gia - a.gia);
    }
    if (slot > 0) {
      filteredData = filteredData.filter(
        (tour) => tour.soLuongNguoi - tour.soLuongNguoiDaDat >= slot
      );
    }
    setFilterData(filteredData);
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
              min={100000}
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value, 10))}
            />
            <input
              type="number"
              placeholder="Giá lớn nhất"
              max={100000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            />
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
            <input
              type="number"
              className="col-lg-4"
              onChange={(e) => setSlot(e.target.value)}
            />
          </Row>
          <Row>
            <Button onClick={handleFilter}> Lọc</Button>
          </Row>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-9 search-tour-result">
          <Row>
            <center>
              {filteredData.length ? (
                <h4> Kết quả tìm kiếm </h4>
              ) : (
                <h4> Không tìm thấy Tour phù hợp </h4>
              )}
              <hr />
            </center>
          </Row>
          <div className="row">
            {filteredData.map((tour) => (
              <div
                key={tour.maTour}
                className=" col-lg-4 md-4 sm-4"
                onClick={() => handleTourClick(tour)}
              >
                <div className="search-tour-item">
                  <img
                    src={`data:image/jpeg;base64,${tour.image}`}
                    alt={`Tour Image ${tour.tenTour}`}
                  />
                  <div className="content">
                    <p className="tourname">{tour.tenTour}</p>
                    <p>
                      Ngày khởi hành:{" "}
                      <span>{tour.ngayKhoiHanh.slice(0, 10)}</span>
                    </p>
                    <p>
                      Nơi khởi hành: <span>{tour.noiKhoiHanh}</span>
                    </p>
                    <p className="price">{tour.gia.toLocaleString()}đ</p>
                    <p className="availa">
                      Số chỗ còn lại :{" "}
                      <span>{tour.soLuongNguoi - tour.soLuongNguoiDaDat}</span>
                    </p>
                  </div>
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
