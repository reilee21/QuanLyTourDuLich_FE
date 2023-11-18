import React, { useState, useEffect } from "react";
import { Button, Form, Row, Table } from "react-bootstrap";
import "./index.scss";
import "./add.scss";
import SDoiTac from "./doitac";
import LoaiPhongs from "./loaiphongs";
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
  const [loaiphonglist, setLoaiphonglist] = useState([]);
  const [imgFile, setImgFile] = useState("");
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
  const selectDoiTac = (selectedItem) => {
    // setSearchTerm(selectedItem.ten);
    // khachSanData.IdDoiTac = selectedItem.stt;
    // setIsOpen(false);
  };

  useEffect(() => {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");

    if (imageInput) {
      imageInput.addEventListener("change", function () {
        const selectedFile = imageInput.files[0];

        if (selectedFile) {
          const fileReader = new FileReader();
          fileReader.onload = function (e) {
            imagePreview.src = e.target.result;
            // setSelectedImage(e.target.result);
          };
          fileReader.readAsDataURL(selectedFile);
        } else {
          imagePreview.src = "";
        }
      });
    }
  }, []);
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
              <div className="col-lg-5 md-5 sm-5">
                <Row>
                  <img id="imagePreview" src="" alt="Preview" />
                </Row>
                <Row>
                  <input type="file" id="imageInput" accept="image/*" />
                </Row>
              </div>
              <div className="col-lg-7 md-7 sm-7">
                <Row>
                  <Form.Group
                    controlId="Ten"
                    className="col-lg-6 col-md-6 col-sm-6"
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
                  <SDoiTac selectDoiTac={selectDoiTac} />
                </Row>
                <Row>
                  <Form.Group
                    controlId="DiaChi"
                    className="col-lg-12 col-md-12"
                  >
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
                  <Form.Group controlId="MoTa" className="col-lg-12 col-md-12">
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
              </div>
            </Row>
          </Form>
          <LoaiPhongs
            loaiphonglist={loaiphonglist}
            handleLoaiPhongChange={handleLoaiPhongChange}
            handleAddLoaiPhong={handleAddLoaiPhong}
          />
        </div>
      </div>
    </>
  );
};
export default AddKhachSan;
