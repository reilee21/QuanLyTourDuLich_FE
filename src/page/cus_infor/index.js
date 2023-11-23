import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cus_Infor.css";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatdate";
function CustomerInfoForm() {
  const [phuongthuc, setPhuongthuc] = useState("");
  useEffect(() => {
    const ggAuthCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("gg-Auth"));
    const jwtAuthCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt-Auth"));

    if (ggAuthCookie) {
      setPhuongthuc("gg-Auth");
      return;
    }
    if (jwtAuthCookie) {
      setPhuongthuc("jwt-Auth");
      return;
    }
  }, []);
  const { logout, email, id } = useAuth();
  const [customerInfo, setCustomerInfo] = useState({
    hoTen: "",
    soDienThoaiKH: "",
    ngaySinh: "",
    email: "",
    soCCCD: "",
    maPassport: "",
    diaChi: "",
    maKh: "",
    diemThuong: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `/api/KhachHangs/GetKhachHangByEmail?email=${email}`
        );
        const userInfo = response;
        setCustomerInfo({
          HoTen: userInfo.hoTen,
          SoDienThoaiKH: userInfo.soDienThoaiKh,
          NgaySinh: formatDate(userInfo.ngaySinh),
          Email: userInfo.email,
          SoCCCD: userInfo.soCccd || "",
          MaPassport: userInfo.maPassport || "",

          DiaChi: userInfo.diaChi,
          MaKH: userInfo.maKh,
          DiemThuong: userInfo.diemThuong,
        });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/KhachHangs/${id}`, customerInfo);
      alert("Cập nhật thành công");
    } catch (e) {
      alert("Lỗi không xác định");
      console.error(e);
    }
  };

  return (
    <>
      <div className="cus_main row">
        <div className="cus_infor-form col-lg-4 col-md-4">
          <h1 className="page-title"> Thông tin tài khoản</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-5 col-sm-5 mb-3">
                <label className="form-label">Họ và Tên</label>
                <input
                  type="text"
                  name="HoTen"
                  value={customerInfo.HoTen}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-5 col-sm-5 mb-3">
                <label className="form-label">Số Điện Thoại</label>
                <input
                  type="tel"
                  name="SoDienThoaiKH"
                  value={customerInfo.SoDienThoaiKH}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-5 col-sm-5 mb-3">
                <label className="form-label">Ngày Sinh</label>
                <input
                  type="date"
                  name="NgaySinh"
                  value={customerInfo.NgaySinh}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-5 col-sm-5 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={customerInfo.Email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-5 col-sm-5 mb-3">
                <label className="form-label">Số CCCD</label>
                <input
                  type="text"
                  name="SoCCCD"
                  value={customerInfo.SoCCCD}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Chưa cập nhật"
                  maxLength={12}
                  required
                />
              </div>
              <div className="col-md-5 col-sm-5 mb-3">
                <label className="form-label">Mã Passport</label>
                <input
                  type="text"
                  name="MaPassport"
                  value={customerInfo.MaPassport}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Chưa cập nhật"
                  maxLength={10}
                  required
                />
              </div>
              <div className="col-md-10 mb-3">
                <label className="form-label">Địa Chỉ</label>
                <input
                  type="text"
                  name="DiaChi"
                  value={customerInfo.DiaChi}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <center>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerInfoForm;
