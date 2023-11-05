import axios from '../../api/axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import './Formlogin.css';
import { Link } from 'react-router-dom';
// Formlogin.js
const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { googlelogin } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <div className="login-container">
        <div className="trum">
          <div className="login-form"> {/* Thêm class "login-form" */}
            <h1 className="page-title">Đăng Nhập</h1>
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="login-button">Đăng nhập</button>
              <Button as={Link} to="/register" variant="primary" className="register"> Đăng ký</Button>
              <div className="google" >
                <GoogleOAuthProvider clientId="958123963258-tl9ffg26r7ioopmh519m2q22o681ggi9.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      const decoded = jwtDecode(credentialResponse.credential)
                      googlelogin()
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    className="custom-google-login-button"
                  />
                </GoogleOAuthProvider>
              </div>
            </form>
          </div >
        </div >
      </div>
    </>
  );
};
export default FormLogin;
