// SearchPage.js
import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import HotelDetail from './hoteldetail'; // Make sure the import path is correct

// Ensure the correct path to the CSS file
import 'react-datepicker/dist/react-datepicker.css';
import './orderhotel.css';
import khachsanImage from '../../assets/image/khachsan1.jpg';

const SearchPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchTerm) {
            alert('Vui lòng nhập thông tin để tìm kiếm.');
            return;
        }

        // Check if both startDate and endDate are selected
        if (!startDate || !endDate) {
            alert('Vui lòng chọn cả ngày đến và ngày đi.');
            return;
        }

        const fakeData = [
            { id: 1, name: 'Khách sạn A', destination: 'Đà Nẵng', description: 'Mô tả khách sạn A.', imageUrl: khachsanImage },
            { id: 2, name: 'Khách sạn B', destination: 'Hội An', description: 'Mô tả khách sạn B.', imageUrl: khachsanImage },
            { id: 3, name: 'Khách sạn C', destination: 'Huế', description: 'Mô tả khách sạn C.', imageUrl: khachsanImage },
            // Add more data if needed
        ];

        const results = fakeData.filter((hotel) =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(results);
        console.log('Searching...', startDate, endDate, searchTerm, results);
    };

    const handleHotelClick = (hotelId) => {
        navigate(`/hoteldetail/${hotelId}`);
    };

    return (
        <>
            <div className="container-orderhotel">
                <div className='container-1'>
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
                <div className='container-1'>
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
                <div className='container-1'>
                    <input
                        className='inputt'
                        type="text"
                        value={searchTerm}
                        placeholder='Nhập tên khách sạn, điểm đến, hoặc mô tả'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='buttoon' onClick={handleSearch}>Tìm Kiếm</button>
                </div>
            </div>
            <div className="search-results-main">
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h2>Kết Quả Tìm Kiếm</h2>
                        <ul>
                            {searchResults.map((hotel) => (
                                <li key={hotel.id} onClick={() => handleHotelClick(hotel.id)}>
                                    <div className='thongtinkhachsan'>
                                        <div>
                                            <img className="imghotel" src={hotel.imageUrl} alt={`Image of ${hotel.name}`} />
                                        </div>
                                        <h3>{hotel.name}</h3>
                                        <p>Địa chỉ: {hotel.destination}</p>
                                        <p>{hotel.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <Routes>
                    <Route path="/hoteldetail/:hotelId" element={<HotelDetail />} />
                </Routes>
            </div>
        </>
    );
};

export default SearchPage;
