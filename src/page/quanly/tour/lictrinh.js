import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";

import { Table, Button, Form, Row, Col, FormControl } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
const LichTrinh = ({
  tourData,
  handleAddItineraryEntry,
  handleItineraryEntryChange,
  delLichTrinh,
  setTourData,
}) => {
  const [diemDens, setDiemDens] = useState([]);
  const [selectedDiemDen, setSelectedDiemDen] = useState([]);
  const [searchTermDiemDen, setSearchTermDiemDen] = useState("");
  const [filteredDiemDens, setFilteredDiemDens] = useState([]);
  const [showDiemDenDropdown, setShowDiemDenDropdown] = useState(false);
  const fetchDD = async () => {
    try {
      const res = await axios.get("api/DiemDens");
      setDiemDens(res);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDD();
  }, []);

  useEffect(() => {
    setFilteredDiemDens(
      diemDens.filter((diemDen) =>
        diemDen.tenDiemDen
          .toLowerCase()
          .includes(searchTermDiemDen.toLowerCase())
      )
    );

    openDiemDenDropdown(searchTermDiemDen);
  }, [searchTermDiemDen]);

  const handleAddDiemDen = (diemDen) => {
    const isAlreadySelected = tourData.lichTrinh.some(
      (entry) => entry.diemDen.tenDiemDen === diemDen.tenDiemDen
    );

    if (!isAlreadySelected) {
      const updatedItinerary = [
        ...tourData.lichTrinh,
        { Ngay: "", diemDen: diemDen, MoTa: "" },
      ];
      console.log(updatedItinerary);

      setTourData({
        ...tourData,
        lichTrinh: updatedItinerary,
      });
    }
    setShowDiemDenDropdown(false);
    setSearchTermDiemDen("");
  };

  const handleRemoveDiemDen = (index) => {
    const updatedDiemDens = [...selectedDiemDen];
    updatedDiemDens.splice(index, 1);
    setSelectedDiemDen(updatedDiemDens);
  };

  const openDiemDenDropdown = (s) => {
    if (s.length < 3) {
      setShowDiemDenDropdown(false);
    } else {
      setShowDiemDenDropdown(true);
    }
  };
  useEffect(() => {
    if (searchTermDiemDen.length < 3) {
      setShowDiemDenDropdown(false);
    } else {
      setShowDiemDenDropdown(true);
    }
  }, [searchTermDiemDen]);
  return (
    <>
      <Form.Group controlId="lichTrinh" className="lichtrinh row">
        <center>
          <h5 className="col-lg-12">Lịch trình </h5>
        </center>
        <div className="search">
          <FormControl
            className="searchdd"
            type="text"
            placeholder="Tên điểm đến"
            value={searchTermDiemDen}
            onChange={(e) => {
              setSearchTermDiemDen(e.target.value);
              openDiemDenDropdown(e.target.value);
            }}
          />
          {showDiemDenDropdown && (
            <div className="dd">
              {diemDens.map((diemDen, index) => (
                <div
                  className="dd-item"
                  key={index}
                  onClick={() => {
                    handleAddDiemDen(diemDen);
                    setShowDiemDenDropdown(false);
                    setSearchTermDiemDen("");
                  }}
                >
                  <span> {diemDen.tenDiemDen}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="ngay">Ngày</th>
              <th className="diemden">Điểm Đến</th>
              <th className="mota">Mô Tả</th>
              <th className="del"></th>
            </tr>
          </thead>
          <tbody>
            {tourData.lichTrinh.map((entry, index) => (
              <tr key={index}>
                <td className="ngay">
                  <Form.Control
                    type="date"
                    value={entry.Ngay}
                    onChange={(e) =>
                      handleItineraryEntryChange(index, "Ngay", e.target.value)
                    }
                  />
                </td>
                <td className="diemden">
                  <p> {entry.diemDen.tenDiemDen}</p>
                </td>

                <td className="mota">
                  <Form.Control
                    type="text"
                    value={entry.MoTa}
                    onChange={(e) =>
                      handleItineraryEntryChange(index, "MoTa", e.target.value)
                    }
                  />
                </td>
                <td className="del">
                  <Button
                    variant="outline-danger"
                    onClick={() => delLichTrinh(index)}
                  >
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="col-span-3"></tr>
          </tbody>
        </Table>
        <Button
          variant="secondary"
          className="addlich"
          onClick={handleAddItineraryEntry}
        >
          Thêm Ngày
        </Button>
      </Form.Group>
    </>
  );
};

export default LichTrinh;
