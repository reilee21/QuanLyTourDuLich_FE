// Header.js
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
const Header = () => {
    return (
        <>
            <div className='color'>
                <Navbar className="navbar-main">
                    <div >
                        <Navbar.Brand href="#home" style={{ display: 'inline-block' }}>
                            <span className="brand-text" style={{ color: '#293462', size: '50px' }}>Huflit</span><span className="brand-text" style={{ color: '#F7D716' }}>Travel</span>
                        </Navbar.Brand>
                        <Nav className="nav-home" style={{ display: 'inline-block' }} as={Link} to="/">Trang chủ</Nav >
                        <Nav className="nav-cus_info" style={{ display: 'inline-block' }} as={Link} to="/cus_info">Thông tin khách hàng</Nav >
                        <Nav className="nav-cus_info" style={{ display: 'inline-block' }} as={Link} to="/contact">Liên hệ</Nav >
                        <Nav className="nav-cus_info" style={{ display: 'inline-block' }} as={Link} to="/FAQ">FAQ</Nav >
                    </div>
                    <Nav >
                        <div className="nav-main">
                            <input placeholder="Tìm kiếm ở đây...." type="text" className='nav-input' />
                            <Nav className="nav-cus_info" as={Link} to="/cus_info"></Nav >
                            <Nav className="nav-search" as={Link} to="/search">Tìm kiếm</Nav >
                            <Nav className="nav-login" as={Link} to="/login">Đăng nhập</Nav >
                        </div>
                    </Nav>
                </Navbar >
            </div>
        </>
    )
}
export default Header
