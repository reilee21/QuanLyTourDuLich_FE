import { Row } from "react-bootstrap";
import "./payment.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bkid = location.state.idbk;
  const sbk = () => {
    navigate(`/tracuubooking/${bkid}`);
  };
  return (
    <>
      <div className="row">
        <div className="card col-lg-6 col-md-6 col-sm-6">
          <Row>
            <center>
              <h3>Thanh toán</h3>
            </center>
          </Row>
          <Row>
            <center>
              <h4>
                Mã booking của bạn là : <span> {bkid}</span>{" "}
              </h4>
            </center>
          </Row>
          <Row>
            <center>
              <h5>Hãy kiểm tra hộp thư của bạn để tiến hành thanh toán</h5>
            </center>
          </Row>
          <Row>
            <center>
              <h5 className="trc" onClick={sbk}>
                Tra cứu booking tại đây.
              </h5>
            </center>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Payment;
