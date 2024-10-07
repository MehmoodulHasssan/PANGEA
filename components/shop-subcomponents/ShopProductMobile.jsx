import React, { useState } from 'react'
import MobileProductSlide from './MobileProductSlide'
import { AnimatePresence } from 'framer-motion'
// import { DUMMY_ITEMS } from '@/utils'

const ShopProductMobile = ({ addItem, products, inventoryArray }) => {
    const [bgClicked, setBgClicked] = useState(false)
    return (
        // <AnimatePresence>
        <div
            className={`relative min-h-48 w-full py-8 h-auto grid grid-cols-2 md:grid-cols-3 gap-6 scrollbar-hide lg:hidden`}
            onClick={() => setBgClicked(true)}
        >
            {products && products?.map((product, index) => (
                <MobileProductSlide
                    key={index}
                    product={product}
                    addItem={addItem}
                    vertical={false}
                    bgClicked={bgClicked}
                    setBgClicked={setBgClicked}
                    inventoryArray={inventoryArray}
                />
            ))}

            {!products || products.length === 0 && (
                <div className="absolute w-full h-full flex flex-col justify-center items-center">
                    <p className="text-xl font-gt-america-bold" >No products match this </p>
                    <p className="text-xl font-gt-america-bold" >search term!</p>
                </div>
            )}

        </div>
        // </AnimatePresence>
    )
}

export default ShopProductMobile
