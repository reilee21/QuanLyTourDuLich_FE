import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";

const BookingKS = ({ selectedRoom, setBookingKS, setBk, confirm }) => {
  const [order, setOrder] = useState({
    rooms: [],
    total: 0,
  });
  const [ngayNhan, setNgayNhan] = useState(new Date().toISOString());
  const [ngayTra, setNgayTra] = useState(new Date().toISOString());

  const decrease = (idLoaiPhong) => {
    const roomIndex = order.rooms.findIndex(
      (room) => room.idLoaiPhong === idLoaiPhong
    );

    if (roomIndex !== -1) {
      const updatedRooms = [...order.rooms];
      if (updatedRooms[roomIndex].quantity > 1) {
        updatedRooms[roomIndex].quantity--;
      } else {
        updatedRooms.splice(roomIndex, 1); // Remove the room if quantity becomes zero
      }

      const updatedTotal = updatedRooms.reduce(
        (acc, room) => acc + room.gia * room.quantity,
        0
      );
      setOrder({
        rooms: updatedRooms,
        total: updatedTotal,
      });
    }
  };
  const removeFromOrder = (idLoaiPhong) => {
    const updatedRooms = order.rooms.filter(
      (room) => room.idLoaiPhong !== idLoaiPhong
    );
    const updatedTotal = updatedRooms.reduce((acc, room) => acc + room.gia, 0);
    setOrder({
      rooms: updatedRooms,
      total: updatedTotal,
    });
  };
  const addToOrder = (roomToAdd) => {
    if (roomToAdd == null) return;

    const roomExistsIndex = order.rooms.findIndex(
      (room) => room.idLoaiPhong === roomToAdd.idLoaiPhong
    );

    if (roomExistsIndex !== -1) {
      const updatedRooms = [...order.rooms];
      if (updatedRooms[roomExistsIndex].quantity >= roomToAdd.soPhong) {
        alert(roomToAdd.tenLoai + " đã đạt số lượng tối đa");
        return;
      }

      updatedRooms[roomExistsIndex].quantity++;
      setOrder((prevOrder) => ({
        ...prevOrder,
        rooms: updatedRooms,
      }));
    } else {
      if (roomToAdd.soPhong > 0) {
        const updatedRooms = [
          ...order.rooms,
          { ...roomToAdd, quantity: 1, gia: roomToAdd.gia },
        ];
        setOrder((prevOrder) => ({
          ...prevOrder,
          rooms: updatedRooms,
        }));
      } else {
        alert("Phòng không sẵn có");
      }
    }
  };

  const updateTotal = () => {
    const ngayNhanDate = new Date(ngayNhan);
    const ngayTraDate = new Date(ngayTra);
    const timeDifference = ngayTraDate.getTime() - ngayNhanDate.getTime();
    let daysDifference = timeDifference / (1000 * 3600 * 24);

    daysDifference = Math.ceil(Math.max(1, daysDifference));

    const updatedTotal = order.rooms.reduce(
      (acc, room) => acc + room.gia * room.quantity * daysDifference,
      0
    );

    setOrder((prevOrder) => ({
      ...prevOrder,
      total: updatedTotal,
    }));
  };

  useEffect(() => {
    updateTotal();
  }, [ngayNhan, ngayTra, order.rooms]);

  useEffect(() => {
    if (selectedRoom) {
      addToOrder(selectedRoom);
    }
  }, [selectedRoom]);
  useEffect(() => {
    const newRoomIDsArray = order.rooms.flatMap((room) => {
      const roomArray = [];
      for (let i = 0; i < room.quantity; i++) {
        roomArray.push(room.idLoaiPhong);
      }
      return roomArray;
    });

    setBookingKS((prevBooking) => ({
      ...prevBooking,
      phongs: newRoomIDsArray,
      ngayNhan: ngayNhan,
      ngayTra: ngayTra,
    }));
    setBk((prevBooking) => ({
      ...prevBooking,
      giaTri: order.total,
      thoiDiemBook: new Date().toISOString(),
    }));
  }, [order.rooms]);
  const confirmBooking = () => {
    confirm();
  };

  return (
    <>
      <div className="order-details">
        <center>
          <h3>Đơn Booking</h3>
        </center>
        <Row>
          <div className="col-lg-4 col-md-4 col-sm-4">
            <b>Ngày nhận</b>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4">
            <b>Ngày trả</b>
          </div>
        </Row>
        <Row>
          <input
            type="date"
            id="ngayNhan"
            className="nhan col-lg-4 col-md-4 col-sm-4"
            value={ngayNhan.slice(0, 10)}
            onChange={(e) => setNgayNhan(e.target.value)}
          />
          <input
            type="date"
            id="ngayTra"
            value={ngayTra.slice(0, 10)}
            className="tra col-lg-4 col-md-4 col-sm-4"
            onChange={(e) => setNgayTra(e.target.value)}
          />
        </Row>

        {order.rooms.map((room, index) => (
          <Row className="bkp" key={index}>
            <div className="ten col-lg-4 col-md-4 col-sm-4">
              {room.tenLoai}{" "}
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">{room.quantity} x</div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              {room.gia.toLocaleString()} đ{" "}
            </div>
            <Button
              variant="secondary"
              className="col-lg-1 col-md-1 col-sm-1"
              onClick={() => decrease(room.idLoaiPhong)}
            >
              -
            </Button>
            <Button
              variant="warning"
              className="col-lg-1 col-md-1 col-sm-1"
              onClick={() => removeFromOrder(room.idLoaiPhong)}
            >
              X
            </Button>
            <hr />
          </Row>
        ))}
        <Row>
          <div className="col-lg-5 col-md-5 col-sm-5">Tổng :</div>
          <div className="total col-lg-6 col-md-6 col-sm-6">
            {order.total.toLocaleString()} đ
          </div>
        </Row>
      </div>
      <Row>
        <Button
          className="col-lg-6 col-md-6 col-sm-6 confirm"
          variant="success"
          onClick={confirmBooking}
        >
          Xác nhận
        </Button>
      </Row>
    </>
  );
};

export default BookingKS;
