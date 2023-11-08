import { NavLink } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const CSKHMenu = () => {
  const [activeLink, setActiveLink] = useState("thanhvien");

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <>
      <NavLink
        className={`link-name ${activeLink === "thanhvien" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("thanhvien")}
        as={Link}
        to="cskh/thanhvien"
      >
        <span> Thành viên</span>
      </NavLink>

      <NavLink
        className={`link-name ${activeLink === "phanhoi" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("phanhoi")}
        as={Link}
        to="cskh/phanhoi"
      >
        <span> Phản hồi</span>
      </NavLink>
    </>
  );
};

export default CSKHMenu;
