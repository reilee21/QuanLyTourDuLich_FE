import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHotel, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image1 from '../../assets/image/dulich1.png';
import Image2 from '../../assets/image/dulich2.png';
import Image3 from '../../assets/image/dulich3.png';
import OfferImage1 from '../../assets/image/uudai1.jpg';
import OfferImage2 from '../../assets/image/uudai2.jpg';
import OfferImage3 from '../../assets/image/uudai3.jpg';
import OfferImage4 from '../../assets/image/uudai4.jpg';
import OfferImage5 from '../../assets/image/uudai5.jpg';
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
                <h2>Ưu đãi</h2>
                <Slide {...offerSliderSettings} arrows={false} dots={true}>
                    {offerImages.map((offerImage, index) => (
                        <div key={index} className="image-slide1">
                            <img src={offerImage.url} alt={`Offer Image ${index}`} />
                        </div>
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default ImageSlider;
