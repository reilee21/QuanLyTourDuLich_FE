import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddForm from "./Add";
import EditForm from "./Edit";
import "./index.scss";
const HoiDap = () => {
  const data = [
    {
      id: 1,
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "How to create a React component?",
      answer:
        "You can create a React component by extending the 'Component' class.",
    },
    {
      id: 3,
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript used in React to describe the user interface.",
    },
    // Add more sample data as needed
  ];
  const [listdata, setListdata] = useState(data);
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

  const handleAddSubmit = () => {
    setShowAddModal(false);
    // Implement the logic to add new question and answer here
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
    // Implement the logic to edit question and answer here
  };

  const handleDelete = (item) => {
    // Implement delete logic if needed
  };

  // Filter the data based on the search query
  const filteredData = listdata.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>FAQs</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={openAddModal}>
            Thêm mới câu hỏi
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm câu hỏi hoặc trả lời"
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

                  <th className="question">Câu hỏi</th>
                  <th className="answer">Trả lời</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 &&
                  currentPageData.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        onClick={() => openEditModal(item)}
                        id="trfaq"
                      >
                        <td className="stt">{index + 1}</td>

                        <td className="question">{item.question}</td>
                        <td className="answer">{item.answer}</td>
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
      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
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
      <AddForm
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
      />

      <EditForm
        show={showEditModal}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        editData={editData}
      />
    </>
  );
};

export default HoiDap;
