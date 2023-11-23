import axios from "../../../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const DDoitac = ({ formData, setFormData }) => {
  const [ddl, setDdl] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(ddl);
  useEffect(() => {
    const dd = async () => {
      try {
        const res = await axios.get("/api/doitacs");
        setDdl(res);
      } catch (e) {
        console.log(e);
      }
    };

    dd();
  }, []);
  useEffect(() => {
    if (ddl.length > 0 && formData.idDoiTac) {
      const selecteddoitac = ddl.find(
        (dt) => dt.idDoiTac === formData.idDoiTac
      );

      if (selecteddoitac) {
        setFormData((prevData) => ({
          ...prevData,
          tendoitac: selecteddoitac.ten,
        }));
        setSearchQuery(selecteddoitac.ten);
      }
    }
  }, [ddl, formData.IdDoiTac]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = ddl.filter((option) =>
      option.ten.toLowerCase().includes(query.toLowerCase())
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
    setFormData({ ...formData, IdDoiTac: option.idDoiTac });
    setSearchQuery(option.ten);
    setIsDropdownVisible(false);
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Chọn Đối tác</Form.Label>
        <Form.Control
          type="text"
          name="IdDoiTac"
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
                  key={option.idDoiTac}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.ten}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Form.Group>
    </>
  );
};

export default DDoitac;
