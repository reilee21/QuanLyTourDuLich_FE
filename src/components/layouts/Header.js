// Header.js
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css"
const Header = () => {
    return (
        <>
            <Navbar className="navbar-main">
                <div >
                    <Navbar.Brand href="#home" style={{ display: 'inline-block' }}>Hufitravel</Navbar.Brand>
                    <Nav className="nav-home" style={{ display: 'inline-block' }} as={Link} to="/">Trang chủ</Nav >
                </div>
                <Nav >

                    <div className="nav-main">
                        <input placeholder="Tìm kiếm ở đây...." type="text" className='nav-input' />
                        <Nav className="nav-search" as={Link} to="/search">Tìm kiếm</Nav >
                        <Nav className="nav-login" as={Link} to="/login">Đăng nhập</Nav >
                    </div>
                </Nav>
            </Navbar >
        </>
    )
}
export default Header
