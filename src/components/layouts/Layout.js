//layout.js
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout