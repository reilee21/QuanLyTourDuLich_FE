// Header.js
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css"
const HeaderQly = () => {
    return (
        <>
            <Navbar className="navbar-main">
                <div >
                    <Navbar.Brand href="#home" style={{ display: 'inline-block' }}>Hufitravel</Navbar.Brand>
                </div>
                <Nav >

                    <div className="nav-main">
                        <Nav className="nav-login" as={Link} to="/baiviet">Bài viết</Nav >
                        <Nav className="nav-login" as={Link} to="/diadiem">Địa điểm</Nav >
                        <Nav className="nav-login" as={Link} to="/doitac">Đối tác</Nav >
                        <Nav className="nav-login" as={Link} to="/khachsan">Khách sạn</Nav >
                        <Nav className="nav-login" as={Link} to="/faq">FAQ</Nav >
                        <Nav className="nav-login" as={Link} to="/nhanvien">Nhân viên</Nav >
                        <Nav className="nav-login" as={Link} to="/phuongtien">Phương tiện</Nav >
                        <Nav className="nav-login" as={Link} to="/thanhvien">Thành viên</Nav >
                        <Nav className="nav-login" as={Link} to="/tour">Tour</Nav >
                        <Nav className="nav-login" as={Link} to="/baocao">Báo cáo</Nav >

                        <Nav className="nav-login" as={Link} >Đăng xuất</Nav >
                    </div>
                </Nav>
            </Navbar >
        </>
    )
}
export default HeaderQly
