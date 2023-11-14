import React, { useState } from "react";
import "./Contac.css";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const serviceId = "service_rj30hx7";
  const templateId = "template_kwe5vfq";
  const publicKey = "L_RN4MgMzJH7bImjz";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response);
        // Reset the form after successful submission if needed
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
      });
  };

  return (
    <div className="contact-container">
      <div className="main_contact">
        <h2 className="tile_contact">Liên hệ chúng tôi</h2>
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
          <button className="contact_button" type="submit">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
