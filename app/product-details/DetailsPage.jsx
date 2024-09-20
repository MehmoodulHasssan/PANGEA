'use client'
import React, { useRef, useState, useEffect } from 'react';
import AbsolutePart from '@/components/ProductDetails-subcomponents/AbsolutePart';
import DetailsSwiper from '@/components/ProductDetails-subcomponents/DetailsSwiper';
import WithHeaderWrapper from '@/components/WithHeaderWrapper';
import ProductsGrid from '@/components/ProductDetails-subcomponents/ProductsGrid';
// import { DUMMY_DETAILS, DUMMY_ITEMS } from '@/utils.js'
import { itemsActions } from '@/store/slices/cartItems';
import { useDispatch } from 'react-redux';
import ShopProductMobile from '@/components/shop-subcomponents/ShopProductMobile';
import SliderButtons from '@/components/HomePage-subcomponents/SliderButtons';


export default function DetailsPage({ data }) {
    const dispatch = useDispatch()
    const [recommended, setRecommended] = useState(true)
    const [recentlyViewedItems, setRecentlyViewedItems] = useState([])
    const swiperRef = useRef(null);

    const images = data?.itemsData.item_data?.ecom_image_uris

    const handleCenterSlide = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiper = swiperRef.current.swiper;
            const slideWidth = swiper.slides[index].offsetWidth;
            const halfContainerWidth = swiper.width / 2;
            const slidePosition = swiper.slides[index].offsetLeft + slideWidth / 2;

            // Calculate the translateX value to center the slide
            const translateX = slidePosition - halfContainerWidth;

            swiper.setTranslate(-translateX); // Manually set the translate to center the slide
            swiper.updateProgress(); // Update Swiper's internal state
        }
    };

    useEffect(() => {
        const recentItems = JSON.parse(window.localStorage.getItem('recentlyViewed'))
        setRecentlyViewedItems(recentItems)
        console.log(recentItems)
    }, [recommended])
    // console.log(data?.itemsData)
    // console.log(recentlyViewedItems)
    // console.log(recommended)

    return (
        <WithHeaderWrapper categories={data?.categories}>
            <div className='lg:h-[87vh] relative apni-class-main'>
                <DetailsSwiper
                    productImages={images && images}
                    ref={swiperRef}
                />
                <AbsolutePart
                    product={data?.itemsData}
                    centerSlide={handleCenterSlide}
                />
            </div>
            <ProductsGrid
                products={recommended ? (data?.itemsData?.recommendedItems || []) : (recentlyViewedItems || [])}
                setRecommended={setRecommended}
                recommended={recommended}
            />
            <div className='lg:hidden'>
                <div className='sliders'>
                    <SliderButtons
                        toggle={recommended}
                        setToggle={setRecommended}
                        texts={['Recommended', 'Recently Viewed']}
                    />
                </div>
            </div>
            <div className='px-6 lg:hidden'>
                <ShopProductMobile
                    products={recommended ? (data?.itemsData?.recommendedItems || []) : (recentlyViewedItems || [])}
                />
            </div>
        </WithHeaderWrapper>
    );
}
