import axios from "../../api/axios";
import FormLogin from "./Formlogin"
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../context/AuthContext";
import { GoogleOAuthProvider,,GoogleLogin } from "@react-oauth/google";


const LoginPage = () =>{
  const {logout,googlelogin} = useAuth();

  return(
    <>
      <h1>Login Page</h1>  
      <FormLogin/>    
      <button type="submit" onClick={logout}>logout</button>
      <GoogleOAuthProvider clientId="958123963258-tl9ffg26r7ioopmh519m2q22o681ggi9.apps.googleusercontent.com">
      <GoogleLogin
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse.credential)
            googlelogin()
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
      </GoogleOAuthProvider>
     
    </>
  )
}
export default LoginPage