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
          <NavLink
            className=" align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none"
            onClick={back}
          >
            <span className="fs-5  d-sm-inline">Hufitravel</span>
          </NavLink>
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
    </>
  );
};

export default NavBarQly;
