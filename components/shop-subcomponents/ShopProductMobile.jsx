import React from 'react'
import MobileProductSlide from './MobileProductSlide'
import { DUMMY_ITEMS } from '@/utils'

const ShopProductMobile = ({ showPopUp }) => {
    return (
        <div
            // ref={scrolledDiv}
            className={`w-full grid grid-cols-2  gap-6 scrollbar-hide`}>
            {/* className={`w-4/5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 h-[555px] ${isScrolled ? 'overflow-scroll' : 'overflow-hidden'} scrollbar-hide`}> */}
            {/* <div className="slider-buttons "> */}
            {DUMMY_ITEMS.map((product, index) => (
                <div className="sliders">
                    <MobileProductSlide />
                </div>
            ))}
        </div>
    )
}

export default ShopProductMobile
