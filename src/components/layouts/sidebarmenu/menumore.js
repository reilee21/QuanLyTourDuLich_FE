import { NavLink } from "react-bootstrap";
import { useState } from "react";

const MoreMenu = () => {
  const [activeLink, setActiveLink] = useState("Thành viên");

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <>
      <NavLink
        className={`link-name ${activeLink === "Đối tác" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Đối tác")}
      >
        <span> Đối tác</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Nhân viên" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Nhân viên")}
      >
        <span> Nhân viên</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Bài viết" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Bài viết")}
      >
        <span> Bài viết</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Hỏi đáp" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Hỏi đáp")}
      >
        <span> FAQs</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Voucher" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Voucher")}
      >
        <span> Voucher</span>
      </NavLink>
    </>
  );
};

export default MoreMenu;
