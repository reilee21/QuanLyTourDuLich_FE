import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css';
import Image1 from '../../assets/image/faq.png';  // Import your images

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="image-slider">
            <Slider {...settings}>
                <div>
                    <img src={Image1} alt="Image 1" />
                </div>
                <div>
                    <img src={Image1} alt="Image 2" />
                </div>
                <div>
                    <img src={Image1} alt="Image 3" />
                </div>
            </Slider>
        </div>
    );
};

export default ImageSlider;
