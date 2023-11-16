import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cus_Infor.css";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatdate";
function CustomerInfoForm() {
  const { logout, email, phuongthuc } = useAuth();
  const [customerInfo, setCustomerInfo] = useState({
    HoTen: "",
    SoDienThoaiKH: "",
    NgaySinh: "",
    Email: "",
    SoCCCD: "",
    MaPassport: "",
    DiaChi: "",
    MaKH: "",
    DiemThuong: "",
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
        // Update the state with the fetched user information
        setCustomerInfo({
          HoTen: userInfo.hoTen,
          SoDienThoaiKH: userInfo.soDienThoaiKh,
          NgaySinh: formatDate(userInfo.ngaySinh),
          Email: userInfo.email,
          SoCCCD: userInfo.soCCCD || "",
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
  }, [email]); // Run the effect whenever the email changes
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted data:", customerInfo);
  };
  return (
    <>
      <div className="cus_main">
        <table className="cusinfo">
          <tbody>
            <tr>
              <td>
                <Link to="/doithuong" className="black-link">
                  Đổi thưởng
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/histour" className="black-link">
                  Tour đã đi
                </Link>
              </td>
            </tr>
            {phuongthuc === "jwt-auth" && (
              <tr>
                <td>
                  <Link to="/repass" className="black-link">
                    Đổi mật khẩu
                  </Link>
                </td>
              </tr>
            )}
            <tr>
              <td>
                <Link
                  to="/"
                  onClick={logout}
                  style={{ color: "red", borderTop: "1px solid #e0e0e0" }}
                >
                  Đăng xuất
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cus_infor-form col-md-4">
          <h1 className="page-title"> Cập Nhật Thông Tin Khách Hàng</h1>
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
