import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";

const mystyle = {
  padding: "16px 0",
  fontweight: "500",
};
const Success = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onHide(); // This assumes onHide is a function to close the modal provided by react-bootstrap
    }, 2000);

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts or the modal is closed earlier
  }, [props]);

  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <center>Đặt vé thành công.</center>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <center>
          <FontAwesomeIcon icon={faCircleCheck} color="#23B93C" size="10x" />
        </center>
        <center>
          <p style={mystyle}>
            Hãy kiểm tra Email của bạn để xác nhận và tiến hành thanh toán.
          </p>
        </center>
      </Modal.Body>
    </Modal>
  );
};

export default Success;
