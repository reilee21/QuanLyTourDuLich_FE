import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetail.css';
import HanoiImage from '../../assets/image/hanoi.png';

const TourDetail = () => {
    const { tourId } = useParams();
    const [tourDetails, setTourDetails] = useState(null);
    const [selectedParticipants, setSelectedParticipants] = useState(1);
    const [isMounted, setIsMounted] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTourDetails = async () => {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

            await delay(500);

            const sampleData = [
                {
                    MaTour: 'T001',
                    TenTour: 'Tour 1',
                    SoLuongNguoi: 10,
                    NgayKhoiHanh: '2023-11-15',
                    SoNgay: 5,
                    SoDem: 4,
                    NoiKhoiHanh: 'Hồ Chí Minh',
                    GioTapTrung: '2023-11-15T08:00:00',
                    Gia: 5000000,
                    imageUrl: HanoiImage,
                    MoTa: 'Mô tả cho Tour 1...',
                },
                {
                    MaTour: 'T002',
                    TenTour: 'Tour 2',
                    SoLuongNguoi: 15,
                    NgayKhoiHanh: '2023-12-01',
                    SoNgay: 7,
                    SoDem: 6,
                    NoiKhoiHanh: 'Hà Nội',
                    GioTapTrung: '2023-12-01T07:30:00',
                    Gia: 7000000,
                    imageUrl: 'url-to-tour-image-2.jpg',
                    MoTa: 'Mô tả cho Tour 2...',
                },
                {
                    MaTour: 'T003',
                    TenTour: 'Tour 3',
                    SoLuongNguoi: 12,
                    NgayKhoiHanh: '2023-12-10',
                    SoNgay: 3,
                    SoDem: 2,
                    NoiKhoiHanh: 'Đà Nẵng',
                    GioTapTrung: '2023-12-10T09:00:00',
                    Gia: 3500000,
                    imageUrl: 'url-to-tour-image-3.jpg',
                    MoTa: 'Mô tả cho Tour 3...',
                },
                // Add more tour data if needed
            ];

            const selectedTour = sampleData.find((tour) => tour.MaTour === tourId);

            if (isMounted) {
                setTourDetails(selectedTour);
            }
        };

        fetchTourDetails();

        // Cleanup function to set isMounted to false when the component is unmounted
        return () => {
            setIsMounted(false);
        };
    }, [tourId, isMounted]);

    const handleSelectParticipants = (value) => {
        // Check if the selected number of participants is within the allowed limit
        if (value <= tourDetails.SoLuongNguoi) {
            setSelectedParticipants(value);
        } else {
            alert(`Số người tham gia không được vượt quá ${tourDetails.SoLuongNguoi}.`);
        }
    };

    const calculateTotalPrice = () => {
        return selectedParticipants * (tourDetails ? tourDetails.Gia : 0);
    };

    const handleConfirmBooking = () => {
        if (selectedParticipants === 0) {
            alert('Vui lòng chọn số người tham gia trước khi xác nhận đặt tour.');
            return; // Do not proceed with the confirmation
        }

        // Lưu thông tin đặt tour vào localStorage
        const bookingData = {
            tourId: tourDetails.MaTour,
            participants: selectedParticipants,
            totalPrice: calculateTotalPrice(),
            departureDate: tourDetails.NgayKhoiHanh,
            gatheringTime: tourDetails.GioTapTrung,
        };
        localStorage.setItem('bookingData', JSON.stringify(bookingData));

        // Perform actions to confirm the booking, e.g., send data to the server
        alert('Đặt tour thành công');

        // Điều hướng sang trang lịch sử đặt tour
        navigate('/history');
    };

    if (!tourDetails) {
        return <p>Loading...</p>;
    }

    const totalPrice = calculateTotalPrice();

    return (
        <>
            <div className="tour-details">
                <div className="tour-info">
                    <h2>{tourDetails.TenTour}</h2>
                    <img className="tour-image" src={tourDetails.imageUrl} alt={`Image of ${tourDetails.TenTour}`} />
                    <div className='tour-infop'>
                        <p>Ngày khởi hành: {tourDetails.NgayKhoiHanh}</p>
                        <p>Thời gian: {tourDetails.SoNgay} ngày {tourDetails.SoDem} đêm</p>
                        <p>Điểm xuất phát: {tourDetails.NoiKhoiHanh}</p>
                        <p>Giờ tập chung: {tourDetails.GioTapTrung}</p>
                        <p>Số lượng người: {tourDetails.SoLuongNguoi}</p>
                        <p>Giá: {tourDetails.Gia} VND/người</p>
                        <p>{tourDetails.MoTa}</p>
                    </div>
                </div>
                <div className='booking-section1'>
                    <div className="booking-section">
                        <h3>Đặt Tour</h3>
                        <p>Số người tham gia:</p>
                        <input
                            type="number"
                            min="1"
                            max={tourDetails.SoLuongNguoi} // Set the maximum value based on the tour limit
                            value={selectedParticipants}
                            onChange={(e) => handleSelectParticipants(parseInt(e.target.value, 10))}
                        />
                        <p>Tổng tiền: {totalPrice} VND</p>
                    </div>
                    <div>
                        <button className='botton-xacnhan' onClick={handleConfirmBooking} disabled={selectedParticipants === 0}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourDetail;
