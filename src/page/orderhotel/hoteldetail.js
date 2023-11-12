// HotelDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import khachsanImage from '../../assets/image/khachsan1.jpg';
import './HotelDetail.css';

const HotelDetail = () => {
    const { hotelId } = useParams();
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
                    name: 'Khách sạn A',
                    destination: 'Đà Nẵng',
                    description: 'Mô tả khách sạn A.',
                    imageUrl: khachsanImage,
                    roomTypes: [
                        { id: 1, name: 'Phòng Deluxe', description: 'Mô tả phòng Deluxe.', price: 200, idKhachSan: 'KS001' },
                        { id: 2, name: 'Phòng Suite', description: 'Mô tả phòng Suite.', price: 300, idKhachSan: 'KS001' },
                        // Add more room types if needed
                    ],
                },
                {
                    id: 2,
                    name: 'Khách sạn B',
                    destination: 'Hội An',
                    description: 'Mô tả khách sạn B.',
                    imageUrl: khachsanImage,
                    roomTypes: [
                        { id: 3, name: 'Phòng Standard', description: 'Mô tả phòng Standard.', price: 150, idKhachSan: 'KS002' },
                        { id: 4, name: 'Phòng Executive', description: 'Mô tả phòng Executive.', price: 250, idKhachSan: 'KS002' },
                        // Add more room types if needed
                    ],
                },
                // ... more hotel data
            ];

            const selectedHotel = fakeData.find((hotel) => hotel.id.toString() === hotelId);

            if (isMounted) {
                setHotelDetails(selectedHotel);
            }
        };

        fetchHotelDetails();

        // Cleanup function to set isMounted to false when the component is unmounted
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
            setSelectedRooms({ ...selectedRooms, [roomType.id]: currentQuantity - 1 });
        }
    };

    const calculateTotalPriceAndRooms = () => {
        let totalPrice = 0;
        let bookedRooms = [];

        Object.keys(selectedRooms).forEach((roomId) => {
            const roomType = hotelDetails.roomTypes.find((room) => room.id === parseInt(roomId, 10));
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
        const totalQuantity = Object.values(selectedRooms).reduce((sum, quantity) => sum + quantity, 0);

        if (totalQuantity === 0) {
            alert('Vui lòng chọn ít nhất một phòng trước khi xác nhận đặt phòng.');
            return; // Do not proceed with the confirmation
        }

        // Perform actions to confirm the booking, e.g., send data to the server
        alert('Đặt phòng thành công');
    };

    return (
        <div className="hotel-details">
            {hotelDetails.roomTypes && hotelDetails.roomTypes.length > 0 ? (
                <div className='cart-room'>
                    <ul className="room-list">
                        <h3 className="hotel-details-1">Danh Sách Phòng</h3>
                        {hotelDetails.roomTypes.map((roomType) => (
                            <li key={roomType.id} className="room-item">
                                <div className="room-details">
                                    <h3>{roomType.name}</h3>
                                    <p>Description: {roomType.description}</p>
                                    <p>Price: {roomType.price}</p>
                                </div>
                                <div className="room-button-wrapper">
                                    <button onClick={() => handleRemoveFromCart(roomType)}>-</button>
                                    <button onClick={() => handleAddToCart(roomType)}>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='main-tong-tien'>
                        <div className='tongtien'>
                            <p className='tongtien1'>Đơn hàng</p>
                            <p>Số phòng: {Object.values(selectedRooms).reduce((sum, quantity) => sum + quantity, 0)}</p>
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
                        <div>
                            <button className='xac-nhan' onClick={handleConfirmBooking} disabled={Object.values(selectedRooms).reduce((sum, quantity) => sum + quantity, 0) === 0}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No room types available.</p>
            )}
        </div>
    );
};

export default HotelDetail;
