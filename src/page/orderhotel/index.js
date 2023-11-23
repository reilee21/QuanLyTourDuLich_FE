import { RiMapPin2Line } from "react-icons/ri";
import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./orderhotel.scss";
import { Row, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
const SearchPage = () => {
  const [star, setStar] = useState(2);
  const handleRatingChange = (value) => {
    const newStar = value != star ? value : 0;
    setStar(newStar);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.result;
  const [filteredData, setFilterData] = useState(data);
  //panigate=====================
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const offset = pageNumber * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  //=====================

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const handleHotelClick = (hotel) => {
    navigate(`/hoteldetail/${hotel.idKhachSan}`);
  };
  const handleFilter = () => {
    let filtered = data.slice();
    if (maxPrice >= 1000000 && isNaN(minPrice)) {
      filtered = filtered.filter((hotel) => {
        const gia = getLowestPrice(hotel.loaiPhongs);
        return gia <= maxPrice;
      });
    } else if (isNaN(maxPrice) && minPrice >= 100000) {
      filtered = filtered.filter((hotel) => {
        const gia = getLowestPrice(hotel.loaiPhongs);
        console.log(minPrice);
        return gia >= minPrice;
      });
    } else if (!isNaN(maxPrice) && !isNaN(minPrice)) {
      filtered = filtered.filter((hotel) => {
        const gia = getLowestPrice(hotel.loaiPhongs);
        return gia >= minPrice && gia <= maxPrice;
      });
    }

    if (star > 0) {
      filtered = filtered.filter((item) => {
        return item.soSao === star;
      });
    }

    if (sortBy === "asc") {
      filtered.sort((a, b) => {
        const giaA = getLowestPrice(a.loaiPhongs);
        const giaB = getLowestPrice(b.loaiPhongs);
        return giaA - giaB;
      });
    } else if (sortBy === "desc") {
      filtered.sort((a, b) => {
        const giaA = getLowestPrice(a.loaiPhongs);
        const giaB = getLowestPrice(b.loaiPhongs);
        return giaB - giaA;
      });
    }

    setFilterData(filtered);
    setPageNumber(0);
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <TiStarFullOutline key={i} size={22} color="#fdc432" />
        ) : (
          <TiStarOutline key={i} size={22} color="#fdc432" />
        )
      );
    }
    return stars;
  };
  const getLowestPrice = (loaiPhongs) => {
    if (!loaiPhongs || loaiPhongs.length === 0) {
      return null;
    }
    let minPrice = loaiPhongs[0].gia;

    for (let i = 1; i < loaiPhongs.length; i++) {
      if (loaiPhongs[i].gia < minPrice) {
        minPrice = loaiPhongs[i].gia;
      }
    }

    return minPrice;
  };
  return (
    <>
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
            <p>
              Xếp hạng sao
              <span className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <React.Fragment key={value}>
                    <label htmlFor={`rate-${value}`} style={{ "--i": value }}>
                      <TiStarFullOutline
                        size={32}
                        className={value <= star ? "active" : ""}
                      />
                    </label>
                    <input
                      type="radio"
                      name="star"
                      id={`rate-${value}`}
                      value={value}
                      checked={star === value}
                      onChange={() => handleRatingChange(value)}
                      onClick={(e) => {
                        if (star === value) {
                          e.preventDefault(); // Prevent default behavior
                          handleRatingChange(0); // Set to 0 to deselect
                        }
                      }}
                    />
                  </React.Fragment>
                ))}
              </span>
            </p>
          </Row>
          <Row>
            <Button onClick={handleFilter}> Lọc</Button>
          </Row>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-9 search-tour-result">
          <center>
            <h2>Kết Quả Tìm Kiếm</h2>
          </center>
          <div className="search-khachsan-results row">
            {currentPageData.map((hotel) => (
              <Row
                className="khachsan"
                key={hotel.idKhachSan}
                onClick={() => handleHotelClick(hotel)}
              >
                <img
                  className="imghotel col-lg-3 col-md-3"
                  src={`data:image/jpeg;base64,${hotel.anh}`}
                  alt={`Tour Image ${hotel.ten}`}
                />
                <div className="info col-lg-9 col-md-9">
                  <h3>{hotel.ten}</h3>
                  <div className="star-icons col-lg-3">
                    {renderStars(hotel.soSao)}
                  </div>
                  <div className="diachi">
                    <RiMapPin2Line size={16} />
                    <span>{hotel.diaChi}</span>
                  </div>
                  <div className="lowest-price">
                    <span>
                      {getLowestPrice(hotel.loaiPhongs).toLocaleString()}đ
                    </span>
                  </div>
                </div>
              </Row>
            ))}
          </div>
          <center>
            <ReactPaginate
              pageCount={Math.ceil(filteredData.length / itemsPerPage)} // Tổng số trang
              pageRangeDisplayed={3} // Số trang hiển thị trước và sau trang hiện tại
              marginPagesDisplayed={2} // Số trang hiển thị ở hai bên
              onPageChange={handlePageClick} // Xử lý khi chuyển trang
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              previousLinkClassName={"page-link"} // Class cho nút "Trang trước"
              nextLinkClassName={"page-link"} // Class cho nút "Trang sau"
              pageClassName={"page-item"} // Class cho nút trang
              pageLinkClassName={"page-link"} // Class cho liên kết trang
              breakClassName={"page-item"} // Class cho nút "..."
              breakLinkClassName={"page-link"} // Class cho liên kết "..."
            />
          </center>
        </div>
      </Row>
    </>
  );
};

export default SearchPage;
