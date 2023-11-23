import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const [id, setId] = useState("");
  const [phuongthuc, setPhuongthuc] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
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
  }, [isLogin]);
  const setupLogin2 = () => {
    const ggAuthCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("gg-Auth"));
    const jwtAuthCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt-Auth"));
    if (ggAuthCookie) {
      const jwtToken = ggAuthCookie.split("=")[1];
      const decodedToken = jwtDecode(jwtToken);

      setRole("client");
      setIsLogin(true);
      setEmail(decodedToken.email);
      setPhuongthuc("gg-Auth");
      return;
    } else if (jwtAuthCookie) {
      const token = jwtDecode(jwtAuthCookie);
      setIsLogin(true);
      setRole(token.role);
      setEmail(token.email);
      setId(token.id);
      setPhuongthuc("jwt-Auth");
    }
  };

  const setupLogin = (jwtAuthCookie) => {
    if (phuongthuc === "gg-Auth") {
      const ggAuthCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("gg-Auth"));
      if (ggAuthCookie) {
        const jwtToken = ggAuthCookie.split("=")[1];
        const decodedToken = jwtDecode(jwtToken);

        setRole("client");
        setIsLogin(true);
        setEmail(decodedToken.email);

        setPhuongthuc("gg-Auth");
        return;
      }
    }
    if (jwtAuthCookie == null) return;
    const token = jwtDecode(jwtAuthCookie);
    setIsLogin(true);
    setRole(token.role);
    setEmail(token.email);
    setId(token.id);

    setPhuongthuc("jwt-Auth");
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
    return true;
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
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    const expires = new Date(0);
    document.cookie = `jwt-Auth=; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `gg-Auth=; expires=${expires.toUTCString()}; path=/`;
    setPhuongthuc("");
    setIsLogin((prevIsLogin) => !prevIsLogin); // Use callback function to update based on the current state
    setRole("");
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
    <AuthContext.Provider
      value={{
        isLogin,
        login,
        logout,
        googlelogin,
        role,
        email,
        setupLogin2,
        id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
