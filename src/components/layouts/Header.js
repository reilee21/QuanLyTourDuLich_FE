// Header.js
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Row } from "react-bootstrap";
import "./Header.scss";
import { useAuth } from "../../context/AuthContext";
import { GoPerson } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import MenuDuLich from "./menudulich";
import axios from "../../api/axios";
const Header = () => {
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openTK, setOpenTK] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleDulichClick = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = async () => {
    try {
      const queryString = `tendiadiem=${searchQuery}`; // Construct query string for the API
      const res = await axios.get(`/api/Tours/SearchTour?${queryString}`);
      navigate("timkiemtour", { state: { tourlist: res } });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="color">
        <Navbar className="navbar-main">
          <div>
            <Navbar.Brand
              as={Link}
              to="/"
              style={{ display: "inline-block" }}
              onClick={() => setIsOpen(false)}
            >
              <span
                className="brand-text"
                style={{ color: "#293462", size: "50px" }}
              >
                Huflit
              </span>
              <span className="brand-text" style={{ color: "#F7D716" }}>
                Travel
              </span>
            </Navbar.Brand>

            <Nav
              className="nav-cus_info dulich"
              style={{ display: "inline-block" }}
              onClick={() => {
                handleDulichClick();
              }}
            >
              Du lịch
            </Nav>
            <Nav
              className="nav-cus_info "
              style={{ display: "inline-block" }}
              as={Link}
              to="/contact"
              onClick={() => setIsOpen(false)}
            >
              Liên hệ
            </Nav>
            <Nav
              className="nav-cus_info"
              style={{ display: "inline-block" }}
              as={Link}
              to="/FAQ"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Nav>
            {/* <Nav
              className="nav-cus_info"
              style={{ display: "inline-block" }}
              as={Link}
              to="/news"
              onClick={() => setIsOpen(false)}
            >
              Tin tức
            </Nav> */}
          </div>
          <Nav>
            <div className="nav-main">
              <input
                placeholder="Nhập địa điểm bạn muốn đến"
                type="text"
                className="nav-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setIsOpen(false)}
              />
              <Button
                className="btn-search"
                onClick={() => {
                  handleSearch();
                  setIsOpen(false);
                }}
              >
                <AiOutlineSearch />
              </Button>

              {!isLogin ? (
                <Nav
                  className="nav-login"
                  as={Link}
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Đăng nhập
                </Nav>
              ) : (
                <Nav
                  className="nav-cus_info"
                  style={{ display: "inline-block" }}
                  onClick={() => {
                    setIsOpen(false);
                    setOpenTK(!openTK);
                  }}
                >
                  <GoPerson size={24} />
                </Nav>
              )}
              {openTK && (
                <div className="dropdownaccount">
                  <Row
                    onClick={() => {
                      navigate("thongtintaikhoan");
                      setOpenTK(false);
                    }}
                  >
                    <span>Thông tin tài khoản</span>
                  </Row>
                  <Row
                    onClick={() => {
                      navigate("doimatkhau");
                      setOpenTK(false);
                    }}
                  >
                    <span>Đối mật khẩu </span>
                  </Row>
                  <Row
                    onClick={() => {
                      logout();
                      navigate("/");

                      setOpenTK(false);
                    }}
                  >
                    <span>Đăng xuất</span>
                  </Row>
                </div>
              )}
            </div>
          </Nav>
        </Navbar>
      </div>
      <MenuDuLich isOpen={isOpen} />
    </>
  );
};
export default Header;
