import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./index.scss";
import EditAccountModal from "./EditAcc";

const TaiKhoanNV = () => {
  const employeeAccounts = [
    {
      MaNV: "NV1",
      TenNV: "Nguyen Van A",
      Username: "nva",
      Password: "password123",
    },
    {
      MaNV: "NV2",
      TenNV: "Nguyen Van B",
      Username: "nvb",
      Password: "securePwd",
    },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEditClick = (account) => {
    setEditData(account);
    setShowEditModal(true);
  };
  return (
    <>
      <div className="col-md-12">
        <div className="table-responsive">
          <h4>Tài khoản nhân viên</h4>
          <table id="bangnv">
            <thead>
              <tr>
                <th className="maNV">Mã NV</th>
                <th className="hoTen">Họ và Tên</th>
                <th className="username">Username</th>
                <th className="password">Password</th>
                <th className="edit"></th>
                <th className="del"></th>
              </tr>
            </thead>
            <tbody>
              {employeeAccounts.map((account) => (
                <tr key={account.MaNV}>
                  <td className="maNV">{account.MaNV}</td>
                  <td className="hoTen">{account.TenNV}</td>
                  <td className="username">{account.Username}</td>
                  <td className="password">{account.Password}</td>
                  <td className="edit">
                    <Button
                      variant="outline-warning"
                      onClick={() => handleEditClick(account)}
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

      <EditAccountModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={(updatedAccount) => {
          // Handle updating the account password here with the updatedAccount.Password
          console.log(updatedAccount);
        }}
        itemToEdit={editData}
      />
    </>
  );
};

export default TaiKhoanNV;
