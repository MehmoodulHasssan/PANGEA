import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { FreeMode, Grid, Navigation, Pagination } from 'swiper/modules';
import HomeProductSlide from '../HomeProductSlide';
import { DUMMY_ITEMS } from '@/utils';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FaPlus, FaMinus } from 'react-icons/fa';

const slides = Array.from({ length: 40 }, (_, index) => index + 1);
const images = [
    'https://cdn.shopify.com/s/files/1/1752/8007/products/TrilogyCropHoodieCelestialBlue4_400x.jpg',
    'https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400',
];

const DesktopSmallSwiper = () => {
    const swiperRef2 = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className="hidden lg:block">
            <Swiper
                grid={{
                    rows: 2,
                    fill: 'row',
                }}
                spaceBetween={12}
                onBeforeInit={(swiper) => {
                    swiperRef2.current = swiper;
                }}
                navigation={true}
                freeMode={true}
                modules={[Grid, Navigation, FreeMode]}
                className="mySwiper2"
                breakpoints={{
                    220: {
                        slidesPerView: 1,
                    },
                    320: {
                        slidesPerView: 1,
                    },
                    390: {
                        slidesPerView: 2,
                    },
                    520: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 4,
                    },
                    808: {
                        slidesPerView: 5,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                    1366: {
                        slidesPerView: 7,
                    },
                    1400: {
                        slidesPerView: 8,
                    },
                    1450: {
                        slidesPerView: 7,
                    },
                    1500: {
                        slidesPerView: 9,
                    },
                    1600: {
                        slidesPerView: 10,
                    },
                    1700: {
                        slidesPerView: 11,
                    },
                }}
            >
                <button
                    onClick={() => swiperRef2.current?.slidePrev()}
                    className="swiper-button-prev swiper-button-prev2"
                >
                    <GrFormPrevious />
                </button>
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="item-image-box"
                            style={{ width: '150px', height: '190px' }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                className="item-image"
                                src={hoveredIndex === index ? images[1] : images[0]}
                                alt=""
                            />
                            <p className="plus">
                                <FaPlus />
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
                <button
                    onClick={() => swiperRef2.current?.slideNext()}
                    className="swiper-button-next"
                >
                    <GrFormNext />
                </button>
            </Swiper>
        </div>
    )
}

export default DesktopSmallSwiper
