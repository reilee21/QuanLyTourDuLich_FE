import React, { useState } from 'react';
// Import CSS stylesheet if needed

const ChangePasswordPage = () => {
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý việc đổi mật khẩu ở đây, ví dụ: gửi dữ liệu đổi mật khẩu lên máy chủ
        console.log('Mật khẩu đã được thay đổi:', password);
    };
    return (
        <div className="change-password-page">
            <h1>Đổi Mật Khẩu</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Mật Khẩu Mới:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Đổi Mật Khẩu</button>
            </form>
        </div>
    );
}

export default ChangePasswordPage;
