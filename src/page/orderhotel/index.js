// SearchPage.js
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import DatePicker from "react-datepicker";
import HotelDetail from "./hoteldetail";
import { RiMapPin2Line } from "react-icons/ri";

import "react-datepicker/dist/react-datepicker.css";
import "./orderhotel.scss";
import khachsanImage from "../../assets/image/khachsan1.jpg";
import { Row, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const SearchPage = () => {
  const fakeData = [
    {
      id: 1,
      name: "Mia Resort Nha Trang",
      destination: "Nha Trang",
      diachi:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",

      description:
        "Mia Resort Nha Trang nằm tại địa điểm lý tưởng cho các khách đi công tác và khách du lịch ở Nha Trang. Khách sạn đưa ra hàng loạt các thiết bị để đem đến những trải nghiệm thú vị cho bạn. Dịch vụ phòng 24 giờ, miễn phí wifi tất cả các phòng, an ninh 24 giờ, dịch vụ phòng hàng ngày, lò sưởi nằm trong những tiện nghi khách nghỉ tại đây có thể tận hưởng. Một số phòng nghỉ được trang bị tivi màn hình phẳng, giá treo quần áo, cafe hòa tan miễn phí, trà miễn phí, nước uống chào đón miễn phí. Hãy thư giãn sau một ngày tham quan bằng cách nghỉ ngơi trong phòng hoặc tận hưởng các dịch vụ giải trí của bãi biển riêng, phòng thể dục, hồ bơi ngoài trời, spa, massage. Cho dù bạn đến Nha Trang vì lý do gì, Mia Resort Nha Trang sẽ khiến bạn có cảm giác thân quen như đang ở nhà.",
      imageUrl: khachsanImage,
    },
    {
      id: 2,
      name: "Mia Resort Nha Trang",
      destination: "Hội An",
      diachi:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",

      description:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",
      imageUrl: khachsanImage,
    },
    {
      id: 3,
      name: "Mia Resort Nha Trang",
      destination: "Nha Trang",
      diachi:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",

      description:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",
      imageUrl: khachsanImage,
    },
    {
      id: 8,
      name: "Mia Resort Nha Trang",
      destination: "Nha Trang",
      diachi:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",

      description:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",
      imageUrl: khachsanImage,
    },
    {
      id: 7,
      name: "Mia Resort Nha Trang",
      destination: "Hội An",
      diachi:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",

      description:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",
      imageUrl: khachsanImage,
    },
    {
      id: 6,
      name: "Mia Resort Nha Trang",
      destination: "Nha Trang",
      diachi:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",

      description:
        "Bãi Dông, Cam Hải Đông, Cam Lâm , Nha Trang, Khánh Hòa, Việt Nam",
      imageUrl: khachsanImage,
    },
  ];
  const navigate = useNavigate();

  //panigate=====================
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const offset = pageNumber * itemsPerPage;
  const currentPageData = fakeData.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  //=====================

  const handleHotelClick = (hotel) => {
    navigate(`/hoteldetail/${hotel.id}`, { state: { hotel: hotel } });
  };

  return (
    <>
      <Row>
        <div className="col-lg-9 col-md-9 col-sm-9 search-tour-result">
          <center>
            <h2>Kết Quả Tìm Kiếm</h2>
          </center>
          <div className="search-khachsan-results row">
            {currentPageData.map((hotel) => (
              <Row
                className="khachsan"
                key={hotel.id}
                onClick={() => handleHotelClick(hotel)}
              >
                <img
                  className="imghotel col-lg-3 col-md-3"
                  src={hotel.imageUrl}
                  alt={`Image of ${hotel.name}`}
                />
                <div className="info col-lg-9 col-md-9">
                  <h3>{hotel.name}</h3>
                  <p>Địa chỉ: {hotel.destination}</p>
                  <p>
                    <RiMapPin2Line />
                    {hotel.diachi}
                  </p>
                </div>
              </Row>
            ))}
          </div>
          <center>
            <ReactPaginate
              pageCount={Math.ceil(fakeData.length / itemsPerPage)} // Tổng số trang
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
