import React, { forwardRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '../../app/styles/swiper6.scss';
import { FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DetailsSwiper = forwardRef(({ productImages }, ref) => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  //just for the sake of state update
  const [viewWidth, setViewWidth] = useState(0);

  // Update the number of slides per view based on viewport size and aspect ratio
  const updateSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const aspectRatio = 4 / 5;

      // Calculate the width required for one slide based on the height (100vh)
      const slideWidth = aspectRatio * viewportHeight;

      // Calculate how many slides fit in the viewport width
      const numSlides = (viewportWidth / slideWidth);
      // console.log(numSlides)
      if (numSlides < 1) {
        setSlidesPerView(1)
      } else {
        setSlidesPerView(numSlides)
      }

      //just for the sake of state update
      setViewWidth(window.innerWidth)
    }
  };

  useEffect(() => {
    updateSlidesPerView(); // Set the initial number of slides per view
    window.addEventListener('resize', updateSlidesPerView); // Update on window resize
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // console.log(slidesPerView)
  return (
    <Swiper
      ref={ref}
      slidesPerView={slidesPerView}
      spaceBetween={0}
      freeMode={true}
      loop={true}
      modules={[FreeMode, Pagination]}
      className="mySwiper apni-class"
    >
      {productImages &&
        productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className='relative overflow-hidden flex justify-center items-center bg-[#F6F6F6]'
              style={{
                height: `${(slidesPerView === 1 && typeof window !== 'undefined') ? `${(5 / 4) * window.innerWidth}px` : '100vh'}`, // Set height to full viewport height
                // width: `${(4 / 5) * 100}vw`, // Maintain 4:5 aspect ratio
                width: `${typeof window !== 'undefined' ? `${((4 / 5) * window.innerHeight)}px` : '80vh'}`, // Maintain 4:5 aspect ratio
              }}
            >
              <Image
                layout="responsive"
                height={5}
                width={4}
                src={image}
                alt="product"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
});

export default DetailsSwiper;
