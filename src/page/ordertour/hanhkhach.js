import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const HanhKhach = ({
  adultsCount,
  childrenCount,
  infantsCount,
  updatePassengers,
}) => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const newPassengers = [];
    for (let i = 0; i < adultsCount; i++) {
      newPassengers.push({ tenHanhKhach: "", loaiHanhKhach: "Người lớn" });
    }
    for (let i = 0; i < childrenCount; i++) {
      newPassengers.push({ tenHanhKhach: "", loaiHanhKhach: "Trẻ em" });
    }
    for (let i = 0; i < infantsCount; i++) {
      newPassengers.push({ tenHanhKhach: "", loaiHanhKhach: "Trẻ nhỏ" });
    }
    setPassengers(newPassengers);
  }, [adultsCount, childrenCount, infantsCount]);

  const handleNameChange = (e, index) => {
    const updatedPassengers = passengers.map((passenger, idx) =>
      idx === index ? { ...passenger, tenHanhKhach: e.target.value } : passenger
    );
    setPassengers([...updatedPassengers]);
    updatePassengers([...updatedPassengers]);
  };

  return (
    <div>
      <div className="hktb col-lg-12 col-md-12">
        <Row className="hd">
          <div className="stt col-lg-1 col-md-1 col-sm-1">STT</div>
          <div className="type col-lg-3 col-md-3 col-sm-3">Loại</div>{" "}
          <div className="ten col-lg-7 col-md-7 col-sm-7">Họ tên</div>
        </Row>
        {passengers.map((passenger, index) => (
          <div className="row dt" key={index}>
            <div className="stt col-lg-1 col-md-1 col-sm-1">{index + 1}</div>
            <div className="type col-lg-3 col-md-3 col-sm-3">
              {passenger.loaiHanhKhach}
            </div>

            <input
              className="ten col-lg-7 col-md-7 col-sm-7"
              type="text"
              value={passenger.tenHanhKhach}
              onChange={(e) => handleNameChange(e, index)}
            />
          </div>
        ))}
        <div className="row dt end">
          <div className="stt col-lg-1 col-md-1 col-sm-1"></div>
          <div className="type col-lg-3 col-md-3 col-sm-3"></div>
          <div className="ten col-lg-7 col-md-7 col-sm-7"></div>
        </div>
      </div>
    </div>
  );
};

export default HanhKhach;
