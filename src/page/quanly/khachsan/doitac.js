import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const SDoiTac = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [doitacdt, setDoitacdt] = useState([]);

  const selectDoiTac = (selectedItem) => {
    // setSearchTerm(selectedItem.ten);
    // khachSanData.IdDoiTac = selectedItem.stt;
    // setIsOpen(false);
  };
  //   useEffect(() => {
  //     setDoitacdt(
  //       data.filter((doitac) =>
  //         doitac.ten.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //     if (searchTerm.length < 1) setIsOpen(false);
  //   }, [searchTerm]);

  return (
    <>
      <Form.Group controlId="IdDoiTac" className="col-lg-6 col-md-6 col-sm-6">
        <Form.Label>Đối Tác</Form.Label>
        <Form.Control
          type="text"
          placeholder="Tên Đối Tác"
          name="IdDoiTac"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />
        {isOpen && (
          <div className="doitac-dropdown-list">
            {doitacdt.map((item) => (
              <div
                key={item.stt}
                className="dropdown-item"
                onClick={() => {
                  selectDoiTac(item);
                }}
              >
                {item.ten}
              </div>
            ))}
          </div>
        )}
      </Form.Group>
    </>
  );
};

export default SDoiTac;
