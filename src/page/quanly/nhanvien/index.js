// NhanVien.js
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./index.scss";
import AddNhanVienFormModal from "./Add";
import EditNhanVienFormModal from "./Edit";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const NhanVien = () => {
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showCreateAcc, setShowCreateAcc] = useState(false);

  const [editData, setEditData] = useState({});

  const handleAddClick = () => {
    setShowAddFormModal(true);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowEditFormModal(true);
  };
  const handleCreatAccClick = (item) => {
    setEditData(item);
    setShowCreateAcc(true);
  };
  const handleDelete = (item) => {
    console.log(item);
  };
  // Example data for NhanVien
  const data = [
    {
      MaNV: "NV1",
      HoTen: "Nguyen Van A",
      SoDienThoaiNV: "1234567890",
      SoCCCD: "123-456-789",
      Email: "nhanvien1@example.com",
      ChucVu: "Quản lý",
    },
    {
      MaNV: "NV2",
      HoTen: "Nguyen Van B",
      SoDienThoaiNV: "9876543210",
      SoCCCD: "987-654-321",
      Email: "nhanvien2@example.com",
      ChucVu: "Phương tiện và dịch vụ",
    },
  ];

  const [listdata, setListdata] = useState(data);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = listdata.slice(offset, offset + itemsPerPage);
  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Nhân Viên</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <div className="col-md-5 d-flex justify-content-between align-items-center ">
            <Button className="acclist" as={Link} to="taikhoannv">
              Tài khoản nhân viên
            </Button>
            <Form.Group className="search">
              <Form.Control
                type="text"
                placeholder="Mã NV, Họ tên, Email hoặc Chức vụ"
                // value={searchQuery}
              />
            </Form.Group>
          </div>
        </div>

        <div className="col-md-12"></div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table id="bangnv">
              <thead>
                <tr>
                  <th className="maNV">Mã NV</th>
                  <th className="hoTen">Họ và Tên</th>
                  <th className="email">Email</th>
                  <th className="chucVu">Chức Vụ</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item) => (
                  <tr key={item.MaNV} onClick={() => handleEditClick(item)}>
                    <td className="maNV">{item.MaNV}</td>
                    <td className="hoTen">{item.HoTen}</td>
                    <td className="email">{item.Email}</td>
                    <td className="chucVu">{item.ChucVu}</td>

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
                          handleDelete(item);
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
        <ReactPaginate
          pageCount={Math.ceil(listdata.length / itemsPerPage)} // Tổng số trang
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
      </div>
      <AddNhanVienFormModal
        show={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
      />

      <EditNhanVienFormModal
        show={showEditFormModal}
        onClose={() => setShowEditFormModal(false)}
        itemToEdit={editData}
      />
    </>
  );
};

export default NhanVien;
