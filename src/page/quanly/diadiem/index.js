import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import AddDiaDiemFormModal from "./AddForm";
import EditDiaDiemFormModal from "./EditForm";

const DiaDiem = () => {
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

  // Example data
  const data = [
    {
      stt: 1,
      ten: "Item 1",
      loai: 0,
    },
    {
      stt: 2,
      ten: "Item 2",
      loai: 1,
    },
  ];

  return (
    <>
      <div className="row">
        <div className="title">
          <h4>Danh sách phương tiện</h4>
        </div>
        <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
          <Button className="add" variant="success" onClick={handleAddClick}>
            Thêm mới
          </Button>
          <Form.Group className="search">
            <Form.Control
              type="text"
              placeholder="Tên phương tiện hoặc tên đối tác"
              //value={searchQuery}
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
                  <th className="ten">Tên địa điểm</th>
                  <th className="loai">Loại</th>
                  <th className="edit"></th>
                  <th className="del"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.stt}>
                    <td className="stt">{item.stt}</td>
                    <td className="ten">{item.ten}</td>
                    <td className="loai">
                      {item.loai === 0 ? "Trong nước" : "Nước ngoài"}
                    </td>
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
      <AddDiaDiemFormModal
        show={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
      />
      <EditDiaDiemFormModal
        show={showEditFormModal}
        onClose={() => setShowEditFormModal(false)}
        itemToEdit={editData}
      />
    </>
  );
};

export default DiaDiem;
