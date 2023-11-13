import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./index.scss";
const availableOptions = [
  { value: 0, label: "Địa Điểm 1" },
  { value: 1, label: "Địa Điểm 2" },
  { value: 2, label: "Địa Điểm 3" },
  // Add more options as needed
];

const AddDiemDenFormModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    TenDiemDen: "",
    IdDiaDiem: -1, // Initialize to an invalid value
  });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(availableOptions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleBlur = () => {
    // Delay hiding the dropdown to allow selection
    setTimeout(() => setIsDropdownVisible(false), 200);
  };

  const handleOptionClick = (option) => {
    setFormData({ ...formData, IdDiaDiem: option.value });
    setSearchQuery(option.label); // Set the input text to the selected option
    setIsDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = availableOptions.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Điểm Đến</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên Điểm Đến</Form.Label>
            <Form.Control
              type="text"
              name="TenDiemDen"
              value={formData.TenDiemDen}
              onChange={handleChange}
            />
          </Form.Group>
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
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Huỷ
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Thêm mới
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDiemDenFormModal;
