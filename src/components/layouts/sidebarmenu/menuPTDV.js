import { NavLink } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PTDVMenu = () => {
  const [activeLink, setActiveLink] = useState("phuongtien");
  const navigate = useNavigate();

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
    navigate(`ptdv/${linkName}`);
  };

  return (
    <>
      <NavLink
        className={`link-name ${activeLink === "phuongtien" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("phuongtien")}
        as={Link}
        to="ptdv/phuongtien"
      >
        <span> Phương tiện</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "diadiem" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("diadiem")}
        as={Link}
        to="ptdv/diadiem"
      >
        <span> Địa điểm</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "diemden" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("diemden")}
        as={Link}
        to="ptdv/diemden"
      >
        <span> Điểm đến</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Tour" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Tour")}
        as={Link}
        to="ptdv/tour"
      >
        <span> Tour</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "khachsan" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("khachsan")}
        as={Link}
        to="ptdv/khachsan"
      >
        <span> Khách sạn</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "khuyenmai" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("khuyenmai")}
        as={Link}
        to="ptdv/khuyenmai"
      >
        <span> Khuyến mãi</span>
      </NavLink>
    </>
  );
};

export default PTDVMenu;
