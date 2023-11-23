import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/axios";

const SearchHotel = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searchks = async () => {
    if (search.length < 2 || search == null) {
      alert("Vui lòng nhập tên địa điểm hoặc tên khách sạn");
      return;
    }
    try {
      const listks = await axios.get("api/khachsans");
      const filteredResult = listks.filter((item) => {
        const searchString = search.toLowerCase();
        return (
          item.ten.toLowerCase().includes(searchString) ||
          item.diaChi.toLowerCase().includes(searchString)
        );
      });
      navigate("timkiemkhachsan", { state: { result: filteredResult } });
    } catch (e) {
      alert("Lỗi không xác định");
      console.error(e);
    }
  };
  return (
    <>
      <div className="bks container">
        <center>
          <div className="line" />
        </center>
        <div className="bk-ks row">
          <input
            className="col-lg-6 md-6"
            type="text"
            placeholder="Địa điểm hoặc Tên khách sạn"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="timk col-lg-2 md-2" onClick={searchks}>
            <FontAwesomeIcon icon={faSearch} color="#293462" />
            <span>Tìm kiếm</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchHotel;
