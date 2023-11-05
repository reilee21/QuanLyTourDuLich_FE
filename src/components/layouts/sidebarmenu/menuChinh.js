import { NavLink } from "react-bootstrap";

const MainMenu = ({ onMenuChange }) => {
  return (
    <>
      <NavLink className="link-name" onClick={() => onMenuChange("ptdv")}>
        <span> Phương tiện và dịch vụ</span>
      </NavLink>
      <NavLink className="link-name" onClick={() => onMenuChange("cskh")}>
        <span> Khách hàng</span>
      </NavLink>
      <NavLink className="link-name" onClick={() => onMenuChange("bk")}>
        <span>Booking</span>
      </NavLink>
      <NavLink className="link-name" onClick={() => onMenuChange("more")}>
        <span> Thêm</span>
      </NavLink>
    </>
  );
};

export default MainMenu;
