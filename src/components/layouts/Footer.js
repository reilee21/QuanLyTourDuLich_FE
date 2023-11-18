import React from "react";
import "../../page/home/ImageSlider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ICon from "../../assets/image/icon.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer1">
          <div>
            <div className="imgne">
              <span className="brand-text" style={{ fontSize: "30px" }}>
                Huflit
              </span>
              <span
                className="brand-text"
                style={{ color: "#F7D716", fontSize: "30px" }}
              >
                Travel
              </span>
            </div>
            <img
              src={ICon}
              alt="Huflit Travel Image"
              style={{ width: "300px", marginTop: "20px" }}
            />
          </div>
          <div className="contact-info">
            <h3>Liên Hệ</h3>
            <p>Email: example@example.com</p>
            <p>Điện Thoại: 123-456-7890</p>
            <p>ĐC: 123 Đường ABC, Quận XYZ, Thành Phố ABC</p>
            {/* Add more contact information if needed */}
          </div>
          <div className="info-section">
            <h3>Thông Tin</h3>
            <p>Tạp chí du lịch</p>
            <p>Cẩm nang du lịch</p>
            <p>Tin tức</p>
            <p>Chính sách riêng tư</p>
            <p>Giờ Làm Việc</p>
            <p>Thứ 2 - Thứ 6: 9:00 AM - 5:00 PM</p>
            {/* Add more information if needed */}
          </div>
          <div className="soci-section">
            <h3>Mạng xã hội</h3>
            <div className="social-icons">
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} size="3x" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} size="3x" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faYoutube} size="3x" />
              </a>
              {/* Add more social media icons if needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
