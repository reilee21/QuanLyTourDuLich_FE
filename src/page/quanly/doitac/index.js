import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AddDoiTacFormModal from "./AddForm";
import EditDoiTacFormModal from "./EditForm";
import ReactPaginate from "react-paginate";
const DoiTac = () => {
  // Example data for Doi Tac
  const data = [
    {
      stt: 1,
      ten: "Doi Tac 1",
      email: "doitac1@example.com",
      sdt: "1234567890",
    },
    {
      stt: 2,
      ten: "Doi Tac 2",
      email: "doitac2@example.com",
      sdt: "9876543210",
    },
  ];

  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [listdata, setListdata] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = listdata.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    setListdata(data);
  }, []);
  const handleAddClick = () => {
    setShowAddFormModal(true);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowEditFormModal(true);
  };

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Đối Tác</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên Đối Tác hoặc Email"
              // value={searchQuery}
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
                  <th className="ten">Tên Đối Tác</th>
                  <th className="email">Email</th>
                  <th className="sdt">Số Điện Thoại</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item) => (
                  <tr
                    key={item.stt}
                    onClick={() => {
                      handleEditClick(item);
                    }}
                  >
                    <td className="stt">{item.stt}</td>
                    <td className="ten">{item.ten}</td>
                    <td className="email">{item.email}</td>
                    <td className="sdt">{item.sdt}</td>
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
      <AddDoiTacFormModal
        show={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
      />

      <EditDoiTacFormModal
        show={showEditFormModal}
        onClose={() => setShowEditFormModal(false)}
        itemToEdit={editData}
      />
    </>
  );
};

export default DoiTac;
