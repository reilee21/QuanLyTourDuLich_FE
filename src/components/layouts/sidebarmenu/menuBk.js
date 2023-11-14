import { NavLink } from "react-bootstrap";
import { useState } from "react";

const BookingMenu = () => {
  const [activeLink, setActiveLink] = useState("Tour");

  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <>
      <NavLink
        className={`link-name ${activeLink === "Tour" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Tour")}
      >
        <span> Tour</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Khách sạn" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Khách sạn")}
      >
        <span> Khách sạn</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Thành viên" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Thành viên")}
      >
        <span> Thành viên</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Tra cứu" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Tra cứu")}
      >
        <span> Tra cứu booking</span>
      </NavLink>
    </>
  );
};

export default BookingMenu;
