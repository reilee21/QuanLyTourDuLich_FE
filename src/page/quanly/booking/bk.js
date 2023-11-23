import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
const BK = ({ bookingData, setFlag, setBookingData }) => {
  const [isPaid, setIsPaid] = useState();

  const handlePaymentChange = () => {
    const updatedBookingData = { ...bookingData, thanhToan: !isPaid };
    setBookingData(updatedBookingData);
    setIsPaid(!isPaid);
    setFlag(true);
  };

  useEffect(() => {
    if (bookingData) {
      setIsPaid(bookingData.thanhToan);
    }
  }, [bookingData]);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="tt row">
        <Row>
          <p className="col-lg-3">
            <strong>ID Booking:</strong> {bookingData.idBooking}
          </p>
          <p className="col-lg-6">
            <strong>Thời điểm Book:</strong>{" "}
            {bookingData.thoiDiemBook.slice(0, 10)}
          </p>
          <p className="col-lg-3">
            <strong>Giá trị:</strong> {bookingData.giaTri.toLocaleString()} đ
          </p>
        </Row>
        <Row>
          <div className="form-check col-lg-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="paymentCheckbox"
              checked={isPaid}
              onChange={handlePaymentChange}
            />
            <label className="form-check-label" htmlFor="paymentCheckbox">
              {isPaid ? <p>Đã thanh toán</p> : <p>Chưa thanh toán</p>}
            </label>
          </div>

          <p className="col-lg-3">
            <strong>Loại Booking:</strong>{" "}
            {bookingData.loaiBooking ? "Khách sạn" : "Tour"}
          </p>
        </Row>
      </div>
    </>
  );
};

export default BK;
