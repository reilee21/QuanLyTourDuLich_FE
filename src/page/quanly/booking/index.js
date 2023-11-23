import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { formatDate } from "../../../utils/formatdate";
const Booking = () => {
  const navigate = useNavigate();
  const [listdata, setListdata] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const fetchdata = async () => {
    try {
      const res = await axios.get("api/bookings");
      setFilteredData(res);
      setListdata(res);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2 || searchQuery === "") setFilteredData(listdata);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length < 2 || searchQuery === "") {
      return;
    }
    const filteredResult = listdata.filter((item) => {
      const searchString = searchQuery.toLowerCase();

      return item.idBooking.toLowerCase().includes(searchString);
    });
    setFilteredData(filteredResult);
    setPageNumber(0);
  };
  const handleAddClick = () => {
    navigate("them");
  };

  const handleEditClick = (item) => {
    navigate(`${item.idBooking}`);
  };
  useEffect(() => {
    if (sortBy === "ks") {
      const filteredResult = listdata.filter((item) => {
        return item.loaiBooking == 1;
      });
      setFilteredData(filteredResult);
      setPageNumber(0);
      return;
    }
    if (sortBy === "t") {
      const filteredResult = listdata.filter((item) => {
        return item.loaiBooking == 0;
      });
      setFilteredData(filteredResult);
      setPageNumber(0);
      return;
    }
    setFilteredData(listdata);
    setPageNumber(0);
  }, [sortBy]);
  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Tour</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <select
            className="input-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Mặc định</option>
            <option value="ks">Khách sạn</option>
            <option value="t">Tour</option>
          </select>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên Tour hoặc mã tour"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </div>

        <div className="col-md-12">
          <div className="table-responsive">
            <table id="mytable">
              <thead>
                <tr>
                  <th className="matour">Mã booking</th>
                  <th className="tentour">Thời điểm book </th>
                  <th className="ngay">Giá trị </th>
                  <th className="noi">Thanh toán</th>
                  <th className="gia">Loại booking </th>

                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item) => (
                  <tr
                    key={item.idBooking}
                    onClick={() => handleEditClick(item)}
                  >
                    <td className="matour">{item.idBooking}</td>
                    <td className="tentour">{formatDate(item.thoiDiemBook)}</td>
                    <td className="ngay">{item.giaTri.toLocaleString()}</td>

                    <td className="noi">
                      {item.thanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
                    </td>
                    <td className="gia">
                      {item.loaiBooking ? "Khách sạn" : "Tour"}{" "}
                    </td>
                    <td className="edit"></td>

                    <td className="del"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Booking;
