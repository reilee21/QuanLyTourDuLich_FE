import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./index.scss";
import EditCustomerAccountModal from "./EditAccKH";
import axios from "../../../api/axios";

const TaiKhoanKH = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [customerAccounts, setCustomerAccounts] = useState([]);

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

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("api/taikhoans");
        setCustomerAccounts(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);
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
                <th className="username">Username</th>
                <th className="password">Password</th>
                <th className="edit"></th>
                <th className="del"></th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((account) => (
                <tr key={account.MaKH} onClick={() => handleEditClick(account)}>
                  <td className="maKH">{account.maKh}</td>
                  <td className="username">{account.username}</td>
                  <td className="password">{account.password}</td>
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
