import { NavLink } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBK from "../../others/modalsbk";

const BookingMenu = () => {
  const [activeLink, setActiveLink] = useState("Tour");
  const [openSBK, setOpenSBK] = useState(false);
  const handleNavLinkClick = (linkName) => {
    setActiveLink(linkName);
  };
  const close = () => {
    setOpenSBK(false);
  };
  const sbk = (id) => {
    setOpenSBK(false);
  };
  return (
    <>
      <NavLink
        as={Link}
        to="booking"
        className={`link-name ${activeLink === "Tour" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Tour")}
      >
        <span> Booking</span>
      </NavLink>
      <NavLink
        as={Link}
        to="booking/thanhvien"
        className={`link-name ${activeLink === "Thành viên" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("Thành viên")}
      >
        <span> Thành viên</span>
      </NavLink>
      <NavLink
        className={`link-name ${activeLink === "Tra cứu" ? "active" : ""}`}
        onClick={() => {
          setOpenSBK(true);
        }}
      >
        <span> Tra cứu booking</span>
      </NavLink>
      <NavLink
        as={Link}
        to="booking/thanhvien"
        className={`link-name ${activeLink === "ThongTinTour" ? "active" : ""}`}
        onClick={() => handleNavLinkClick("ThongTinTour")}
      >
        <span> Thông tin tour</span>
      </NavLink>
      <SearchBK
        show={openSBK}
        onCancel={close}
        onSubmit={() =>
          sbk(document.querySelector("input[name='bookingid']").value)
        }
      />
    </>
  );
};

export default BookingMenu;
