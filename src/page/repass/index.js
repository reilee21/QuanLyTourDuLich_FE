import React, { useState } from "react";
import "./Repass.css";
import emailjs from "@emailjs/browser";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const serviceId = "service_rj30hx7";
  const templateId = "template_3slecnd";
  const publicKey = "L_RN4MgMzJH7bImjz";
  const { email, logout } = useAuth();
  const [enteredOtp, setEnteredOtp] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    email: email,
    otp: generateOTP(),
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = () => {
    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then((response) => {
        alert("Đã gửi OTP");
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
      });
  };

  const handleConfirmOtp = () => {
    if (enteredOtp === formData.otp) {
      setFormData([]);
      setCurrentPage(2);
    } else {
      alert("OTP không đúng");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu nhập lại không chính xác");
      return;
    }
    try {
      const response = await axios.put(
        `/api/TaiKhoans/ChangePassword?email=${email}&newpass=${newPassword}`
      );
      navigate("/");
      logout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="repass_container">
      <div className="main-repass">
        {currentPage === 1 && (
          <>
            <h1 className="repass_title">Xác nhận OTP</h1>
            <form>
              <div>
                <label>Email</label>
                <input type="text" value={email} readOnly />
              </div>
              <div>
                <label>OTP</label>
                <input
                  type="text"
                  name="otp"
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={handleSendOtp}>
                Gửi OTP
              </button>
              <button
                type="button"
                onClick={handleConfirmOtp}
                className="xacnhanotp"
              >
                Xác nhận OTP
              </button>
            </form>
          </>
        )}

        {currentPage === 2 && (
          <>
            <h1 className="repass_title">Đổi Mật Khẩu</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Xác nhận</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
