import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "./index.scss";
const Tour = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const data = [
    {
      MaTour: 1,
      TenTour: "Tour 1",
      NgayKhoiHanh: "2023-01-01",
      NoiKhoiHanh: "Hanoi",
      GioTapTrung: "08:00 AM",
      Gia: 100,
    },
    {
      MaTour: 2,
      TenTour: "Tour 2",
      NgayKhoiHanh: "2023-02-01",
      NoiKhoiHanh: "Ho Chi Minh City",
      GioTapTrung: "09:30 AM",
      Gia: 150,
    },
    // Add more data as needed
  ];

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleAddClick = () => {
    navigate("them");
  };

  const handleEditClick = (item) => {
    navigate(`${item.MaTour}`, { state: { tour: item } });
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Tour</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên Tour"
              // Add any search functionality if needed
            />
          </Form.Group>
        </div>

        <div className="col-md-12">
          <div className="table-responsive">
            <table id="mytable">
              <thead>
                <tr>
                  <th className="matour">Mã Tour</th>
                  <th className="tentour">Tên Tour</th>
                  <th className="ngay">Ngày Khởi Hành</th>
                  <th className="gio">Giờ Tập Trung</th>
                  <th className="noi">Nơi Khởi Hành</th>

                  <th className="gia">Giá</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((item) => (
                  <tr key={item.MaTour} onClick={() => handleEditClick(item)}>
                    <td className="matour">{item.MaTour}</td>
                    <td className="tentour">{item.TenTour}</td>
                    <td className="ngay">{item.NgayKhoiHanh}</td>
                    <td className="gio">{item.GioTapTrung}</td>
                    <td className="noi">{item.NoiKhoiHanh}</td>
                    <td className="gia">{item.Gia}</td>
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

export default Tour;
