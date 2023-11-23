import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, FormControl } from "react-bootstrap";
import "./add.scss";
import SDoiTac from "./doitac";
import LoaiPhongs from "./loaiphongs";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
const AddKhachSan = () => {
  const [khachSanData, setKhachSanData] = useState({
    ten: "",
    diaChi: "",
    moTa: "",
    idDoiTac: "",
    tendoitac: "",
    phongs: [],
    image: "x",
    soSao: 0,
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKhachSanData({
      ...khachSanData,
      [name]: value,
    });
  };
  const updatePhongs = (updatedPhongs) => {
    setKhachSanData({
      ...khachSanData,
      phongs: updatedPhongs,
    });
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
          };
          fileReader.readAsDataURL(selectedFile);
        } else {
          imagePreview.src = "";
        }
      });
    }
  }, []);

  const handleAddKhachSan = async () => {
    const { ten, diaChi, moTa, idDoiTac, soSao } = khachSanData;
    if (
      ten.trim() === "" ||
      diaChi.trim() === "" ||
      moTa.trim() === "" ||
      idDoiTac.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      console.log(khachSanData);
      return;
    }
    let isValid = true;
    if (khachSanData.phongs.length < 1) {
      alert("Chưa có thông tin phòng");
      return;
    }

    for (const loaiPhong of khachSanData.phongs) {
      if (loaiPhong && loaiPhong.tenLoai && loaiPhong.mota) {
        if (
          loaiPhong.tenLoai.trim().length < 5 ||
          loaiPhong.mota.trim().length < 5
        ) {
          isValid = false;
          alert("Kiểm tra thông tin loại phòng");
          break;
        }
      }
    }

    if (!isValid) return;

    const { tendoitac, phongs, image, ...ksdatatosend } = khachSanData;
    const formData = new FormData();
    Object.keys(ksdatatosend).forEach((key) => {
      formData.append(key, ksdatatosend[key]);
    });

    formData.append("phongs", JSON.stringify(khachSanData.phongs));
    const imageInput = document.getElementById("imageInput");
    const selectedFile = imageInput.files[0];
    formData.append("image", selectedFile);
    try {
      await axios.post("/api/khachsans", formData);
      alert("Thêm khách sạn thành công");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi", error.response);
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
            <Row className="anhbia">
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
                      name="ten"
                      value={khachSanData.ten}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <SDoiTac
                    formData={khachSanData}
                    setFormData={setKhachSanData}
                  />
                </Row>
                <Row>
                  <Form.Label>Địa Chỉ</Form.Label>
                </Row>
                <Row>
                  <Form.Group
                    controlId="DiaChi"
                    className="col-lg-12 col-md-12"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter Địa Chỉ"
                      name="diaChi"
                      value={khachSanData.diaChi}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Row>
                <Row className="gop">
                  <Form.Label className="col-lg-4 col-md-4">Mô Tả</Form.Label>
                  <Form.Label className="col-lg-2 col-md-2">Số Sao</Form.Label>
                  <Form.Group
                    controlId="SoSao"
                    className="col-lg-6 col-md-6 col-sm-6"
                  >
                    <Form.Control
                      as="select"
                      name="soSao"
                      value={khachSanData.soSao}
                      onChange={handleInputChange}
                    >
                      <option value="1">1 sao</option>
                      <option value="2">2 sao</option>
                      <option value="3">3 sao</option>
                      <option value="4">4 sao</option>
                      <option value="5">5 sao</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="MoTa" className="col-lg-12 col-md-12">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Mô Tả"
                      name="moTa"
                      value={khachSanData.moTa}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Row>
              </div>
            </Row>
          </Form>
          <LoaiPhongs updatePhongs={updatePhongs} ksdata={khachSanData} />
        </div>
      </div>
    </>
  );
};
export default AddKhachSan;
