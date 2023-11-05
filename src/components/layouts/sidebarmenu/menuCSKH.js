import { NavLink } from "react-bootstrap";
import { useState } from "react";

const CSKHMenu = () => {
  const [activeLink, setActiveLink] = useState("Thành viên");

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <>
      <NavLink
        className={`link-name ${activeLink === "Thành viên" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Thành viên")}
      >
        <span> Thành viên</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Liên hệ" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Liên hệ")}
      >
        <span> Liên hệ</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Phản hồi" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Phản hồi")}
      >
        <span> Phản hồi</span>
      </NavLink>
    </>
  );
};

export default CSKHMenu;
