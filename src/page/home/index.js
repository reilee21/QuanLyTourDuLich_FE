import { useAuth } from "../../context/AuthContext"



const HomePage = () =>{

    const {isLogin} = useAuth();


    return(
        <>
            <h1>HomePage</h1>
            {isLogin && <div>
                <h2>đã đăng nhập</h2>

            </div>
            }
            
            
        </>
    )
}
export default HomePage
