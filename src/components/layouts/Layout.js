//layout.js
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import HeaderQly from "./HeaderQly"

const DefaultLayout = () => {
    
    return (
        <>
            <HeaderQly />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout