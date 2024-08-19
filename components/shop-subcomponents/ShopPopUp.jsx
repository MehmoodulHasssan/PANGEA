import React, { useState, useEffect } from 'react'
import { DUMMY_ITEMS, vapeProducts } from '@/utils';
import PopUpAnimeButtons from './PopUpAnimeButtons';
import { motion, easeInOut } from 'framer-motion';


const ShopPopUp = ({ setStyles, isStyles, showPopUp, setShowPopUp }) => {
    const [startY, setStartY] = useState(null);
    const [currentY, setCurrentY] = useState(0);

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleDrag = (e) => {
        const touchY = e.touches[0].clientY;
        console.log(e.touches[0].clientY)
        if (startY && startY < touchY) {
            setCurrentY(touchY - startY)
        }
    };
    const handleTouchEnd = (e) => {
        const endY = e.changedTouches[0].clientY;
        const length = e.changedTouches
        console.log(length)
        if (startY && startY < endY - 50) { // swipe down
            setShowPopUp(false);
        }
        setStartY(null);
        setCurrentY(0);
    };

    return (
        <>
            {showPopUp && <>
                <div
                    class="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[15] block"
                    onClick={() => setShowPopUp(false)}
                >

                </div>
                <motion.div
                    className='fixed z-20 w-screen h-[80%] bottom-0 bg-black'
                    style={{ transform: `translateY(${currentY}px)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleDrag}
                    onTouchEnd={handleTouchEnd}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ duration: 0.3, ease: easeInOut }}
                >
                    <div className=' sticky top-0 w-[50px] h-[5px] mx-auto my-[15px] bg-white rounded-[3px] hover:cursor-pointer'></div>
                    <div className={`bg-black h-full text-lg text-slate-100 py-8 px-8 overflow-scroll`}>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                placeholder='Search for categories'
                                className='w-full font-semibold h-12 bg-black text-slate-100 focus:outline-none placeholder:text-gray-400'
                            />
                            <div className='w-full h-[1px] bg-gray-700 my-[16px]'></div>
                        </div>
                        <div className='flex flex-col overflow-scroll scrollbar-hide'>
                            {vapeProducts.map((product, index) => (
                                <PopUpAnimeButtons
                                    key={index}
                                    name={product.productName}
                                    options={product.options}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </>
            }
        </>
    )
}

export default ShopPopUp
