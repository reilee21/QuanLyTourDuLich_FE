import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import "./Formlogin.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, googlelogin } = useAuth();
  const navigate = useNavigate();
  const handleAccountLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/");
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const success = await googlelogin(credentialResponse);
    if (success) navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="page-title">Đăng Nhập</h1>
        <form>
          <div>
            <label>Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="login-button"
            onClick={(e) => handleAccountLogin(e)}
          >
            Đăng nhập
          </button>
          <Button
            as={Link}
            to="/register"
            variant="primary"
            className="register"
          >
            Đăng ký
          </Button>
          <div className="google">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleLogin(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormLogin;
