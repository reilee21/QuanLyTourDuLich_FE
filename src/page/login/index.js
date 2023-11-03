import FormLogin from "./Formlogin";

import { useAuth } from "../../context/AuthContext";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const { logout, googlelogin } = useAuth();

  return (
    <>
      <h1>Login Page</h1>
      <FormLogin />

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googlelogin(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default LoginPage;
