import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddDiaDiemFormModal from "./AddForm";
import EditDiaDiemFormModal from "./EditForm";
import axios from "../../../api/axios";
import { DeleteConfirmationModal } from "../../../components/exportcom";
const DiaDiem = () => {
  const [listdata, setListdata] = useState([]);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showdelModal, setShowdelModal] = useState(false);

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
      const res = await axios.get("api/DiaDiems");
      setFilteredData(res);
      setListdata(res);
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
      return item.tenDiaDiem.toLowerCase().includes(searchString);
    });
    setFilteredData(filteredResult);
    setPageNumber(0);
  };

  const handleAddClick = () => {
    setShowAddFormModal(true);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowEditFormModal(true);
  };
  const closeModal = async () => {
    setShowAddFormModal(false);
    setShowEditFormModal(false);
    setShowdelModal(false);

    setRefreshFlag((prev) => !prev);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`api/DiaDiems/${editData.idDiaDiem}`);
      closeModal();
      setEditData({});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách địa điểm</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên địa điểm"
              value={searchQuery}
              onChange={handleSearchChange}
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
                  <th className="ten">Tên địa điểm</th>
                  <th className="loai">Loại</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item, index) => (
                  <tr key={index} onClick={() => handleEditClick(item)}>
                    <td className="stt">{index + 1}</td>
                    <td className="ten">{item.tenDiaDiem}</td>
                    <td className="loai">
                      {item.loai ? "Trong nước" : "Nước ngoài"}
                    </td>
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
                          setShowdelModal(true);
                          setEditData(item);
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
      <AddDiaDiemFormModal show={showAddFormModal} onClose={closeModal} />
      <EditDiaDiemFormModal
        show={showEditFormModal}
        onClose={closeModal}
        itemToEdit={editData}
      />{" "}
      <DeleteConfirmationModal
        show={showdelModal}
        onCancel={closeModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DiaDiem;
