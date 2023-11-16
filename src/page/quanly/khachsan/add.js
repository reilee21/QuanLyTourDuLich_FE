import React, { useState, useEffect } from "react";
import { Button, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const AddKhachSan = () => {
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
  const [doitacdt, setDoitacdt] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loaiphonglist, setLoaiphonglist] = useState([]);
  const [khachSanData, setKhachSanData] = useState({
    Ten: "",
    DiaChi: "",
    MoTa: "",
    IdDoiTac: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKhachSanData({
      ...khachSanData,
      [name]: value,
    });
  };
  useEffect(() => {
    // Filter transportation data based on the search term
    setDoitacdt(
      data.filter((doitac) =>
        doitac.ten.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    if (searchTerm.length < 1) setIsOpen(false);
  }, [searchTerm]);
  const handleSelect = (selectedItem) => {
    setSearchTerm(selectedItem.ten);
    khachSanData.IdDoiTac = selectedItem.stt;
    setIsOpen(false);
  };

  const handleAddKhachSan = () => {
    console.log(khachSanData);
    console.log(loaiphonglist);
  };

  const handleAddLoaiPhong = () => {
    const newLoaiPhong = {
      TenLoai: "",
      Mota: "",
      Gia: 0,
    };

    setLoaiphonglist([...loaiphonglist, newLoaiPhong]);
  };

  const handleLoaiPhongChange = (index, fieldName, fieldValue) => {
    const updatedLoaiPhongList = [...loaiphonglist];
    updatedLoaiPhongList[index][fieldName] = fieldValue;

    setLoaiphonglist(updatedLoaiPhongList);
  };
  const handleLoaiPhongBlur = (index) => {
    const updatedLoaiPhongList = [...loaiphonglist];
    const currentLoaiPhong = updatedLoaiPhongList[index];

    // Check if TenLoai is empty and remove the item if it is
    if (currentLoaiPhong.TenLoai.trim() === "") {
      updatedLoaiPhongList.splice(index, 1);
      setLoaiphonglist(updatedLoaiPhongList);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleAddKhachSan} className="btaddks">
        Thêm Khách Sạn
      </Button>
      <div>
        <h4 className="kstitle">Thêm mới Khách Sạn</h4>
      </div>
      <div className="contain row">
        <div className="addf col-lg-12 col-md-12">
          <Form>
            <Row>
              <Form.Group
                controlId="Ten"
                className="col-lg-5 col-md-5 col-sm-5"
              >
                <Form.Label>Tên Khách Sạn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tên Khách Sạn"
                  name="Ten"
                  value={khachSanData.Ten}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                controlId="IdDoiTac"
                className="col-lg-5 col-md-5 col-sm-5"
              >
                <Form.Label>Đối Tác</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tên Đối Tác"
                  name="IdDoiTac"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                  }}
                />
                {isOpen && (
                  <div className="doitac-dropdown-list">
                    {doitacdt.map((item) => (
                      <div
                        key={item.stt}
                        className="dropdown-item"
                        onClick={() => {
                          handleSelect(item);
                        }}
                      >
                        {item.ten}
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId="DiaChi" className="col-lg-10 col-md-10">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Địa Chỉ"
                  name="DiaChi"
                  value={khachSanData.DiaChi}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="MoTa" className="col-lg-10 col-md-10">
                <Form.Label>Mô Tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Mô Tả"
                  name="MoTa"
                  value={khachSanData.MoTa}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="loaiphong" className="col-lg-10 col-md-10">
                <Form.Label>Loại Phòng</Form.Label>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tên Loại</th>
                      <th>Mô Tả</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loaiphonglist.map((loaiPhong, index) => (
                      <tr key={index} onBlur={() => handleLoaiPhongBlur(index)}>
                        <td>
                          <Form.Control
                            type="text"
                            value={loaiPhong.TenLoai}
                            onChange={(e) =>
                              handleLoaiPhongChange(
                                index,
                                "TenLoai",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={loaiPhong.Mota}
                            onChange={(e) =>
                              handleLoaiPhongChange(
                                index,
                                "Mota",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={loaiPhong.Gia}
                            onChange={(e) =>
                              handleLoaiPhongChange(
                                index,
                                "Gia",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="success" onClick={handleAddLoaiPhong}>
                  Thêm Loại Phòng
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};
export default AddKhachSan;
