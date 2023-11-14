// Header.js
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { GoPerson } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleDulichClick = () => {
    setIsOpen(!isOpen);
  };
  const [dulichtype, setDulichtype] = useState(true);

  return (
    <>
      <div className="color">
        <Navbar className="navbar-main">
          <div>
            <Navbar.Brand as={Link} to="/" style={{ display: "inline-block" }}>
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
              onClick={handleDulichClick}
            >
              Du lịch
            </Nav>
            <Nav
              className="nav-cus_info "
              style={{ display: "inline-block" }}
              as={Link}
              to="/contact"
            >
              Liên hệ
            </Nav>
            <Nav
              className="nav-cus_info"
              style={{ display: "inline-block" }}
              as={Link}
              to="/FAQ"
            >
              FAQ
            </Nav>
            <Nav
              className="nav-cus_info"
              style={{ display: "inline-block" }}
              as={Link}
              to="/news"
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
              />
              <Button
                className="btn-search"
                onClick={() => navigate("/search")}
              >
                <AiOutlineSearch />
              </Button>

              {!isLogin ? (
                <Nav className="nav-login" as={Link} to="/login">
                  Đăng nhập
                </Nav>
              ) : (
                <Nav
                  className="nav-cus_info"
                  style={{ display: "inline-block" }}
                  as={Link}
                  to="/cus_info"
                >
                  <GoPerson size={24} />
                </Nav>
              )}
            </div>
          </Nav>
        </Navbar>
      </div>
      <div className={`dulich-item ${isOpen ? "active" : ""} col-lg-12 `}>
        <div className="row">
          <div className="type col-lg- col-md-2 col-sm-2">
            <div
              className={`row item ${dulichtype ? "active" : ""}`}
              onClick={() => setDulichtype(true)}
            >
              <span>Du lịch trong nước </span>
            </div>
            <div
              className={`row item ${!dulichtype ? "active" : ""}`}
              onClick={() => setDulichtype(false)}
            >
              <span>Du lịch nước ngoài</span>
            </div>
          </div>
          <div className="detail col-lg-10 col-md-10 col-sm-10">
            <div className="row">
              <p>hà nội2</p>
              <p>hà nội2</p>
              <p>hà nội</p>
              <p>hà nội2</p>
              <p>hà nội</p>
              <p>hà nội</p>
              <p>hà nội</p>
              <p>hà nội</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
