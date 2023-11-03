import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Cus_Infor.css"
function CustomerInfoForm() {
    const [customerInfo, setCustomerInfo] = useState({
        HoTen: '',
        SoDienThoaiKH: '',
        NgaySinh: '',
        Email: '',
        SoCCCD: '',
        MaPassport: '',
        DiaChi: '',
        MaKH: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, for example, by sending data to a server
        console.log('Submitted data:', customerInfo);
    };

    return (
        <>
            <div className="cusinfo">
                <tr>
                    <Link to="/doithuong" className="black-link">Đổi thưởng</Link>
                </tr>
                <tr>
                    <Link to="/histour" className="black-link">Tour đã đi</Link>
                </tr>
                <tr>
                    <Link to="/histour" className="black-link">Đổi mật khẩu</Link>
                </tr>
                <tr>
                    <td><a style={{ color: "red", borderTop: "1px solid #e0e0e0" }}>Đăng xuất</a></td>
                </tr>
            </div >
            <div className="cus_infor-container">
                <div className="trum">
                    <div className="cus_infor-form">
                        <h1 className="page-title"> Cập Nhật Thông Tin Khách Hàng</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid-container">
                                <div className="grid-item">
                                    <label>Họ và Tên</label>
                                    <input type="text" name="HoTen" value={customerInfo.HoTen} onChange={handleChange} required />
                                </div>
                                <div className="grid-item">
                                    <label>Số Điện Thoai</label>
                                    <input type="tel" name="SoDienThoaiKH" value={customerInfo.SoDienThoaiKH} onChange={handleChange} required />
                                </div>
                                <div className="grid-item">
                                    <label>Ngày Sinh</label>
                                    <input type="date" name="NgaySinh" value={customerInfo.NgaySinh} onChange={handleChange} required />
                                </div>
                                <div className="grid-item">
                                    <label>Email</label>
                                    <input type="email" name="Email" value={customerInfo.Email} onChange={handleChange} required />
                                </div>
                                <div className="grid-item">
                                    <label>Số CCCD</label>
                                    <input type="text" name="SoCCCD" value={customerInfo.SoCCCD} onChange={handleChange} required />
                                </div>
                                <div className="grid-item">
                                    <label>Mã Passport</label>
                                    <input type="text" name="MaPassport" value={customerInfo.MaPassport} onChange={handleChange} required />
                                </div>
                                <div className="grid-item">
                                    <label>Địa Chỉ</label>
                                    <input type="text" name="DiaChi" value={customerInfo.DiaChi} onChange={handleChange} required />
                                </div>
                            </div>
                            <button type="submit" className="register-button">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerInfoForm;
