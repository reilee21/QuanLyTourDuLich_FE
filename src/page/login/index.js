import FormLogin from "./Formlogin";

import { useAuth } from "../../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import { useState } from "react";

const LoginPage = () => {
  const { logout, googlelogin } = useAuth();

  return (
    <>
      <h1>Login Page</h1>
      <FormLogin />
      <button type="submit" onClick={logout}>
        logout
      </button>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googlelogin();
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
};


export default LoginPage;
