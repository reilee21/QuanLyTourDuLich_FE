import { useEffect } from "react";
import { Row } from "react-bootstrap";

const BKKS = ({ khachsanData, bookingData }) => {
  if (!bookingData || !khachsanData) {
    return <div>Loading...</div>;
  }
  const getRoomTypeName = (id) => {
    const bookedRoomTypes = bookingData.bookingKs.filter(
      (booking) => booking.idLoaiPhong === id
    );
    const roomType = khachsanData.loaiPhongs.find(
      (room) => room.idLoaiPhong === id
    );

    if (roomType) {
      const quantity = bookedRoomTypes.length;
      return `${roomType.tenLoai} (${quantity} ${
        quantity > 1 ? "phòng" : "phòng"
      })`;
    }

    return "Không xác định";
  };
  const bookedRoomTypes = bookingData.bookingKs.map((booking) => {
    return {
      idBookingKs: booking.idBookingKs,
      ngayNhan: booking.ngayNhan,
      ngayTra: booking.ngayTra,
      roomTypeName: getRoomTypeName(booking.idLoaiPhong),
    };
  });

  return (
    <>
      <div className="row">
        <div className="row col-lg-4 col-md-12">
          <div className="col-lg-12 col-md-12">
            <h2>{khachsanData.ten}</h2>
            <p>
              <strong>Địa chỉ:</strong> {khachsanData.diaChi}
            </p>

            <p>
              <strong>Sao:</strong> {khachsanData.soSao}
            </p>
          </div>
        </div>
        <div className="bookingDataBookingKs col-lg-8 col-md-12">
          <center>
            <h3>Các phòng đã đặt</h3>
          </center>
          {bookedRoomTypes.map((booking) => (
            <div key={booking.idBookingKs}>
              <p>
                <strong>Thời gian nhận phòng:</strong>{" "}
                {booking.ngayNhan.slice(0, 10)}
              </p>
              <p>
                <strong>Thời gian trả phòng:</strong>{" "}
                {booking.ngayTra.slice(0, 10)}
              </p>
              <p>
                <strong>Loại phòng:</strong> {booking.roomTypeName}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BKKS;
