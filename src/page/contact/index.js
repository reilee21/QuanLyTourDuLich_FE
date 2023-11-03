import React, { useState } from 'react';
import "./Contac.css"

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, for example, by sending data to a server
        console.log('Submitted data:', formData);
    };

    return (
        <div className="contact-container">
            <div className="main_contact">
                <h2 className='tile_contact'>Liên hệ chúng tôi</h2>
                <p>Để có thể đáp ứng được các yêu cầu và các ý kiến đóng góp của quý vị một cách nhanh chóng, xin vui lòng liên hệ.</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Họ và Tên:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Nội dung:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="contact_button" type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
