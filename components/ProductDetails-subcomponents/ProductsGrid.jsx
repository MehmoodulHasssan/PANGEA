import React, { useState } from 'react'
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import '@/app/styles/main.scss';
// import { DUMMY_ITEMS } from '@/utils';
// import ProductSlide from './ProductSlide';
import HomeProductSlide from '../HomeProductSlide';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import SliderButtons from '../HomePage-subcomponents/SliderButtons';


const ProductsGrid = ({ products, recommended, setRecommended }) => {

    // console.log(products)
    return (
        <div className='w-full hidden h-1/2 bg-white pb-6 mt-20 lg:mt-0 lg:block'>
            <div className='w-full flex flex-col overflow-x-auto scrollbar-hide'>
                <div className="sliders sm:mt-20 lg:mt-8">
                    <SliderButtons
                        toggle={recommended}
                        setToggle={setRecommended}
                        texts={['Recommended', 'Recently Viewed']}
                    />

                    <div className='grid px-6 pb-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-4'>
                        {/* {products.map((product, index) => (
                            <ProductSlide
                                key={index}
                                product={product}
                            />
                        ))} */}
                        {products && products.map((product, index) => (
                            <SwiperSlide key={product.id}>
                                <div
                                    className="slider-items lg:ps-12 md:ps-8 sm:ps-4 ps-0"
                                // style={
                                //       index === 0 ? { paddingLeft: "50px", zIndex: '100' } : {}
                                //     }
                                >
                                    {/* <SkeletonTheme color="#d3d3e0" highlightColor="#e1e1e1" /> */}
                                    <div className="slider-item">
                                        <HomeProductSlide
                                            key={product.id}
                                            product={product}
                                        //   onAddItem={onAddItem}
                                        //   handleNavigateDetails={handleNavigateDetails}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsGrid
