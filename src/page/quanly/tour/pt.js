import data from "../phuongtien/data";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";

const CphuongTien = () => {
  const [selectedTransportations, setSelectedTransportations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransportations, setFilteredTransportations] = useState(data);

  useEffect(() => {
    // Filter transportation data based on the search term
    setFilteredTransportations(
      data.filter((transportation) =>
        transportation.tenPhuongTien
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleAddTransportation = () => {
    // Add selected transportation to the list
    if (searchTerm.trim() !== "") {
      setSelectedTransportations([...selectedTransportations, searchTerm]);
      setSearchTerm(""); // Reset search term and filtered list
      setFilteredTransportations(data);
    }
  };

  const handleRemoveTransportation = (index) => {
    // Remove selected transportation from the list
    const updatedTransportations = [...selectedTransportations];
    updatedTransportations.splice(index, 1);
    setSelectedTransportations(updatedTransportations);
  };
  return (
    <>
      <Row>
        <Col lg={6}>
          <Form.Group controlId="selectedTransportations">
            <Form.Label>Selected Transportations</Form.Label>
            {selectedTransportations.map((transportation, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <Form.Control type="text" value={transportation} readOnly />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemoveTransportation(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Search for transportation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Add Transportation
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {filteredTransportations.map((transportation, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setSearchTerm(transportation.tenPhuongTien);
                      handleAddTransportation();
                    }}
                  >
                    {transportation.tenPhuongTien}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <InputGroup.Append>
              <Button variant="success" onClick={handleAddTransportation}>
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};
export default CphuongTien;
