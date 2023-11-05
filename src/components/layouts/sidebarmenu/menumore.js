import { NavLink } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MoreMenu = () => {
  const [activeLink, setActiveLink] = useState("doitac");
  const navigate = useNavigate();

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
    navigate(`more/${linkName}`);
  };

  return (
    <>
      <NavLink
        className={`link-name ${activeLink === "doitac" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("doitac")}
        as={Link}
        to={"more/doitac"}
      >
        <span> Đối tác</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "nhanvien" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("nhanvien")}
        as={Link}
        to={"more/nhanvien"}
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
        className={`link-name ${activeLink === "hoidap" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("hoidap")}
        as={Link}
        to={"more/hoidap"}
      >
        <span> FAQs</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "voucher" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("voucher")}
        as={Link}
        to={"more/voucher"}
      >
        <span> Voucher</span>
      </NavLink>
    </>
  );
};

export default MoreMenu;
