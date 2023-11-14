import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import khachHangData from "./datatv";
import ReactPaginate from "react-paginate";
import AddFormModal from "./Add"; // Thay thế bằng thành phần AddFormModal thực tế
import EditFormModal from "./Edit"; // Thay thế bằng thành phần EditFormModal thực tế
import "./index.scss";
import { Link } from "react-router-dom";

const KhachHang = () => {
  const [listdata, setListdata] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (khachHangData) => {
    const selectedPage = khachHangData.selected;
    setPageNumber(selectedPage);
  };

  useEffect(() => {
    setListdata(khachHangData); // Thay thế 'data' bằng dữ liệu thực tế từ nguồn dữ liệu hoặc API
  }, []);

  const handleAddSubmit = () => {
    setShowAddModal(false);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = (formData) => {
    const updatedData = listdata.map((item) =>
      item.MaKH === formData.MaKH ? formData : item
    );
    setListdata(updatedData);
    closeEditModal();
  };

  const handleDelete = (item) => {
    // Implement delete logic if needed
  };

  // Filter the data based on the search query
  const filteredData = listdata.filter(
    (item) =>
      item.HoTen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.SoDienThoaiKH.includes(searchQuery)
  );

  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách khách hàng</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={openAddModal}>
            Thêm mới
          </Button>
          <div className="col-md-5 d-flex justify-content-between align-items-center ">
            <Button className="acclist" as={Link} to="taikhoan">
              Tài khoản khách hàng
            </Button>
            <Form.Group className="search">
              <Form.Control
                type="text"
                placeholder="Họ tên hoặc số điện thoại"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
        <div className="col-md-12"></div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table id="cskhtable">
              <thead>
                <tr>
                  <th className="stt">STT</th>
                  <th className="ten">Họ tên</th>
                  <th className="ngaysinh">Ngày sinh</th>
                  <th className="email">Email</th>
                  <th className="diachi">Địa chỉ</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 &&
                  currentPageData.map((item, index) => {
                    return (
                      <tr key={item.MaKH} onClick={() => openEditModal(item)}>
                        <td className="stt">{index + 1}</td>
                        <td className="ten">{item.HoTen}</td>
                        <td className="ngaysinh">{item.NgaySinh}</td>
                        <td className="email">{item.Email}</td>
                        <td className="diachi">{item.DiaChi}</td>
                        <td className="edit">
                          <Button
                            variant="outline-warning"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(item);
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
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Tạo phân trang */}
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
      <AddFormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
      />

      <EditFormModal
        show={showEditModal}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        editData={editData}
      />
    </>
  );
};

export default KhachHang;
