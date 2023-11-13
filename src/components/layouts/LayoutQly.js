//layout.js
import { Outlet } from "react-router-dom";
import NavBarQly from "./Navbar";
import "./LayoutQly.scss";
import { useState } from "react";
const LayoutQly = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="container-fluid">
        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={handleOpen}
        >
          <span></span>
        </button>
        <div className="row flex-nowrap">
          <div
            className={`sidebar ${
              open ? "open" : ""
            } col-auto col-md-3 col-lg-2 px-sm-2 px-0 min-vh-100 bg-light `}
          >
            <NavBarQly />
          </div>
          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutQly;
