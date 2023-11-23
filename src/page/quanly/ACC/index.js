import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Button, Row } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./index.scss";
const EmployeeInfo = () => {
  const [acc, setAcc] = useState({});
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`api/NhanViens/NV003`);
        setAcc(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);
  const handlelogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="ctnaccqly">
      <Row>
        <div className="col-lg-7 md-7 sm-7">
          <h2>Thông tin cá nhân</h2>
          <p>
            <strong>Mã NV:</strong> {acc.maNv}
          </p>
          <p>
            <strong>Họ Tên:</strong> {acc.hoTen}
          </p>
          <p>
            <strong>Số Điện Thoại:</strong> {acc.soDienThoaiNv}
          </p>
          <p>
            <strong>Số CCCD:</strong> {acc.soCccd}
          </p>
          <p>
            <strong>Email:</strong> {acc.email}
          </p>
          <p>
            <strong>Chức Vụ:</strong> {acc.chucVu}
          </p>
        </div>
      </Row>
      <Button className="logout" onClick={handlelogout}>
        {" "}
        Đăng xuất
      </Button>
    </div>
  );
};

export default EmployeeInfo;
