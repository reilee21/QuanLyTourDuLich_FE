import React from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "../../api/axios";
const MenuDuLich = (props) => {
  const [dulichtype, setDulichtype] = useState(true);
  const [diadiems, setDiadiems] = useState([]);
  const navigate = useNavigate();

  const [formsearch, setFormsearch] = useState({
    noikhoihanh: "",
    diemden: "",
    ngaykhoihanh: "",
    iddiadiem: "",
  });
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
  }, []);

  const handleDiaDiemClick = async (diadiem) => {
    setFormsearch({
      ...formsearch,
      diemden: diadiem.tenDiaDiem,
      iddiadiem: diadiem.idDiaDiem,
    });
    const { diemden, ...postrq } = formsearch;
    const queryString = new URLSearchParams(postrq).toString();
    try {
      const res = await axios.get(`/api/Tours/SearchTour?${queryString}`);
      navigate(`/timkiemtour/${diadiem.tenDiaDiem}`, {
        state: { tourlist: res },
      });
    } catch (e) {
      console.error(e);
    }
  };
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
                  .slice(0, 25)
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
