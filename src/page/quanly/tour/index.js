import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
import axios from "../../../api/axios";
import { formatTimeToHours } from "../../../utils/fomattime";
import { formatDate } from "../../../utils/formatdate";
const Tour = () => {
  const navigate = useNavigate();
  const [listdata, setListdata] = useState([]);
  const [editData, setEditData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const fetchdata = async () => {
    try {
      const res = await axios.get("api/Tours");
      setFilteredData(res);
      setListdata(res);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [refreshFlag]);

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
      return item.tenPhuongTien.toLowerCase().includes(searchString);
    });
    setFilteredData(filteredResult);
    setPageNumber(0);
  };
  const handleAddClick = () => {
    navigate("them");
  };

  const handleEditClick = (item) => {
    navigate(`${item.maTour}`, { state: { tour: item } });
  };

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
          <Form.Group className="search">
            <Form.Control type="text" placeholder="Tên Tour" />
          </Form.Group>
        </div>

        <div className="col-md-12">
          <div className="table-responsive">
            <table id="mytable">
              <thead>
                <tr>
                  <th className="matour">Mã Tour</th>
                  <th className="tentour">Tên Tour</th>
                  <th className="ngay">Ngày Khởi Hành</th>
                  <th className="gio">Giờ Tập Trung</th>
                  <th className="noi">Nơi Khởi Hành</th>

                  <th className="gia">Giá</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item) => (
                  <tr key={item.MaTour} onClick={() => handleEditClick(item)}>
                    <td className="matour">{item.maTour}</td>
                    <td className="tentour">{item.tenTour}</td>
                    <td className="ngay">{formatDate(item.ngayKhoiHanh)}</td>
                    <td className="gio">
                      {formatTimeToHours(item.gioTapTrung)}
                    </td>
                    <td className="noi">{item.noiKhoiHanh}</td>
                    <td className="gia">{item.gia}</td>
                    <td className="edit">
                      <Button
                        variant="outline-warning"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(item);
                        }}
                      >
                        <AiFillEdit />
                      </Button>
                    </td>
                    <td className="del">
                      <Button variant="outline-danger">
                        <AiFillDelete />
                      </Button>
                    </td>
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

export default Tour;
