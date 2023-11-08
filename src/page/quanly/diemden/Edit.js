import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./index.scss";

const destinationOptions = [
  { value: 0, label: "Địa Điểm 1" },
  { value: 1, label: "Địa Điểm 2" },
  { value: 2, label: "Địa Điểm 3" },
  // Add more destination options as needed
];

const EditDiemDenFormModal = ({ show, onClose, onSubmit, itemToEdit }) => {
  const [formData, setFormData] = useState(itemToEdit);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(destinationOptions);

  useEffect(() => {
    setFormData(itemToEdit);
  }, [itemToEdit]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = destinationOptions.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setFormData({ ...formData, IdDiaDiem: option.value });
    setSearchQuery(option.label);
    setIsDropdownVisible(false);
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleBlur = () => {
    // Add a small delay to prevent the dropdown from disappearing before clicking
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Điểm Đến</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên Điểm Đến</Form.Label>
            <Form.Control
              type="text"
              name="TenDiemDen"
              value={formData.TenDiemDen}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
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
          Lưu chỉnh sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDiemDenFormModal;
