import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';


const MobileProductSlide = ({ product, addItem }) => {
    const [showQuantity, setShowQuantity] = useState(false)
    const [quantity, setQuantity] = useState(0)
    // console.log(product)
    const handleSlideClick = () => {
        if (showQuantity) {
            setShowQuantity(false)
        } else {
            //product details logic
            console.log('clicked')
        }
    }



    return (
        <div
            className='relative flex flex-col'
            onClick={handleSlideClick}
        >
            <Swiper
                // loop={true}
                spaceBetween={0}
                slidesPerView={1}
                // freeMode={true}
                // freeModeSticky={true}
                navigation={false}
                modules={[FreeMode, Navigation]}
                style={{ width: '100%', aspectRatio: '4/5' }}

            // className="mySwiper"
            >
                {product.image?.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className='w-full h-full rounded-xl relative'
                        >
                            <img
                                className="rounded-xl object-cover"
                                src={image}
                                alt={`Slide ${index}`}
                            />
                            <p className="absolute w-12 h-12 flex justify-center items-center bottom-0 right-0 text-black"
                                onClick={() => { setShowQuantity(true) }}
                            >
                                <FaPlus />
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='flex flex-col bg-black py-2 gap-1'>
                <h5 className="text-[10px] text-slate-100">{product.name}</h5>
                <p className="text-[8px] text-gray-300">
                    Gliese <span> 4 colors</span>
                </p>
                <p className="text-[8px] text-slate-100 ">${product.price}</p>
            </div>

            <AnimatePresence>
                {showQuantity &&
                    <motion.div
                        onClick={(e) => { e.stopPropagation() }}
                        className="absolute left-0 flex justify-center w-full h-auto bottom-[68px] z-[6]"
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='w-[87%] h-auto bg-black border border-[#3d3d3d] rounded-lg p-2.5'>
                            <div className='flex justify-between text-[10px] text-slate-100 py-1'>
                                <p className='text-[8px] '>QUICK ADD</p>
                                <FaPlus
                                    onClick={() => {
                                        if (quantity > 0) {
                                            addItem({ product, quantity });
                                        }
                                    }}
                                // className={`plus ${quantity === 0 ? 'hover:cursor-not-allowed' : ''}`}
                                // className='plus'

                                />
                            </div>
                            <div className="separator"></div>
                            <div className="flex justify-center items-center text-[10px] text-slate-100 gap-3 py-2">
                                <p
                                    onClick={() => {
                                        if (quantity > 0) {
                                            setQuantity(quantity - 1)
                                        }
                                    }}
                                    className='bg-gray-700 rounded-full p-1'
                                >
                                    <FaMinus />
                                </p>
                                <div>{quantity}</div>
                                <p
                                    onClick={() => { setQuantity(quantity + 1) }}
                                    className='bg-gray-700 rounded-full p-1'
                                >
                                    <FaPlus />
                                </p>
                            </div>
                        </div>
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default MobileProductSlide;
