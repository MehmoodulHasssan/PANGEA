import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import { FaPlus } from 'react-icons/fa6';

const images = [
    'https://alphalete.uk/cdn/shop/files/IceTankHeat2_2500x.jpg?v=1721064079',
    'https://alphalete.uk/cdn/shop/files/IceTankHeat5_2500x.jpg?v=1721064079',
    'https://alphalete.uk/cdn/shop/files/AmplifyGravityLeggingGliese2_2500x.jpg?v=1715807990',
    'https://alphalete.uk/cdn/shop/files/FlexShortSlate7_2500x.jpg?v=1718210793',
]
const MobileProductSlide = ({ }) => {
    return (
        <Swiper
            // loop={true}
            spaceBetween={0}
            slidesPerView={1}
            // freeMode={true}
            // freeModeSticky={true}
            navigation={false}
            modules={[FreeMode, Navigation]}
            style={{ width: '150px', height: '190px' }}

        // className="mySwiper"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div
                        // className="item-image-box"
                        className='w-full h-full rounded-lg relative'
                    // style={{ width: '100%', height: '190px' }}
                    >
                        <img
                            className="rounded-lg object-cover"
                            src={image}
                            alt={`Slide ${index}`}
                        // style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <p className="absolute bottom-0 right-0 text-black">
                            <FaPlus />
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MobileProductSlide;
