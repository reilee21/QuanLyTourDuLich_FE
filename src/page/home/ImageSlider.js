import React, { useState } from 'react';

//import vào nha
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlane, faHotel, faSearch, faLifeRing, faCreditCard,
    faPaperPlane, faMoneyBillWave, faCube, faGlobe
} from '@fortawesome/free-solid-svg-icons';
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
        description: "Tự hào nét Việt: Ưu đái kích cầu du lịch trong nước",
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
                    <div className="feature">
                        <div className="feature-icon">
                            <FontAwesomeIcon icon={faPlane} size="3x" />
                        </div>
                        <p>Đặt Tour</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <FontAwesomeIcon icon={faHotel} size="3x" />
                        </div>
                        <p>Đặt Khách Sạn</p>
                    </div>
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

        </div>
    );
};
export default ImageSlider;
