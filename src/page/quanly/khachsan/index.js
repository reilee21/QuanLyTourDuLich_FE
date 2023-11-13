import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import data from "./data";
const KhachSan = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleAddClick = () => {
    // Navigate to the add hotel page
    navigate("add");
  };

  const handleEditClick = (item) => {
    navigate(`${item.IdKhachSan}`, { state: item });
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

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
              placeholder="Tên Khách Sạn"
              // Add any search functionality if needed
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
                  <th className="mota">Mô Tả</th>
                  <th className="iddoitac"> Đối Tác</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((item, index) => (
                  <tr
                    key={item.IdKhachSan}
                    onClick={() => handleEditClick(item)}
                  >
                    <td className="stt">{index + 1}</td>
                    <td className="tenks">{item.Ten}</td>
                    <td className="diachi">{item.DiaChi}</td>
                    <td className="mota">{item.MoTa}</td>
                    <td className="iddoitac">{item.IdDoiTac}</td>
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
    </>
  );
};

export default KhachSan;
