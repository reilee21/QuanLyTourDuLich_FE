import { Link } from "react-router-dom";
import "./navbarqly.scss";
import { Nav, NavLink, Button } from "react-bootstrap";
import {
  MainMenu,
  PTDVMenu,
  CSKHMenu,
  BookingMenu,
  MoreMenu,
} from "./sidebarmenu/config";
import { useState } from "react";
const NavBarQly = () => {
  const [selectedMenu, setSelectedMenu] = useState("main");

  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
  };
  const back = () => {
    setSelectedMenu("main");
  };
  return (
    <>
      <div
        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4"
        id="navbarqly"
      >
        <div className="title">
          <Nav style={{ display: "inline-block" }} onClick={back}>
            <span
              className="brand-text"
              style={{ color: "#293462", size: "50px" }}
            >
              Huflit
            </span>
            <span className="brand-text" style={{ color: "#F7D716" }}>
              Travel
            </span>
          </Nav>
        </div>
        <div className="sidebar-menu">
          {selectedMenu === "main" && (
            <MainMenu onMenuChange={handleMenuChange} />
          )}
          {selectedMenu === "ptdv" && <PTDVMenu />}
          {selectedMenu === "cskh" && <CSKHMenu />}
          {selectedMenu === "bk" && <BookingMenu />}
          {selectedMenu === "more" && <MoreMenu />}
        </div>
      </div>
      <div className="taikhoan">
        <Button>Tài khoản</Button>
      </div>
    </>
  );
};

export default NavBarQly;
