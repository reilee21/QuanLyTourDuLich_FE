import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddVoucherFormModal from "./Add";
import EditVoucherFormModal from "./Edit";
import "./index.scss";
import { DeleteConfirmationModal } from "../../../components/exportcom";
import axios from "../../../api/axios";
const Voucher = () => {
  const [listdata, setListdata] = useState([]);
  const [editData, setEditData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showdelModal, setShowdelModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const itemsPerPage = 10;
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const fetchdata = async () => {
    try {
      const res = await axios.get("api/vouchers");
      setFilteredData(res);
      setListdata(res);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

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

      return (
        item.maVoucher.toLowerCase().includes(searchString) ||
        item.tenVoucher.toLowerCase().includes(searchString)
      );
    });
    setFilteredData(filteredResult);
    setPageNumber(0);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/vouchers/${editData.maVoucher}`);
      fetchdata();
    } catch (e) {
      alert("Không thể xoá  voucher");
    }

    setShowdelModal(false);
  };
  const onClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowdelModal(false);
    setEditData({});
    fetchdata();
  };
  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách voucher</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button
            className="add"
            variant="success"
            onClick={() => setShowAddModal(true)}
          >
            Thêm mới voucher
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên voucher hoặc mã voucher"
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

                  <th className="ten">Tên Voucher</th>
                  <th className="soluong">Số lượng</th>
                  <th className="ptg">Phần trăm giảm</th>

                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((voucher, index) => {
                  return (
                    <tr
                      key={voucher.maVoucher}
                      onClick={() => {
                        setEditData(voucher);
                        setShowEditModal(true);
                      }}
                    >
                      <td className="stt">{index + 1}</td>

                      <td className="ten">{voucher.tenVoucher}</td>
                      <td className="soluong">{voucher.soLuong}</td>
                      <td className="ptg">{voucher.phanTramGiam * 10} %</td>

                      <td className="edit">
                        <Button
                          variant="outline-warning"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditData(voucher);

                            setShowEditModal(true);
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
                            setEditData(voucher);

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
      <DeleteConfirmationModal
        show={showdelModal}
        onCancel={onClose}
        onDelete={handleDelete}
      />
      <AddVoucherFormModal show={showAddModal} onClose={onClose} />

      <EditVoucherFormModal
        show={showEditModal}
        onClose={onClose}
        editVoucher={editData}
      />
    </>
  );
};

export default Voucher;
