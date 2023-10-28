
import React, { createContext, useContext, useState,useEffect } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from '../api/axios';
import { googleLogout } from '@react-oauth/google';
const AuthContext = createContext();

export function useAuth() {    
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState();
  const [phuongthuc, setPhuongthuc] = useState('');

  const cookie = new Cookies();

  const googlelogin = () =>{
    console.log("gglogin");

  }

  const login = async (username, password) => {
    try {
      const response = await axios.post(`/api/DangNhap?username=${username}&password=${password}`);
      const decoded = jwtDecode(response.token);
      cookie.set("jwt-auth", response, {
        expires: new Date(decoded.exp * 1000),
      });
      setPhuongthuc("jwt-auth");
      setIsLogin(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    if(phuongthuc === "jwt-auth"){
      cookie.remove("jwt-auth");
    }
    else{
      console.log("gg");
        
      googleLogout();
    }
    console.log("out");
    setPhuongthuc("");
    setIsLogin(false);
  };
  const checkTokenExpiration = async () => {
    const oldTokenData = cookie.get("jwt-auth");
    if (oldTokenData) {
      const oldToken = oldTokenData.token;
      console.log(oldToken);
      const decoded = jwtDecode(oldToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp - currentTime <= 1800) {
        await refreshToken();
      }
    }
  };
  useEffect(() => {
    if(phuongthuc === "jwt-auth")
    {
      if(isLogin){
        checkTokenExpiration();    
        const intervalId = setInterval(checkTokenExpiration, 600000);
        return () => clearInterval(intervalId);
    }
    }
  }, [isLogin, phuongthuc]);
  const refreshToken = async () => {
    const oldTokenData = cookie.get("jwt-auth");
    if (oldTokenData) {
      const oldToken = oldTokenData.token;
      const response = await axios.post(`api/DangNhap/RefreshToken?oldtoken=${oldToken}`);
      const decoded = jwtDecode(response.token);
      cookie.set("jwt-auth", response, {
        expires: new Date(decoded.exp * 1000),
      });
    }
  };
  return (
    <AuthContext.Provider value={{ isLogin, login, logout, googlelogin }}>
      {children}
    </AuthContext.Provider>
  );
}
