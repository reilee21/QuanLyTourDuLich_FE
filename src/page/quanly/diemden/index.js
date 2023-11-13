import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddDiemDenFormModal from "./Add";
import EditDiemDenFormModal from "./Edit";

const DiemDen = () => {
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10; // Number of items per page

  // Example data
  const data = [
    {
      IdDiemDen: "DD1",
      TenDiemDen: "DiemDen 1",
      IdDiaDiem: 1,
    },
    {
      IdDiemDen: "DD2",
      TenDiemDen: "DiemDen 2",
      IdDiaDiem: 2,
    },
    // Add more data as needed
  ];

  // Calculate the total number of pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Function to handle page change
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleAddClick = () => {
    setShowAddFormModal(true);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowEditFormModal(true);
  };

  // Calculate the range of items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách điểm đến</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên điểm đến"
              //value={searchQuery}
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
                  <th className="TenDiemDen">Tên điểm đến</th>
                  <th className="IdDiaDiem">ID Địa Điểm</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((item, index) => (
                  <tr
                    key={item.IdDiemDen}
                    className="diemdentr"
                    onClick={() => handleEditClick(item)}
                  >
                    <td className="stt">{index + 1}</td>
                    <td className="TenDiemDen">{item.TenDiemDen}</td>
                    <td className="IdDiaDiem">{item.IdDiaDiem}</td>
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
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
      <AddDiemDenFormModal
        show={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
      />
      <EditDiemDenFormModal
        show={showEditFormModal}
        onClose={() => setShowEditFormModal(false)}
        itemToEdit={editData}
      />
    </>
  );
};

export default DiemDen;
