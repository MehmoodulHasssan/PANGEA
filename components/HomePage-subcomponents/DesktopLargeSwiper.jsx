import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { FreeMode, Grid, Navigation, Pagination } from 'swiper/modules';
import HomeProductSlide from '../HomeProductSlide';
// import { DUMMY_ITEMS } from '@/utils';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';


const DesktopLargeSwiper = ({ onAddItem, handleNavigateDetails, data, inventoryArray }) => {

  const swiperRef = useRef(null);


  return (
    <div className="hidden lg:block">
      <Swiper
        freeMode={true}
        direction="horizontal"
        modules={[FreeMode]}
        // spaceBetween={25}
        className="mySwiper test ms-[30px]"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          500: {
            slidesPerView: 1,
            centeredSlides: true, // Center the slide for screen width 500px and below
          },
          510: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 3.5,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 4.5,
          },
          1300: {
            slidesPerView: 5,
          },
          1400: {
            slidesPerView: 5.5,
          },
          1600: {
            slidesPerView: 6,
          },
          1800: {
            slidesPerView: 6.5,
          }
        }}
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="swiper-button-prev swiper-button-prev2"
        >
          <GrFormPrevious />
        </button>
        {data.map((product, index) => (
          <SwiperSlide key={product.id}>
            <div
              // className="slider-items"
              className="slider-items lg:ps-12 md:ps-8 sm:ps-4 ps-0"
            // style={
            //       index === 0 ? { paddingLeft: "50px", zIndex: '100' } : {}
            //     }
            >
              {/* <SkeletonTheme color="#d3d3e0" highlightColor="#e1e1e1" /> */}
              <div
                className="slider-item"
              // style={{ aspectRatio: '7/12' }}
              >
                <HomeProductSlide
                  key={index}
                  product={product}
                  onAddItem={onAddItem}
                  handleNavigateDetails={handleNavigateDetails}
                  inventoryArray={inventoryArray}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* {DUMMY_ITEMS.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="slider-items lg:ps-12 md:ps-8 sm:ps-4 ps-0"
            // style={
            //       index === 0 ? { paddingLeft: "50px", zIndex: '100' } : {}
            //     }
            >
              <div className="slider-item">
                <HomeProductSlide
                  key={index}
                  product={item}
                  onAddItem={onAddItem}
                  handleNavigateDetails={handleNavigateDetails}
                />
              </div>
            </div>
          </SwiperSlide>
        ))} */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="swiper-button-next swip-btn-next"
        >
          <GrFormNext />
        </button>
      </Swiper>
    </div>
  )
}

export default DesktopLargeSwiper
