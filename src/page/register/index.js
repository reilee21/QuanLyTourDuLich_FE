import React, { useState } from "react";
import "./FormRegister.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
function RegistrationForm() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [errorFields, setErrorFields] = useState([]);
  // Page 1 fields
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Page 2 fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleNextPage = async (e) => {
    e.preventDefault();
    if (currentPage === 1) {
      // Validate fields on the first page
      const errors = [];
      if (!validateEmail(email)) {
        errors.push("email");
        alert("Email không hợp lệ");
      }
      if (!name) {
        errors.push("name");
      }
      if (!phoneNumber) {
        errors.push("phoneNumber");
      }
      if (!birthdate) {
        errors.push("birthdate");
      }
      if (!address) {
        errors.push("address");
      }

      try {
        const emailExistsResponse = await axios.get(
          `/api/KhachHangs/checkEmail?email=${email}`
        );
        if (emailExistsResponse) {
          errors.push("email");
          alert("Email đã được đăng ký. Vui lòng chọn email khác.");
          setErrorFields(errors);
          return;
        }
      } catch (error) {
        console.error("Error checking duplicate email:", error);
        return;
      }
      try {
        const phoneNumberExistsResponse = await axios.get(
          `/api/KhachHangs/checkPhoneNumber?phoneNumber=${phoneNumber}`
        );
        if (phoneNumberExistsResponse) {
          errors.push("phoneNumber");
          alert(
            "Số điện thoại đã được đăng ký. Vui lòng chọn số điện thoại khác."
          );
          setErrorFields(errors);

          return;
        }
      } catch (error) {
        console.error("Error checking duplicate phone number:", error);
        return;
      }
      if (errors.length > 0) {
        alert("Hãy kiểm tra lại thông tin");
        setErrorFields(errors);
        return;
      }
    }

    setErrorFields([]); // Clear error fields
    setCurrentPage(2);
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  const setupErr = () => {
    const errors = [];
    if (!username) {
      errors.push("username");
    }
    if (!password) {
      errors.push("password");
    }
    if (!passwordConfirmation) {
      errors.push("passwordConfirmation");
    }

    if (errors.length > 0) {
      alert("Vui lòng điền đầy đủ thông tin.");
      setErrorFields(errors);
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Mật khẩu và mật khẩu xác nhận không khớp.");
      return;
    }

    setErrorFields([]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const khachhangregis = {
      Makh: "",
      hoTen: name,
      soDienThoaiKh: phoneNumber,
      ngaySinh: birthdate,
      email: email,
      diaChi: address,
    };
    const khachhangaccregis = {
      idTaiKhoan: "",
      maKh: "",
      username: username,
      password: password,
      MaKhNavigation: khachhangregis,
    };

    try {
      const usernameExists = await axios.get(
        `/api/TaiKhoans/CheckUsername/${username}`
      );

      if (usernameExists) {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
        setErrorFields(["username"]);

        return;
      }
    } catch (error) {
      console.error("Username Check Error:", error);
    }

    try {
      const response = await axios.post("/api/KhachHangs", khachhangregis);
      khachhangaccregis.maKh = response.maKh;
    } catch (error) {
      console.error("POST Request Error:", error);
    }
    try {
      const response = await axios.post("/api/TaiKhoans", khachhangaccregis);
      navigate("/login");
    } catch (error) {
      console.error("POST Request Error:", error);
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handlePhoneNumberChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 10);

    setPhoneNumber(limitedValue);
  };
  return (
    <div className="register-container">
      <div className="trum">
        <div className="register-form">
          <h1 className="page-title">Đăng ký</h1>
          <form onSubmit={handleFormSubmit}>
            {currentPage === 1 && (
              <>
                <div>
                  <label>Họ và Tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`${errorFields.includes("name") ? "error" : ""}`}
                  />
                </div>
                <div>
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    pattern="[0-9]*"
                    onChange={handlePhoneNumberChange}
                    required
                    className={`${
                      errorFields.includes("phoneNumber") ? "error" : ""
                    }`}
                  />
                </div>
                <div>
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    className={`${
                      errorFields.includes("birthdate") ? "error" : ""
                    }`}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`${
                      errorFields.includes("email") ? "error" : ""
                    }`}
                  />
                </div>
                <div>
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className={`${
                      errorFields.includes("address") ? "error" : ""
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="button next"
                >
                  Tiếp theo
                </button>
              </>
            )}
            {currentPage === 2 && (
              <>
                <div>
                  <label>Tên đăng nhập</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={`${
                      errorFields.includes("username") ? "error" : ""
                    }`}
                  />
                </div>
                <div>
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`${
                      errorFields.includes("password") ? "error" : ""
                    }`}
                  />
                </div>
                <div>
                  <label>Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className={`${
                      errorFields.includes("passwordConfirmation")
                        ? "error"
                        : ""
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  className="button back"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="button regis"
                  onClick={setupErr}
                >
                  Đăng ký
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
