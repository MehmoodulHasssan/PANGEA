import React, { useState, useRef } from 'react'
// import { DUMMY_ITEMS, vapeProducts } from '@/utils';
import AnimeButtons from '@/components/shop-subcomponents/SideBarAnimatedButtons';
import { categoryActions } from '@/store/slices/categorySlice';
import { useDispatch } from 'react-redux';
import { IoClose } from "react-icons/io5";



const ShopSidebar = ({ isStyles, setStyles, categoryData, itemsData, isSearching, setIsSearching }) => {
    const dispatch = useDispatch()
    const searchInputRef = useRef(null)
    const handleClearSearch = () => {
        dispatch(categoryActions.setSearchTerm(''))
        searchInputRef.current.value = ''
        setIsSearching(false)
        searchInputRef.current.blur()
    }

    const handleInputChange = (e) => {
        dispatch(categoryActions.setSearchTerm(e.target.value))
        setIsSearching(true)
    }

    return (
        <div className='sticky top-[52px] h-[92vh] w-1/5 left-side-product-page bg-white py-[29px] pr-4 overflow-hidden hidden lg:block'>

            <div className={`bg-white h-full  overflow-scroll scrollbar-hide`}>
                <div className='flex flex-col font-gt-america-bold'>
                    <p className='text-[12px] text-gray-700'>Trending</p>
                    <h1 className='text-[20px] text-gray-700'>ALL PRODUCTS</h1>
                    <p className='text-[12px] text-gray-700'>{itemsData?.length} Products</p>
                    <div className="border border-gray-500 rounded-full w-fit mt-2 p-1 flex justify-between items-center">
                        <span
                            className={`inline-block text-gray-800 text-[10px] rounded-full px-3 py-1 hover:cursor-pointer ${isStyles ? 'bg-gray-300' : ''}`}
                            onClick={() => setStyles(true)}
                        >
                            Vapes
                        </span>
                        <span
                            className={`inline-block text-gray-800 text-[10px] rounded-full px-3 py-1 hover:cursor-pointer ${!isStyles ? 'bg-gray-300' : ''}`}
                            onClick={() => setStyles(false)}
                        >
                            Others
                        </span>
                    </div>
                    <div className='w-full h-[1px] bg-gray-300 mt-4'></div>
                    <div className="flex my-3">

                        <input
                            type="text"
                            ref={searchInputRef}
                            placeholder='Search for items by name'
                            onChange={handleInputChange}
                            className='w-10/12 text-sm rounded-full font-gt-america-medium h-6 px-1 text-gray-600 focus-within:outline-none placeholder:text-gray-400'
                        />
                        {isSearching && <div
                            onClick={handleClearSearch}
                            className="flex pl-2 underline items-center justify-center font-gt-america-bold text-xs text-black hover:cursor-pointer">
                            Clear
                        </div>}
                    </div>
                    <div className='w-full h-[1px] bg-gray-300 mb-[8px]'></div>
                </div>
                <div className='flex flex-col'>
                    {categoryData.map((ele, index) => (
                        <AnimeButtons
                            key={index}
                            category={ele.category}
                            subCategories={ele.subCategories}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopSidebar
