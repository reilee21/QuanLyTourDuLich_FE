import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainMenu = ({ onMenuChange }) => {
  return (
    <>
      <NavLink
        className="link-name"
        as={Link}
        to="ptdv/phuongtien"
        onClick={() => onMenuChange("ptdv")}
      >
        <span> Phương tiện và dịch vụ</span>
      </NavLink>
      <NavLink
        className="link-name"
        as={Link}
        to="cskh/thanhvien"
        onClick={() => onMenuChange("cskh")}
      >
        <span> Khách hàng</span>
      </NavLink>
      <NavLink
        className="link-name"
        as={Link}
        to="booking"
        onClick={() => onMenuChange("bk")}
      >
        <span>Booking</span>
      </NavLink>
      <NavLink
        className="link-name"
        as={Link}
        to="more/doitac"
        onClick={() => onMenuChange("more")}
      >
        <span> Thêm</span>
      </NavLink>
    </>
  );
};

export default MainMenu;
