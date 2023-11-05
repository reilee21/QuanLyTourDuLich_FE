import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AddDoiTacFormModal from "./AddForm";
import EditDoiTacFormModal from "./EditForm";

const DoiTac = () => {
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleAddClick = () => {
    setShowAddFormModal(true);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowEditFormModal(true);
  };

  // Example data for Doi Tac
  const data = [
    {
      stt: 1,
      ten: "Doi Tac 1",
      email: "doitac1@example.com",
      sdt: "1234567890",
    },
    {
      stt: 2,
      ten: "Doi Tac 2",
      email: "doitac2@example.com",
      sdt: "9876543210",
    },
  ];

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách Đối Tác</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên Đối Tác hoặc Email"
              // value={searchQuery}
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
                  <th className="ten">Tên Đối Tác</th>
                  <th className="email">Email</th>
                  <th className="sdt">Số Điện Thoại</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.stt}>
                    <td className="stt">{item.stt}</td>
                    <td className="ten">{item.ten}</td>
                    <td className="email">{item.email}</td>
                    <td className="sdt">{item.sdt}</td>
                    <td className="edit">
                      <Button
                        variant="outline-warning"
                        onClick={() => handleEditClick(item)}
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
      <AddDoiTacFormModal
        show={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
      />

      <EditDoiTacFormModal
        show={showEditFormModal}
        onClose={() => setShowEditFormModal(false)}
        itemToEdit={editData}
      />
    </>
  );
};

export default DoiTac;
