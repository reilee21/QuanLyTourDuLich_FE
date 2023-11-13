import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddVoucherFormModal from "./Add";
import EditVoucherFormModal from "./Edit";
import "./index.scss";

const Voucher = () => {
  const voucherData = [
    {
      MaVoucher: "V001",
      TenVoucher: "Discount 10%",
      ThoiGianBatDau: new Date("2023-01-01"),
      ThoiGianKetThuc: new Date("2023-12-31"),
      SoLuong: 100,
      PhanTramGiam: 10,
      DiemDoiThuong: 50,
      IdDoiTac: "D001",
    },
    {
      MaVoucher: "V002",
      TenVoucher: "50% Off on Electronics",
      ThoiGianBatDau: new Date("2023-02-01"),
      ThoiGianKetThuc: new Date("2023-03-31"),
      SoLuong: 50,
      PhanTramGiam: 50,
      DiemDoiThuong: 75,
      IdDoiTac: "D002",
    },

    // Add more sample voucher data as needed
  ];

  const [voucherList, setVoucherList] = useState(voucherData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVoucher, setEditVoucher] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };

  useEffect(() => {
    setVoucherList(voucherData);
  }, []);

  const handleAddSubmit = () => {
    setShowAddModal(false);
    // Implement logic to add a new voucher here
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openEditModal = (voucher) => {
    setEditVoucher(voucher);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = (formData) => {
    // Implement logic to edit the voucher here
  };

  const handleDelete = (voucher) => {
    // Implement delete logic if needed
  };

  // Filter the data based on the search query
  const filteredData = voucherList.filter((voucher) =>
    voucher.TenVoucher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách voucher</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={openAddModal}>
            Thêm mới voucher
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên voucher"
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

                  <th className="ten">Tên Voucher</th>
                  <th className="soluong">Số lượng</th>
                  <th className="ptg">Phần trăm giảm</th>

                  {/* Add other voucher-specific headers here */}
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 &&
                  currentPageData.map((voucher, index) => {
                    return (
                      <tr
                        key={voucher.MaVoucher}
                        onClick={() => {
                          openEditModal(voucher);
                        }}
                      >
                        <td className="stt">{index + 1}</td>

                        <td className="ten">{voucher.TenVoucher}</td>
                        <td className="soluong">{voucher.SoLuong}</td>
                        <td className="ptg">{voucher.PhanTramGiam}</td>

                        {/* Render other voucher-specific data here */}
                        <td className="edit">
                          <Button
                            variant="outline-warning"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(voucher);
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
                              handleDelete(voucher);
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
      <AddVoucherFormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
      />

      <EditVoucherFormModal
        show={showEditModal}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        editVoucher={editVoucher}
      />
    </>
  );
};

export default Voucher;
