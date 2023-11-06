import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHotel, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image1 from '../../assets/image/dulich1.png';
import Image2 from '../../assets/image/dulich2.png';
import Image3 from '../../assets/image/dulich3.png';
import OfferImage1 from '../../assets/image/dulich3.png';
import OfferImage2 from '../../assets/image/dulich3.png';
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
    {
        url: OfferImage1, // Đường dẫn đến hình ảnh ưu đãi
    },
    {
        url: OfferImage2, // Đường dẫn đến hình ảnh ưu đãi
    },
    {
        url: OfferImage2, // Đường dẫn đến hình ảnh ưu đãi
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
                            <FontAwesomeIcon icon={faPlane} size="4x" />
                        </div>
                        <p>Đặt Tour</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <FontAwesomeIcon icon={faHotel} size="4x" />
                        </div>
                        <p>Đặt Khách Sạn</p>
                    </div>
                    <div className="feature" onClick={toggleSearch}>
                        <div className="feature-icon">
                            <FontAwesomeIcon icon={faSearch} size="4x" />
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
        </div>
    );
};

export default ImageSlider;
