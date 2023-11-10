import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditForm = ({ show, onClose, onSubmit, editData }) => {
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  useEffect(() => {
    setEditedQuestion(editData.question);
    setEditedAnswer(editData.answer);
  }, [editData]);

  const handleEditSubmit = () => {
    // Validate the input, perform any necessary checks

    // Submit the edited question and answer
    onSubmit({
      id: editData.id, // Include a unique identifier for the item being edited
      question: editedQuestion,
      answer: editedAnswer,
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa câu hỏi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editedQuestion">
            <Form.Label>Câu hỏi</Form.Label>
            <Form.Control
              type="text"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editedAnswer">
            <Form.Label>Trả lời</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditForm;
