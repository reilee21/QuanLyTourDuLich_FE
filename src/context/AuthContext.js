import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const [phuongthuc, setPhuongthuc] = useState("");
  const [role, setRole] = useState("");

  const setupLogin = (jwtAuthCookie) => {
    setIsLogin(true);
    if (phuongthuc === "gg-Auth") {
      setRole("client");
      return;
    }
    if (jwtAuthCookie == null) return;
    const temp = jwtDecode(jwtAuthCookie).role;
    setRole(temp);
  };

  useEffect(() => {
    const jwtAuthCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt-Auth"));

    if (jwtAuthCookie) {
      const jwtToken = jwtAuthCookie.split("=")[1];
      const decodedToken = jwtDecode(jwtToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp > currentTime) {
        setPhuongthuc("jwt-Auth");
        setupLogin(jwtAuthCookie);
        console.log("Updated phuongthuc in useEffect:", phuongthuc); // Log the updated value
      } else {
        checkTokenExpiration();
      }
    } else {
      const ggAuthCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("gg-Auth"));
      if (ggAuthCookie) {
        const jwtToken = ggAuthCookie.split("=")[1];
        const decodedToken = jwtDecode(jwtToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp > currentTime) {
          setPhuongthuc("gg-Auth");
          setupLogin(null);
        }
      }
    }
  }, [phuongthuc]);
  useEffect(() => {
    setupLogin(null);
  }, [phuongthuc]);
  const googlelogin = (token) => {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + token.exp);
    const cookieValue = encodeURIComponent(JSON.stringify(token));
    document.cookie = `gg-Auth=${cookieValue}; expires=${expires.toUTCString()}; path=/`;
    setPhuongthuc("gg-Auth");
    setupLogin(null);
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `/api/DangNhap?username=${username}&password=${password}`
      );
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + response.exp);
      const cookieValue = encodeURIComponent(JSON.stringify(response));
      document.cookie = `jwt-Auth=${cookieValue}; expires=${expires.toUTCString()}; path=/`;
      setPhuongthuc("jwt-Auth");
      setupLogin(cookieValue);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    const expires = new Date(0);
    document.cookie = `jwt-Auth=; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `gg-Auth=; expires=${expires.toUTCString()}; path=/`;
    setPhuongthuc("");
    setIsLogin(false);
    setRole("");
    console.log("Logged out.", isLogin); // Add this line
  };

  const checkTokenExpiration = async () => {
    console.log("checktoke");
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
        const intervalId = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(intervalId);
      }
    }
  }, [isLogin, phuongthuc]);

  const refreshToken = async (tokenData) => {
    try {
      const response = await axios.post(
        `api/DangNhap/RefreshToken?oldtoken=${tokenData.token}`
      );
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + response.exp);
      const cookieValue = encodeURIComponent(JSON.stringify(response));
      document.cookie = `jwt-Auth=${cookieValue}; expires=${expires.toUTCString()}; path=/`;
    } catch (error) {
      console.error("Refresh token error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, googlelogin, role }}>
      {children}
    </AuthContext.Provider>
  );
}
