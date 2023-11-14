import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddDiaDiemFormModal from "./AddForm";
import EditDiaDiemFormModal from "./EditForm";

const DiaDiem = () => {
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10; // Number of items per page

  const data = [
    {
      stt: 1,
      ten: "Item 1",
      loai: 0,
    },
    {
      stt: 2,
      ten: "Item 2",
      loai: 1,
    },
    // Add more data as needed
  ];

  // Calculate the total number of pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Function to handle page change
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calculate the range of items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

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
                  <th className="ten">Tên địa điểm</th>
                  <th className="loai">Loại</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((item) => (
                  <tr key={item.stt} onClick={() => handleEditClick(item)}>
                    <td className="stt">{item.stt}</td>
                    <td className="ten">{item.ten}</td>
                    <td className="loai">
                      {item.loai === 0 ? "Trong nước" : "Nước ngoài"}
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
      <AddDiaDiemFormModal
        show={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
      />
      <EditDiaDiemFormModal
        show={showEditFormModal}
        onClose={() => setShowEditFormModal(false)}
        itemToEdit={editData}
      />
    </>
  );
};

export default DiaDiem;
