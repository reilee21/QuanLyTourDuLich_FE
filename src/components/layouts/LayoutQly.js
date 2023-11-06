//layout.js
import { Outlet } from "react-router-dom";
import NavBarQly from "./Navbar";
import "./LayoutQly.scss";
const LayoutQly = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <NavBarQly />
          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutQly;
