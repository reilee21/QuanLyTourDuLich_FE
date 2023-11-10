import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import vào nha
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlane, faHotel, faSearch, faLifeRing, faCreditCard,
    faPaperPlane, faMoneyBillWave, faCube, faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

//import vào nha
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image1 from '../../assets/image/dulich1.png';
import Image2 from '../../assets/image/dulich2.png';
import Image3 from '../../assets/image/dulich3.png';
//
import OfferImage1 from '../../assets/image/uudai1.jpg';
import OfferImage2 from '../../assets/image/uudai2.jpg';
import OfferImage3 from '../../assets/image/uudai3.jpg';
import OfferImage4 from '../../assets/image/uudai4.jpg';
import OfferImage5 from '../../assets/image/uudai5.jpg';
//
import Khampha1 from '../../assets/image/khampha1.png';
import Khampha2 from '../../assets/image/khampha2.png';
import Khampha3 from '../../assets/image/khampha3.png';
import Khampha4 from '../../assets/image/khampha4.png';
import Khampha5 from '../../assets/image/khampha5.png';
//
import HanoiImage from '../../assets/image/hanoi.png';
import DanangImage from '../../assets/image/danang.png';
import DalatImage from '../../assets/image/dalat.png';
import PhuQuocImage from '../../assets/image/phuquoc.png';
import ChauAImage from '../../assets/image/chaua.png';
import ChauMyImage from '../../assets/image/chaumy.png';
import ChauAuImage from '../../assets/image/chuaau.png';
import ChauUcImage from '../../assets/image/chauuc.png';
// Add more import statements for additional images

import ICon from '../../assets/image/icon.png';
import './ImageSlider.css';

const slideImages = [
    {
        url: Image1,
    },
    {
        url: Image2,
    },
    {
        url: Image3,
    },
];

// Ưu đãi
const offerSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
};
const offerImages = [
    {
        url: OfferImage1,
    },
    {
        url: OfferImage2,
    },
    {
        url: OfferImage3,
    },
    {
        url: OfferImage4,
    },
    {
        url: OfferImage5,
    },
    // Thêm ảnh ưu đãi khác nếu cần
];

const khamphaimage = [
    {
        description: "Tự hào nét Việt:Kích cầu du lịch trong nước",
        url: Khampha1,
    },
    {

        description: "Đắm say giữa trời thu khắp thế giới",
        url: Khampha2,
    },
    {

        description: "Chọn tour Tết Giáp Thìn 2024 cho gia đình",
        url: Khampha3,
    },
    {
        description: "Tour trải nghiệm giới trẻ, sự kiện, thể thao",
        url: Khampha4,
    },
    {
        description: "Tour trải nghiệm cao cấp",
        url: Khampha5,
    },
];
/// Điểm đến yêu thích
const favoriteDestinations = [
    { id: 1, name: 'Hà Nội', image: HanoiImage },
    { id: 2, name: 'Đà Nẵng', image: DanangImage },
    { id: 3, name: 'Đà Lạt', image: DalatImage },
    { id: 4, name: 'Phú Quốc', image: PhuQuocImage },
    { id: 5, name: 'Châu Á', image: ChauAImage },
    { id: 6, name: 'Châu Mỹ', image: ChauMyImage },
    { id: 7, name: 'Châu Âu', image: ChauAuImage },
    { id: 8, name: 'Châu Úc', image: ChauUcImage },
    // Add more favorite destinations if needed
];

const ImageSlider = () => {
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    return (
        <div>
            <div className="image-slider-wrapper">
                <div className="image-slider-container">
                    <Slide images={slideImages} duration={3000} transitionDuration={400}>
                        {slideImages.map((slideImage, index) => (
                            <div key={index} className="image-slide">
                                <img src={slideImage.url} alt={`Image ${index}`} />
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
            <div className="home-features">
                <div className="feature-container">
                    <Link to="/ordertour" style={{ textDecoration: 'none' }}>
                        <div className="feature">
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faPlane} size="3x" />
                            </div>
                            <p>Đặt Tour</p>
                        </div>
                    </Link>
                    <Link to="/orderhotel" style={{ textDecoration: 'none' }}>
                        <div className="feature">
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faHotel} size="3x" />
                            </div>
                            <p>Đặt Khách Sạn</p>
                        </div>
                    </Link>
                    <div className="feature" onClick={toggleSearch}>
                        <div className="feature-icon">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                        </div>
                        <p>Tra cứu booking</p>

                    </div>
                </div>
                {searchVisible && (
                    <div className="search-bar">
                        <input type="text" placeholder="Nhập số booking" />
                        <button>Tìm kiếm</button>
                    </div>
                )}
            </div>
            <div className="offer-slider">
                <h2 className='uudai'>Ưu đãi</h2>
                <Slide {...offerSliderSettings} arrows={false} dots={true}>
                    {offerImages.map((offerImage, index) => (
                        <div key={index} className="image-slide1">
                            <img src={offerImage.url} alt={`Offer Image ${index}`} />
                        </div>
                    ))}
                </Slide>
            </div>
            <div className="khampha">
                <h2>Khám phá chuyến đi</h2>
                <div className="product-cards-horizontal">
                    {khamphaimage.map((product, index) => (
                        <div key={index} className="product-card-horizontal">
                            <img src={product.url} alt={product.name} />
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="yeuthich">
                <h2>Điểm đến yêu thích</h2>
                <div className="favorite-destinations-container">
                    {favoriteDestinations.map((destination) => (
                        <div key={destination.id} className="favorite-destination-card">
                            <img src={destination.image} alt={destination.name} />
                            <p>{destination.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="vi-sao">
                <h2>Vì sao chọn chúng tôi</h2>
                <div className="vi-sao-icons">
                    <div className="vi-sao-icon">
                        <FontAwesomeIcon icon={faGlobe} size="5x" />
                        <p className='p1'>Mạng bán tour</p>
                        <p >Ứng dụng công nghệ mới nhất</p>
                    </div>
                    <div className="vi-sao-icon">
                        <FontAwesomeIcon icon={faCube} size="5x" />
                        <p className='p1'>Sản phẩm & Dịch vụ</p>
                        <p >Đa dạng – Chất lượng – An toàn</p>
                    </div>
                    <div className="vi-sao-icon">
                        <FontAwesomeIcon icon={faMoneyBillWave} size="5x" />
                        <p className='p1'>Giá cả</p>
                        <p >Luôn có mức giá tốt nhất</p>
                    </div>
                    <div className="vi-sao-icon">
                        <FontAwesomeIcon icon={faPaperPlane} size="5x" />
                        <p className='p1'>Đặt tour</p>
                        <p >Dễ dàng & nhanh chóng chỉ với 3 bước</p>
                    </div>
                    <div className="vi-sao-icon">
                        <FontAwesomeIcon icon={faCreditCard} size="5x" />
                        <p className='p1'>Thanh toán</p>
                        <p>An toàn & linh hoạt</p>
                    </div>
                    <div className="vi-sao-icon">
                        <FontAwesomeIcon icon={faLifeRing} size="5x" />
                        <p className='p1'>Hỗ trợ</p>
                        <p >Hotline & trực tuyến (08h00 - 22h00)</p>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className='footer1'>
                    <div>
                        <div className='imgne'>
                            <span className="brand-text" style={{ fontSize: '30px' }}>Huflit</span>
                            <span className="brand-text" style={{ color: '#F7D716', fontSize: '30px' }}>Travel</span>
                        </div>
                        <img src={ICon} alt="Huflit Travel Image" style={{ width: '300px', marginTop: '20px' }} />
                    </div>
                    <div className='contact-info'>
                        <h3>Liên Hệ</h3>
                        <p>Email: example@example.com</p>
                        <p>Điện Thoại: 123-456-7890</p>
                        <p>ĐC: 123 Đường ABC, Quận XYZ, Thành Phố ABC</p>
                        {/* Add more contact information if needed */}
                    </div>
                    <div className='info-section'>
                        <h3>Thông Tin</h3>
                        <p>Tạp chí du lịch</p>
                        <p>Cẩm nang du lịch</p>
                        <p>Tin tức</p>
                        <p>Chính sách riêng tư</p>
                        <p>Giờ Làm Việc</p>
                        <p>Thứ 2 - Thứ 6: 9:00 AM - 5:00 PM</p>
                        {/* Add more information if needed */}
                    </div>
                    <div className='soci-section'>
                        <h3>Mạng xã hội</h3>
                        <div className='social-icons'>
                            <a href='#'><FontAwesomeIcon icon={faFacebook} size="3x" /></a>
                            <a href='#'><FontAwesomeIcon icon={faInstagram} size="3x" /></a>
                            <a href='#'><FontAwesomeIcon icon={faYoutube} size="3x" /></a>
                            {/* Add more social media icons if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default ImageSlider;
