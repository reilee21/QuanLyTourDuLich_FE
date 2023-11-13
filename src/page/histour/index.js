import React, { useEffect, useState } from 'react';
import "./histour.css"
const HistoryPage = () => {
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        // Retrieve booking data from localStorage
        const storedData = localStorage.getItem('bookingData');

        if (storedData) {
            // Parse the stored JSON data
            const bookingData = JSON.parse(storedData);

            // Update booking history state
            setBookingHistory([bookingData, ...bookingHistory]);
        }
    }, []); // Run this effect only once on component mount

    return (
        <div >
            <h1 className='histour'>Tour Đã Đi</h1>
            {bookingHistory.length === 0 ? (
                <p>No booking history available.</p>
            ) : (
                <ul>
                    {bookingHistory.map((booking, index) => (
                        <li key={index}>
                            <p>Mã tour: {booking.tourId}</p>
                            <p>Số lượng người tham gia: {booking.participants}</p>
                            <p>Ngày đi: {booking.departureDate}</p>
                            <p>Giờ tập chung: {booking.gatheringTime}</p>
                            <p>Giá tiền: {booking.totalPrice} VND</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistoryPage;
