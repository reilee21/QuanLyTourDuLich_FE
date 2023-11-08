import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./index.scss";
import EditCustomerAccountModal from "./EditAccKH";

const TaiKhoanKH = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const customerAccounts = [
    {
      MaKH: "KH1",
      HoTen: "Nguyen Thi C",
      Username: "ntc",
      Password: "customer123",
    },
    {
      MaKH: "KH2",
      HoTen: "Nguyen Van D",
      Username: "nvd",
      Password: "securePwd",
    },
  ];

  const itemsPerPage = 10; // You can adjust this value as needed
  const offset = pageNumber * itemsPerPage;
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const currentPageData = customerAccounts.slice(offset, offset + itemsPerPage);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEditClick = (account) => {
    setEditData(account);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="col-md-12">
        <div className="table-responsive" id="ackh">
          <h4>Tài khoản khách hàng</h4>
          <Form.Group className="search" id="search-acc">
            <Form.Control
              type="text"
              placeholder="Họ tên hoặc số điện thoại"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <table id="bangkh">
            <thead>
              <tr>
                <th className="maKH">Mã KH</th>
                <th className="hoTen">Họ và Tên</th>
                <th className="username">Username</th>
                <th className="password">Password</th>
                <th className="edit"></th>
                <th className="del"></th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((account) => (
                <tr key={account.MaKH} onClick={() => handleEditClick(account)}>
                  <td className="maKH">{account.MaKH}</td>
                  <td className="hoTen">{account.HoTen}</td>
                  <td className="username">{account.Username}</td>
                  <td className="password">{account.Password}</td>
                  <td className="edit">
                    <Button
                      variant="outline-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(account);
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
        <ReactPaginate
          pageCount={Math.ceil(customerAccounts.length / itemsPerPage)}
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
      </div>

      <EditCustomerAccountModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={(updatedAccount) => {
          // Handle updating the customer account password here with the updatedAccount.Password
          console.log(updatedAccount);
        }}
        itemToEdit={editData}
      />
    </>
  );
};

export default TaiKhoanKH;
