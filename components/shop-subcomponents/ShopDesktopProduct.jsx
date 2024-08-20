import React from 'react'
import { DUMMY_ITEMS } from '@/utils'
import ProductSlide from '../ProductDetails-subcomponents/ProductSlide'

const ShopDesktopProduct = ({ addItem }) => {
    return (
        <div
            // ref={scrolledDiv}
            className={`w-4/5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 h-[555px] 'overflow-scroll' scrollbar-hide`}>
            {/* className={`w-4/5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 h-[555px] ${isScrolled ? 'overflow-scroll' : 'overflow-hidden'} scrollbar-hide`}> */}
            {/* <div className="slider-buttons "> */}
            {DUMMY_ITEMS.map((product, index) => (
                <div className="sliders">
                    <ProductSlide
                        key={index}
                        product={product}
                        addItem={addItem}
                        bigItemClass={true}
                    />
                </div>
            ))}
        </div>
    )
}

export default ShopDesktopProduct
