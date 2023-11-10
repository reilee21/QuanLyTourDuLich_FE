// Import các module cần thiết
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Change this line
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './orderhotel.css';

const SearchPage = () => {
    // Các state cần thiết
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();  // Change this line

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        if (!searchTerm) {
            alert('Vui lòng nhập thông tin để tìm kiếm.');
            return;
        }

        // Giả mạo việc lấy dữ liệu từ server
        const fakeData = [
            { id: 1, name: 'Khách sạn A', destination: 'Đà Nẵng', description: 'Mô tả khách sạn A.' },
            { id: 2, name: 'Khách sạn B', destination: 'Hội An', description: 'Mô tả khách sạn B.' },
            { id: 3, name: 'Khách sạn C', destination: 'Huế', description: 'Mô tả khách sạn C.' },
            // Thêm dữ liệu nếu cần
        ];

        // Lọc dữ liệu dựa trên searchTerm
        const results = fakeData.filter((hotel) =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Cập nhật state searchResults
        setSearchResults(results);

        // Log kết quả tìm kiếm
        console.log('Searching...', startDate, endDate, searchTerm, results);
    };

    // Hàm xử lý khi nhấn vào một khách sạn trong kết quả tìm kiếm
    const handleHotelClick = (hotelId) => {
        // Chuyển hướng đến trang chi tiết với ID của khách sạn được chọn
        navigate(`/hotel/${hotelId}`);  // Change this line
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
                                    <strong>{hotel.name}</strong> - Điểm đến: {hotel.destination}
                                    <p>{hotel.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchPage;
