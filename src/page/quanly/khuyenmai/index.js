import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const KhuyenMai = () => {
  const khuyenMaiData = [
    {
      MaKM: 1,
      TenKM: "Khuyến mãi 1",
      PhanTramKM: 0.1,
      ThoiGianBatDau: new Date("2023-11-12"),
      ThoiGianKetThuc: new Date("2023-11-15"),
    },
    {
      MaKM: 2,
      TenKM: "Khuyến mãi 2",
      PhanTramKM: 0.2,
      ThoiGianBatDau: new Date("2023-11-13"),
      ThoiGianKetThuc: new Date("2023-11-16"),
    },
    {
      MaKM: 3,
      TenKM: "Khuyến mãi 3",
      PhanTramKM: 0.3,
      ThoiGianBatDau: new Date("2023-11-14"),
      ThoiGianKetThuc: new Date("2023-11-17"),
    },
  ];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const pageCount = Math.ceil(khuyenMaiData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleAddClick = () => {
    // Navigate to the add promotion page
    navigate("add");
  };

  const handleEditClick = (item) => {
    navigate(`${item.MaKM}`, { state: item });
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = khuyenMaiData.slice(startIndex, endIndex);

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Khuyến Mãi</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên Khuyến Mãi"
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
                  <th className="tenkm">Tên Khuyến Mãi</th>
                  <th className="phantram">Phần Trăm KM</th>
                  <th className="thoigianbd">Thời Gian Bắt Đầu</th>
                  <th className="thoigiankt">Thời Gian Kết Thúc</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((item, index) => (
                  <tr key={item.MaKM} onClick={() => handleEditClick(item)}>
                    <td className="stt">{index + 1}</td>
                    <td className="tenkm">{item.TenKM}</td>
                    <td className="phantram">{item.PhanTramKM}</td>
                    <td className="thoigianbd">
                      {item.ThoiGianBatDau.toLocaleDateString()}
                    </td>
                    <td className="thoigiankt">
                      {item.ThoiGianKetThuc.toLocaleDateString()}
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
    </>
  );
};

export default KhuyenMai;
