import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import data from "./data";
import ReactPaginate from "react-paginate";
import AddFormModal from "./AddForm";
import EditFormModal from "./EditForm";
import "./index.scss";
const PhuongTien = () => {
  const [listdata, setListdata] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };

  useEffect(() => {
    setListdata(data);
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
      item.stt === formData.stt ? formData : item
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
      item.tenPhuongTien.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doiTac.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <div className="container">
      <div className="row">
        <div className="title">
          <h4>Danh sách phương tiện</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={openAddModal}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên phương tiện hoặc tên đối tác"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-md-12"></div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table id="mytable">
              <thead>
                <tr>
                  <th className="stt">STT</th>
                  <th className="ten">Tên Phương tiện</th>
                  <th className="mota">Mô tả </th>
                  <th className="doitac">Đối tác</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 &&
                  currentPageData.map((item, index) => {
                    return (
                      <tr key={item.stt}>
                        <td className="stt">{item.stt}</td>
                        <td className="ten">{item.tenPhuongTien}</td>
                        <td className="mota">{item.moTa}</td>
                        <td className="doitac">{item.doiTac}</td>
                        <td className="edit">
                          <Button
                            variant="outline-warning"
                            onClick={() => openEditModal(item)}
                          >
                            <AiFillEdit />
                          </Button>
                        </td>
                        <td className="del">
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(item)}
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
    </div>
  );
};

export default PhuongTien;
