import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const [phuongthuc, setPhuongthuc] = useState();

  useEffect(() => {
    const jwtAuthCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('jwt-Auth='));

    if (jwtAuthCookie) {
      const jwtToken = jwtAuthCookie.split('=')[1];
      const decodedToken = jwtDecode(jwtToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        setIsLogin(true);
        setPhuongthuc('jwt-Auth');
      }
    }
  }, []);

  const googlelogin = () => {
    setIsLogin(true);
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post(`/api/DangNhap?username=${username}&password=${password}`);
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + response.exp);
      const cookieValue = encodeURIComponent(JSON.stringify(response));
      document.cookie = `jwt-Auth=${cookieValue}; expires=${expires.toUTCString()}; path=/`;

      setPhuongthuc("jwt-Auth");
      setIsLogin(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    const expires = new Date(0);
    document.cookie = `jwt-Auth=; expires=${expires.toUTCString()}; path=/`;
    setPhuongthuc("");
    setIsLogin(false);
  };

  const checkTokenExpiration = async () => {
    const cookies = document.cookie;
    const cookieArray = cookies.split("; ");
    for (const cookie of cookieArray) {
      const [name, value] = cookie.trim().split("=");
      if (name === "jwt-Auth") {
        const tokenData = JSON.parse(decodeURIComponent(value));
        const currentTime = Math.floor(Date.now() / 1000);
        if (tokenData.exp - currentTime <= 1800) {
          await refreshToken(tokenData);
        }
      }
    }
  };

  useEffect(() => {
    if (phuongthuc === "jwt-Auth") {
      if (isLogin) {
        checkTokenExpiration();
        const intervalId = setInterval(checkTokenExpiration, 600000);
        return () => clearInterval(intervalId);
      }
    }
  }, [isLogin, phuongthuc]);

  const refreshToken = async (tokenData) => {
    try {
      const response = await axios.post(`api/DangNhap/RefreshToken?oldtoken=${tokenData.token}`);
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + response.exp);
      const cookieValue = encodeURIComponent(JSON.stringify(response));
      document.cookie = `jwt-Auth=${cookieValue}; expires=${expires.toUTCString()}; path=/`;
    } catch (error) {
      console.error('Refresh token error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, googlelogin }}>
      {children}
    </AuthContext.Provider>
  );
}
