import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import DetailsDanhGiaModal from "./details"; // Create this modal component
import "./index.scss";
const DanhGia = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDanhGia, setSelectedDanhGia] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items per page

  // Example data
  const data = [
    {
      MaDanhGia: 1,
      ThoiDiem: "2023-11-08 14:30:00",
      NoiDung: "Good tour",
      MaTour: "T1",
      MaKH: "KH1",
    },
    {
      MaDanhGia: 2,
      ThoiDiem: "2023-11-09 10:45:00",
      NoiDung: "Excellent service",
      MaTour: "T2",
      MaKH: "KH2",
    },
    // Add more data as needed
  ];

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleDetailsClick = (danhGia) => {
    setSelectedDanhGia(danhGia);
    setShowDetailsModal(true);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="row">
        <div className="title" id="danhgiatitle">
          <h4>Danh sách đánh giá</h4>
        </div>
        <div className="col-md-12" id="danhgiatable">
          <div className="table-responsive">
            <table id="mytable">
              <thead>
                <tr>
                  <th className="stt">STT</th>
                  <th className="maTour">Mã Tour</th>
                  <th className="tenKH">Tên Khách Hàng</th>
                  <th className="thoiDiem">Thời Điểm</th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((danhGia, index) => (
                  <tr
                    id="danhgia"
                    key={danhGia.MaDanhGia}
                    onClick={() => handleDetailsClick(danhGia)}
                  >
                    <td className="stt">{index + 1}</td>
                    <td className="maTour">{danhGia.MaTour}</td>
                    <td className="tenKH">Tên Khách Hàng</td>
                    <td className="thoiDiem">{danhGia.ThoiDiem}</td>
                    <td className="del">
                      <Button
                        variant="outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("xoá");
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
      <DetailsDanhGiaModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        danhGia={selectedDanhGia}
      />
    </>
  );
};

export default DanhGia;
