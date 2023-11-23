import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faHotel, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./action.scss";
import SearchBooking from "./sbk";
import SearchHotel from "./sks";
import SearchTour from "./stour";
const Action = () => {
  const [searchVisible, setSearchVisible] = useState("");

  const open = (tab) => {
    if (searchVisible === tab) {
      setSearchVisible("");
      return;
    }
    setSearchVisible(tab);
  };
  return (
    <>
      <div className="home-features">
        <div className="feature-container">
          <div style={{ textDecoration: "none" }} onClick={() => open("bkt")}>
            <div className="feature">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faPlane} size="3x" />
              </div>
              <p>Đặt Tour</p>
            </div>
          </div>
          <div style={{ textDecoration: "none" }} onClick={() => open("bks")}>
            <div className="feature">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faHotel} size="3x" />
              </div>
              <p>Đặt Khách Sạn</p>
            </div>
          </div>
          <div className="feature" onClick={() => open("search")}>
            <div className="feature-icon">
              <FontAwesomeIcon icon={faSearch} size="3x" />
            </div>
            <p>Tra cứu booking</p>
          </div>
        </div>
        {searchVisible === "search" && <SearchBooking />}
        {searchVisible === "bks" && <SearchHotel />}
        {searchVisible === "bkt" && <SearchTour />}
      </div>
    </>
  );
};

export default Action;
