import React, { useState } from 'react';
import './FormRegister.css';
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
function RegistrationForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, for example, by sending data to a server
        console.log('Submitted data:', name, phoneNumber, birthdate, email, address);
    };
    return (
        <>
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
                            <button type="submit" className="register-button">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistrationForm;
