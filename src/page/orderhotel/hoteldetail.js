// HotelDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import khachsanImage from "../../assets/image/khachsan1.jpg";
import "./HotelDetail.scss";
import { Row } from "react-bootstrap";
import { RiMapPin2Line } from "react-icons/ri";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const hotel = location.state.hotel;
  const [hotelDetails, setHotelDetails] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      await delay(500);

      const fakeData = [
        {
          id: 1,
          name: "Khách sạn A",
          destination: "Đà Nẵng",
          description: "Mô tả khách sạn A.",
          imageUrl: khachsanImage,
          roomTypes: [
            {
              id: 1,
              name: "Phòng Deluxe",
              description: "Mô tả phòng Deluxe.",
              price: 200,
              idKhachSan: "KS001",
            },
            {
              id: 2,
              name: "Phòng Suite",
              description: "Mô tả phòng Suite.",
              price: 300,
              idKhachSan: "KS001",
            },
          ],
        },
        {
          id: 2,
          name: "Khách sạn B",
          destination: "Hội An",
          description: "Mô tả khách sạn B.",
          imageUrl: khachsanImage,
          roomTypes: [
            {
              id: 3,
              name: "Phòng Standard",
              description: "Mô tả phòng Standard.",
              price: 150,
              idKhachSan: "KS002",
            },
            {
              id: 4,
              name: "Phòng Executive",
              description: "Mô tả phòng Executive.",
              price: 250,
              idKhachSan: "KS002",
            },
          ],
        },
      ];

      const selectedHotel = fakeData.find(
        (hotel) => hotel.id.toString() === hotelId
      );

      if (isMounted) {
        setHotelDetails(selectedHotel);
      }
    };

    fetchHotelDetails();

    return () => {
      setIsMounted(false);
    };
  }, [hotelId, isMounted]);

  const handleAddToCart = (roomType) => {
    const currentQuantity = selectedRooms[roomType.id] || 0;
    setSelectedRooms({ ...selectedRooms, [roomType.id]: currentQuantity + 1 });
  };

  const handleRemoveFromCart = (roomType) => {
    const currentQuantity = selectedRooms[roomType.id] || 0;
    if (currentQuantity > 0) {
      setSelectedRooms({
        ...selectedRooms,
        [roomType.id]: currentQuantity - 1,
      });
    }
  };

  const calculateTotalPriceAndRooms = () => {
    let totalPrice = 0;
    let bookedRooms = [];
    console.log(hotel);
    Object.keys(selectedRooms).forEach((roomId) => {
      const roomType = hotelDetails.roomTypes.find(
        (room) => room.id === parseInt(roomId, 10)
      );
      if (roomType) {
        totalPrice += roomType.price * selectedRooms[roomId];
        bookedRooms.push(`${selectedRooms[roomId]} ${roomType.name}`);
      }
    });

    return { totalPrice, bookedRooms };
  };

  if (!hotelDetails) {
    return <p>Loading...</p>;
  }

  const { totalPrice, bookedRooms } = calculateTotalPriceAndRooms();
  const handleConfirmBooking = () => {
    console.log(selectedRooms);
    const totalQuantity = Object.values(selectedRooms).reduce(
      (sum, quantity) => sum + quantity,
      0
    );

    if (totalQuantity === 0) {
      alert("Vui lòng chọn ít nhất một phòng trước khi xác nhận đặt phòng.");
      return;
    }

    alert("Đặt phòng thành công");
  };

  return (
    <>
      <div className="hotel-bk-page row">
        <div className="hotel col-lg-9 md-9 sm-9">
          <Row className="hotel-inf">
            <div className="col-lg-5 md-5 sm-5">
              <img
                className="imghotel col-lg-3 col-md-3"
                src={hotel.imageUrl}
              />
            </div>
            <div className="col-lg-7 md-7 sm-7">
              <h4>{hotel.name}</h4>
              <p>
                <RiMapPin2Line />
                {hotel.diachi}
              </p>
              <p>{hotel.description}</p>
            </div>
          </Row>
        </div>
        <div className="bkcart col-lg-3 md-3 sm-3">
          <div className="main-tong-tien">
            <div className="tongtien">
              <p className="tongtien1">Đơn hàng</p>
              <div className="cart-detail">
                <p>
                  Số phòng:
                  {Object.values(selectedRooms).reduce(
                    (sum, quantity) => sum + quantity,
                    0
                  )}
                </p>
                <p>Tổng tiền: {totalPrice} VND</p>
                {bookedRooms.length > 0 && (
                  <div>
                    <p>Phòng đã đặt</p>
                    <ul>
                      {bookedRooms.map((room) => (
                        <li key={room}>{room}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                className="xac-nhan"
                onClick={handleConfirmBooking}
                disabled={
                  Object.values(selectedRooms).reduce(
                    (sum, quantity) => sum + quantity,
                    0
                  ) === 0
                }
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hotel-details">
        {hotelDetails.roomTypes && hotelDetails.roomTypes.length > 0 ? (
          <div className="cart-room">
            <ul className="room-list">
              <h3 className="hotel-details-1">Danh Sách Phòng</h3>
              {hotelDetails.roomTypes.map((roomType) => (
                <li key={roomType.id} className="room-item">
                  <div className="room-details">
                    <h3>{roomType.name}</h3>
                    <p>Mô tả: {roomType.description}</p>
                    <p>Giá: {roomType.price}</p>
                  </div>
                  <div className="room-button-wrapper">
                    <button onClick={() => handleRemoveFromCart(roomType)}>
                      -
                    </button>
                    <button onClick={() => handleAddToCart(roomType)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No room types available.</p>
        )}
      </div>
    </>
  );
};

export default HotelDetail;
