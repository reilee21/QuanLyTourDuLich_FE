import axios from "../../api/axios";
import FormLogin from "./Formlogin"
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../context/AuthContext";


const LoginPage = () =>{
  const {logout} = useAuth()
  
  return(
    <>
      <h1>Login Page</h1>  
      <FormLogin/>    
      <button type="submit" onClick={logout}>logout</button>
    </>
  )
}
export default LoginPage