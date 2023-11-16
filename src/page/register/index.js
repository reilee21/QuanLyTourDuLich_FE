import React, { useState } from 'react';
import './FormRegister.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

function RegistrationForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState(''); // Thêm trường nhập lại mật khẩu

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp nhau hay không
        if (password !== passwordConfirmation) {
            alert("Mật khẩu và mật khẩu xác nhận không khớp.");
            return;
        }

        // Xử lý form, ví dụ: gửi dữ liệu đăng ký lên máy chủ
        console.log('Submitted data:', name, phoneNumber, birthdate, email, address, password);
    };

    return (
        <div className="register-container">
            <div className="trum">
                <div className="register-form">
                    <h1 className="page-title">Đăng ký</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Họ và Tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Số điện thoại</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Ngày sinh</label>
                            <input
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="register-button">Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
