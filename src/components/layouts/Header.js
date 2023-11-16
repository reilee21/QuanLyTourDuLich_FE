// Header.js
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { GoPerson } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import MenuDuLich from "./menudulich";
const Header = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDulichClick = () => {
    setIsOpen(!isOpen);
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
            <Nav
              className="nav-cus_info"
              style={{ display: "inline-block" }}
              as={Link}
              to="/news"
              onClick={() => setIsOpen(false)}
            >
              Tin tức
            </Nav>
          </div>
          <Nav>
            <div className="nav-main">
              <input
                placeholder="Tìm kiếm ở đây...."
                type="text"
                className="nav-input"
                onClick={() => setIsOpen(false)}
              />
              <Button
                className="btn-search"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/search");
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
                  as={Link}
                  to="/cus_info"
                  onClick={() => setIsOpen(false)}
                >
                  <GoPerson size={24} />
                </Nav>
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
