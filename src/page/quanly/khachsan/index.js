import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "../../../components/exportcom";
import axios from "../../../api/axios";

const KhachSan = () => {
  const navigate = useNavigate();
  const [listdata, setListdata] = useState([]);
  const [editData, setEditData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showdelModal, setShowdelModal] = useState(false);

  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const fetchdata = async () => {
    try {
      const res = await axios.get("api/khachsans");
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

      return (
        item.ten.toLowerCase().includes(searchString) ||
        item.diaChi.toLowerCase().includes(searchString)
      );
    });
    setFilteredData(filteredResult);
    setPageNumber(0);
  };
  const handleAddClick = () => {
    navigate("add");
  };

  const handleEditClick = (item) => {
    navigate(`${item.idKhachSan}`, { state: { ks: item } });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/khachsans/${editData.idKhachSan}`);
      fetchdata();
    } catch (e) {
      alert("Không thể xoá khách sạn");
    }

    setShowdelModal(false);
  };

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Khách Sạn</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên Khách Sạn hoặc địa chỉ"
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
                  <th className="stt">STT</th>
                  <th className="tenks">Tên Khách Sạn</th>
                  <th className="diachi">Địa Chỉ</th>
                  <th className="iddoitac"> Số sao</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item, index) => (
                  <tr
                    key={item.idKhachSan}
                    onClick={() => handleEditClick(item)}
                  >
                    <td className="stt">{index + 1}</td>
                    <td className="tenks">{item.ten}</td>
                    <td className="diachi">{item.diaChi}</td>
                    <td className="iddoitac">{item.soSao}</td>
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
                      <Button
                        variant="outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditData(item);
                          setShowdelModal(true);
                        }}
                      >
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
      <DeleteConfirmationModal
        show={showdelModal}
        onCancel={() => {
          setEditData(null);
          setShowdelModal(false);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default KhachSan;
