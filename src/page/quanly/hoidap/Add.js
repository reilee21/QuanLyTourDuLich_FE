import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddForm = ({ show, onClose, onSubmit }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddSubmit = () => {
    // Validate the input, perform any necessary checks

    // Submit the new question and answer
    onSubmit({
      question: newQuestion,
      answer: newAnswer,
    });

    // Clear the form fields
    setNewQuestion("");
    setNewAnswer("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới câu hỏi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="newQuestion">
            <Form.Label>Câu hỏi</Form.Label>
            <Form.Control
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newAnswer">
            <Form.Label>Trả lời</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleAddSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddForm;
