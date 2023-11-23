import { useState } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { Row } from "react-bootstrap";
import axios from "../../api/axios";
const LichTrinh = (lichtrinh) => {
  const [diemdens, setDiemdens] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("api/DiemDens");
        setDiemdens(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);
  const [groupedByDate, setGroupedByDate] = useState("");

  useEffect(() => {
    if (lichtrinh && Array.isArray(lichtrinh.lichtrinh)) {
      const groupedByDate = {};
      lichtrinh.lichtrinh.forEach((item) => {
        const date = format(new Date(item.ngay), "dd-MM-yyyy"); // Format the date
        if (!groupedByDate[date]) {
          groupedByDate[date] = []; // Create an array for each unique date
        }
        groupedByDate[date].push(item); // Add item to the corresponding date array
      });
      setGroupedByDate(groupedByDate);
    }
  }, [lichtrinh]);
  return (
    <>
      <center>
        <hr />
        <h4> Lịch trình</h4>
        <hr />
        <Row>
          <div className="right col-lg-4 col-md-4 col-sm-12">
            {Object.entries(groupedByDate).map(([date, items], index) => (
              <div key={date}>
                <div className="ngay row">
                  <div className="ind col-lg-2 col-md-2 col-sm-2">
                    Ngày {index + 1}
                  </div>
                  <div className=" col-lg-10 col-md-10 col-sm-10">{date}</div>
                </div>
                <Row className="ddd">
                  {items.map((item, index) => (
                    <span
                      key={index}
                      className="dden col-lg-10 col-md-10 col-sm-10"
                    >
                      {
                        diemdens.find((dd) => dd.idDiemDen === item.idDiemDen)
                          ?.tenDiemDen
                      }
                    </span>
                  ))}
                </Row>
              </div>
            ))}
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            {Object.entries(groupedByDate).map(([date, items], index) => (
              <div key={date}>
                <div className="ngay">Ngày {index + 1}</div>
                {items.map((item, index) => (
                  <div className="mota" key={index}>
                    <p>{item.moTa}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Row>
      </center>
    </>
  );
};
export default LichTrinh;
