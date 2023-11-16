import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
const MenuDuLich = (props) => {
  const [dulichtype, setDulichtype] = useState(true);
  const [diadiems, setDiadiems] = useState([]);

  useEffect(() => {
    const fetchDD = async () => {
      try {
        const response = await axios.get("api/DiaDiems");
        setDiadiems(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDD();
  }, [diadiems]);

  const handleDiaDiemClick = (diadiem) => {};
  return (
    <>
      <div className={`dulich-item ${props.isOpen ? "active" : ""} col-lg-12 `}>
        <div className="row">
          <div className="type col-lg- col-md-2 col-sm-2">
            <div
              className={`row item ${dulichtype ? "active" : ""}`}
              onClick={() => setDulichtype(true)}
            >
              <span>Du lịch trong nước </span>
            </div>
            <div
              className={`row item ${!dulichtype ? "active" : ""}`}
              onClick={() => setDulichtype(false)}
            >
              <span>Du lịch nước ngoài</span>
            </div>
          </div>
          <div className="detail col-lg-10 col-md-10 col-sm-10">
            {diadiems && (
              <div className="row">
                {diadiems
                  .filter((item) => item.loai === dulichtype)
                  .map((item, index) => (
                    <p
                      className="diadiemitem"
                      key={index}
                      onClick={() => handleDiaDiemClick(item)}
                    >
                      {item.tenDiaDiem}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDuLich;
