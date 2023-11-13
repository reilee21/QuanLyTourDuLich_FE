// SearchPage.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import './ordertour.css';
import HanoiImage from '../../assets/image/hanoi.png';
const SearchPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
    const navigate = useNavigate();

    const formatDateString = (date) => {
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleSearch = () => {
        if (!searchTerm) {
            alert('Vui lòng nhập thông tin để tìm kiếm.');
            return;
        }

        if (!startDate || !endDate) {
            alert('Vui lòng chọn cả ngày đến và ngày đi.');
            return;
        }

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

        const formattedStartDate = formatDateString(startDate);
        const formattedEndDate = formatDateString(endDate);

        const results = sampleData.filter((tour) => {
            const includesSearchTerm = tour.TenTour.toLowerCase().includes(searchTerm.toLowerCase());

            // Compare only the date portion
            const tourStartDate = new Date(tour.NgayKhoiHanh);
            tourStartDate.setHours(0, 0, 0, 0);

            const startDateWithoutTime = new Date(startDate);
            startDateWithoutTime.setHours(0, 0, 0, 0);

            const isBetweenDates = tourStartDate >= startDateWithoutTime && tourStartDate <= endDate;
            const meetsCustomCriteria = tour.Gia < 10000000000;

            return includesSearchTerm && isBetweenDates && meetsCustomCriteria;
        });

        setSearchResults(results);
        setShowNoResultsMessage(results.length === 0);
    };

    const handleTourClick = (tourId) => {
        navigate(`/tourdetail/${tourId}`);
    };

    return (
        <>
            <div className="search-page-container">
                <div className='search-tour-input'>
                    <label>Ngày đến:</label>
                    <DatePicker
                        className='inputt-ngaydi'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
                <div className='search-tour-input'>
                    <label>Ngày đi:</label>
                    <DatePicker
                        className='inputt-ngaydi'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
                <div className='search-tour-input'>
                    <input
                        className='inputt'
                        type="text"
                        value={searchTerm}
                        placeholder='Nhập tên tour, điểm đến, hoặc mô tả'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='buttoon' onClick={handleSearch}>Tìm Kiếm</button>
                </div>
            </div>
            <div className="search-results-main">
                {searchResults.length > 0 ? (
                    <div className="search-results1">
                        <h2>Kết Quả Tìm Kiếm</h2>
                        <ul>
                            {searchResults.map((tour) => (
                                <li key={tour.MaTour} onClick={() => handleTourClick(tour.MaTour)}>
                                    <div className='thongtin-tour'>
                                        <div>
                                            <img className="imgtour" src={tour.imageUrl} alt={`Image of ${tour.TenTour}`} />
                                        </div>
                                        <h3>{tour.TenTour}</h3>
                                        <p>Ngày khởi hành: {tour.NgayKhoiHanh}</p>
                                        <p>Điểm xuất phát: {tour.NoiKhoiHanh}</p>
                                        <p>Giá: {tour.Gia} VND</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : showNoResultsMessage ? (
                    <p>Không tìm thấy kết quả nào.</p>
                ) : null}
            </div>
        </>
    );
};

export default SearchPage;
