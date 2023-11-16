import React, { useState } from "react";
import "./Repass.css";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
    } else {
      // You can implement your password change logic here
      console.log("Old Password:", oldPassword);
      console.log("New Password:", newPassword);
      console.log("Confirm Password:", confirmPassword);
    }
  };

  return (
    <div className="repass_container">
      <div className="main-repass">
        <h1 className="repass_title">Đổi Mật Khẩu</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Mật khẩu cũ</label>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="repass-button" type="submit">
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
