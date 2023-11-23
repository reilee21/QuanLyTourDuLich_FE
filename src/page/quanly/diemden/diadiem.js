import axios from "../../../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const DDiaDiem = ({ formData, setFormData }) => {
  const [ddl, setDdl] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(ddl);
  useEffect(() => {
    const dd = async () => {
      try {
        const res = await axios.get("/api/diadiems");
        setDdl(res);
      } catch (e) {
        console.log(e);
      }
    };

    dd();
  }, []);
  useEffect(() => {
    if (ddl.length > 0 && formData.IdDiaDiem) {
      const selectedDiadiem = ddl.find(
        (diadiem) => diadiem.idDiaDiem === formData.IdDiaDiem
      );

      if (selectedDiadiem) {
        setFormData((prevData) => ({
          ...prevData,
          TenDiaDiem: selectedDiadiem.tenDiaDiem,
        }));
        setSearchQuery(selectedDiadiem.tenDiaDiem);
      }
    }
  }, [ddl, formData.idDiaDiem]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = ddl.filter((option) =>
      option.tenDiaDiem.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 200);
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleOptionClick = (option) => {
    setFormData({ ...formData, IdDiaDiem: option.idDiaDiem });
    setSearchQuery(option.tenDiaDiem);
    setIsDropdownVisible(false);
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Chọn Địa Điểm</Form.Label>
        <Form.Control
          type="text"
          name="IdDiaDiem"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleSearchChange}
          value={searchQuery}
        />
        {isDropdownVisible && filteredOptions.length > 0 && (
          <div className="custom-dropdown">
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.idDiaDiem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.tenDiaDiem}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Form.Group>
    </>
  );
};

export default DDiaDiem;
