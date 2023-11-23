import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchTour = () => {
  const [diadiems, setDiadiems] = useState([]);
  const [ftdiadiems, setFtdiadiems] = useState([]);
  const navigate = useNavigate();
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

  const listkh = [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Nha Trang",
    "Vũng Tàu",
    "Huế",
    "Nha Trang",
    "Cần Thơ",
  ];
  const [open, setOpen] = useState(false);
  const [opend, setOpend] = useState(false);
  const [formsearch, setFormsearch] = useState({
    noikhoihanh: "",
    diemden: "",
    ngaykhoihanh: "",
    iddiadiem: "",
  });
  const cnnoikhoihanh = (city) => {
    setFormsearch({ ...formsearch, noikhoihanh: city });
    setOpen(false);
  };
  const handleDateChange = (event) => {
    setFormsearch({ ...formsearch, ngaykhoihanh: event.target.value });
  };
  const handleDestinationChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredDestinations = diadiems.filter((item) =>
      item.tenDiaDiem.toLowerCase().includes(searchTerm)
    );
    setFormsearch({ ...formsearch, diemden: event.target.value });
    setOpend(true);
    setFtdiadiems(filteredDestinations);
  };
  const handleSearch = async () => {
    const { diemden, ...postrq } = formsearch;
    const queryString = new URLSearchParams(postrq).toString();
    try {
      const res = await axios.get(`/api/Tours/SearchTour?${queryString}`);
      navigate("timkiemtour", { state: { tourlist: res } });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="stour">
        <div className="line"></div>

        <div className="bk-tour row">
          <div className="cl col-lg-3 md-3">
            <input
              type="text"
              placeholder="Nơi khởi hành"
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              value={formsearch.noikhoihanh}
            />
            <div className="listkh">
              {open &&
                listkh.map((item, index) => (
                  <div
                    key={index}
                    className="item"
                    onMouseDown={() => {
                      cnnoikhoihanh(item);
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="cl col-lg-3 md-3">
            <input
              type="text"
              placeholder="Điểm đến"
              value={formsearch.diemden}
              onFocus={() => setOpend(true)}
              onBlur={() => setOpend(false)}
              onChange={handleDestinationChange}
            />
            <div className="listkh">
              {opend &&
                ftdiadiems.map((item, index) => (
                  <div
                    key={index}
                    className="item"
                    onMouseDown={() => {
                      setFormsearch({
                        ...formsearch,
                        diemden: item.tenDiaDiem,
                        iddiadiem: item.idDiaDiem,
                      });
                      setOpend(false);
                    }}
                  >
                    <span>{item.tenDiaDiem}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="cl col-lg-2 md-2">
            <input
              type="date"
              value={formsearch.ngaykhoihanh}
              placeholder="Ngày khởi hành"
              onChange={handleDateChange}
            />
          </div>
        </div>
        <center>
          <div className="timk col-lg-2 md-2" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} color="#293462" />
            <span>Tìm kiếm</span>
          </div>
        </center>
      </div>
    </>
  );
};
export default SearchTour;
