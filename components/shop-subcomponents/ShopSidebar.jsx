import React from 'react'
import { DUMMY_ITEMS, vapeProducts } from '@/utils';
import AnimeButtons from '@/components/shop-subcomponents/SideBarAnimatedButtons';

const ShopSidebar = ({ isStyles, setStyles }) => {
    return (
        <div className='relative w-1/5 left-side-product-page bg-white py-[29px] pr-4 overflow-hidden hidden lg:block'>
            <div className={`bg-white h-full stikcy top-[81px]`}>
                <div className='flex flex-col'>
                    <p className='text-[12px] text-gray-700'>Trending</p>
                    <h1 className='text-[20px] text-gray-700'>ALL PRODUCTS</h1>
                    <p className='text-[12px] text-gray-700'>230 Products</p>
                    <div className="border border-gray-500 rounded-full w-fit mt-2 p-1 flex justify-between items-center">
                        <span
                            className={`inline-block text-gray-800 text-[10px] rounded-full px-3 py-1 hover:cursor-pointer ${isStyles ? 'bg-gray-300' : ''}`}
                            onClick={() => setStyles(true)}
                        >
                            Styles
                        </span>
                        <span
                            className={`inline-block text-gray-800 text-[10px] rounded-full px-3 py-1 hover:cursor-pointer ${!isStyles ? 'bg-gray-300' : ''}`}
                            onClick={() => setStyles(false)}
                        >
                            Flavors
                        </span>
                    </div>
                    <div className='w-full h-[1px] bg-gray-300 mt-4'></div>
                    <input
                        type="text"
                        placeholder='Search for categories'
                        className='w-full h-4 my-[16px] text-gray-800 focus:outline-none placeholder:text-gray-400'
                    />
                    <div className='w-full h-[1px] bg-gray-300 mb-[8px]'></div>
                </div>
                <div className='flex  flex-col overflow-scroll scrollbar-hide'>
                    {vapeProducts.map((product, index) => (
                        <AnimeButtons
                            key={index}
                            name={product.productName}
                            options={product.options}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopSidebar