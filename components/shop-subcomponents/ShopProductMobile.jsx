import React from 'react'
import MobileProductSlide from './MobileProductSlide'
import { DUMMY_ITEMS } from '@/utils'

const ShopProductMobile = ({ addItem }) => {
    return (
        <div
            className={`py-8 h-auto grid grid-cols-2 md:grid-cols-3  gap-6 scrollbar-hide lg:hidden`}>
            {DUMMY_ITEMS.map((product, index) => (
                <MobileProductSlide
                    key={index}
                    product={product}
                    addItem={addItem}
                />
            ))}
        </div>
    )
}

export default ShopProductMobile
