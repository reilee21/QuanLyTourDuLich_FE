import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBooking = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const searchbk = () => {
    navigate(`tracuubooking/${id}`);
  };

  return (
    <>
      <div className="search-bar">
        <center>
          <div className="line" />
        </center>
        <input
          type="text"
          placeholder="Nhập số booking"
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={searchbk}>Tìm kiếm</button>
      </div>
    </>
  );
};
export default SearchBooking;
